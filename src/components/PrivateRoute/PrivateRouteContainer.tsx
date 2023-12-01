import { includes, isEmpty } from "lodash";
import { memo } from "react";
import { Navigate } from "react-router-dom";
import { USER_ROLES } from "scripts/constants";
import { getRedux } from "scripts/helpers";

const PrivateRouteContainer = ({ component: Component, role }: any) => {
  const authState = getRedux("auth", {});

  const currentUserRole = authState?.currentUser?.role ?? USER_ROLES.ADMIN;
  const isLogged = !isEmpty(authState?.currentAuth?.access_token);

  return <Component />
  // return authState?.currentUser?.id && isLogged ? (
  //   includes(role, currentUserRole) ? (
  //     <Component />
  //   ) : (
  //     <Navigate to={{ pathname: "/page-not-found" }} />
  //   )
  // ) : (
  //   <Navigate
  //     to={{ pathname: "/login" }}
  //     state={{ referrer: window.location.pathname }}
  //   />
  // );
};

export default memo(PrivateRouteContainer);
