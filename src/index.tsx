import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import i18next from "i18next";
import React from "react";
import { render } from "react-dom";
import { I18nextProvider } from "react-i18next";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./app";
import "./assets/css/tailwind.css";
import "./assets/scss/app.scss";
import store, { persistor } from "./store";
import "./translations";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

const PROVIDER_THEME_CONFIG = {
  token: {
    colorPrimary: "#6085ff",
    fontFamily: "Nunito Sans",
  },
};

render(
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        <PersistGate loading={null} {...{ persistor }}>
          <ConfigProvider theme={PROVIDER_THEME_CONFIG}>
            <App />
          </ConfigProvider>
        </PersistGate>
      </Provider>
    </I18nextProvider>
  </QueryClientProvider>,
  document.getElementById("bri")
);
