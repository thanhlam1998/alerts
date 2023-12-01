import axios, { AxiosRequestConfig, Method } from "axios";
import i18next from "translations";
import store from "store";
import variables from "scripts/variables";
import { get, includes, isEmpty } from "lodash";
import { HTTP_STATUS_CODES } from "scripts/constants";
import { logout, updateAuth } from "store/reducers/auth";
import { toast } from "react-toastify";

let refreshTokenPromise: any;

const baseApi = async (
  path: string = "",
  method: Method = "GET",
  body: Object = {},
  headers: Record<string, string> = {},
  mockData: Object = {},
  signal: AbortSignal = new AbortController().signal
) => {
  if (!isEmpty(mockData)) {
    return Promise.resolve({
      code: 200,
      data: mockData,
    });
  }
  const axiosOptions: AxiosRequestConfig = {
    method,
    url: `${variables.apiUrl}${path}`,
    headers,
    data: body,
    signal,
  };

  try {
    const { data: response }: any = await axios(axiosOptions);

    return includes(
      [HTTP_STATUS_CODES.SUCCESS, HTTP_STATUS_CODES.CREATED],
      response?.code
    )
      ? Promise.resolve({ data: response?.data || {} })
      : Promise.reject({
          code: response?.code || 9999,
          errorMessage:
            response?.message ||
            i18next.t(i18next.t("Sorry! Something went wrong")),
        });
  } catch (error: any) {
    // console.log("CALL API ERROR ===> ", error);

    return Promise.reject({
      code: (error as any)?.response?.status || 9999,
      errorMessage:
        (error as any)?.response?.data?.message ||
        (error as any)?.response?.data?.data ||
        i18next.t("Sorry! Something went wrong"),
    });
  }
};

const currentExecutingRequests: any = {};
const getExecutingRequestKey = (method: string, url: string, data: any) => {
  return method + url + JSON.stringify(data);
};

axios.interceptors.request.use(
  async (config: any) => {
    const userLoggedInData = get(store?.getState(), "auth", null);

    if (!!userLoggedInData?.currentAuth?.access_token) {
      config.headers[
        "Authorization"
      ] = `Bearer ${userLoggedInData?.currentAuth?.access_token}`;
    }

    const originalRequest = config;
    const k = getExecutingRequestKey(
      config?.method,
      config?.url,
      config?.data ?? {}
    );

    if (currentExecutingRequests[k]) {
      const source = currentExecutingRequests?.[k];
      delete currentExecutingRequests?.[k];
      source?.cancel();
    }

    const CancelToken = axios?.CancelToken;
    const source = CancelToken?.source();

    originalRequest.cancelToken = source?.token;
    originalRequest.k = k;
    currentExecutingRequests[k] = source;

    if (config?.useToken && !config?.headers?.["Authorization"]) {
      source?.cancel();
      delete currentExecutingRequests[k];
    }

    return config;
  },
  (error) => {
    // console.log("REQUEST ERROR ===> ", error);
    Promise.reject(error);
  }
);

const onRefreshToken = () => {
  const state = store?.getState();
  return axios.post(`${variables?.apiUrl}/api/auth/refresh-token`, {
    refresh_token: get(state, "auth.currentAuth.refresh_token", ""),
  });
};

axios?.interceptors?.response?.use(
  async (response: any) => {
    if (currentExecutingRequests?.[response?.request?.k]) {
      delete currentExecutingRequests?.[response?.request?.k];
    }
    return response;
  },
  async (error) => {
    if (axios?.isCancel(error)) return new Promise(() => {});

    const { ...originalRequest }: any = error?.config ?? {};
    const userLoggedInData = get(store?.getState(), "auth", null);
    const notRefreshToken =
      !error?.response?.config?.url?.includes("/refreshtoken");

    if (
      error?.response?.status === 401 &&
      !!userLoggedInData?.currentAuth?.refresh_token &&
      notRefreshToken
    ) {
      if (!refreshTokenPromise) {
        refreshTokenPromise = onRefreshToken()
          ?.then((resToken: any) => {
            if (resToken?.data?.code === 200) {
              refreshTokenPromise = null;

              const { access_token } = get(resToken, "data.data", {});
              store?.dispatch(updateAuth({ access_token }));

              return access_token;
            } else {
              store?.dispatch(logout());
            }
          })
          .catch((error: any) => {
            // console.log("REFRESH TOKEN ERROR ===> ", error);
            store?.dispatch(logout());
          });

        return refreshTokenPromise.then((access_token: string) => {
          originalRequest["Authorization"] = `Bearer ${access_token}`;
          return axios(originalRequest);
        });
      } else {
        return refreshTokenPromise.then((access_token: string) => {
          originalRequest["Authorization"] = `Bearer ${access_token}`;
          return axios(originalRequest);
        });
      }
    } else if (error?.toString()?.includes("Network Error")) {
      toast.error(i18next.t("Network Error"));
      return Promise.reject({ message: i18next.t("Network Error") });
    } else toast.error(error?.response?.data?.message);
    toast.clearWaitingQueue();
    return Promise.reject(error);
  }
);

export default baseApi;
