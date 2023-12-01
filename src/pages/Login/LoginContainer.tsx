import { AuthApis } from "apis";
import useRedux from "hooks/useRedux";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LEFT_MENU_KEY, USER_ROLES } from "scripts/constants";
import { updateAuth, updateUserProfile } from "store/reducers/auth";
import LoginView from "./LoginView";

const { ADMIN } = USER_ROLES;

const LoginContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useRedux("auth", {});

  const isLoggedIn = !isEmpty(authState?.currentAuth?.access_token);
  const currentUserRole = authState?.currentAuth?.role ?? ADMIN;

  const { isLoading: isLogging, mutate: onLogin } = useMutation(
    AuthApis.callLogIn,
    {
      onSuccess: ({ data: { access_token, refresh_token, user } }) => {
        dispatch(
          updateAuth({
            access_token,
            refresh_token,
          })
        );
        dispatch(
          updateUserProfile({
            ...user,
          })
        );
      },
    }
  );

  useEffect(() => {
    if (isLoggedIn && authState?.currentUser?.id) {
      navigate("/dashboard/cases");
    }
  }, [isLoggedIn, authState?.currentUser]);

  return <LoginView {...{ onLogin, isLogging }} />;
};

export default LoginContainer;
