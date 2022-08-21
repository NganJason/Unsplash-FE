import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

type AuthRouteProps = {
  isAuth: boolean;
  redirectPath: string;
};

function AuthRoute(props: AuthRouteProps) {
  const { isAuth, redirectPath } = props;

  if (isAuth) {
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />;
}

export default AuthRoute;
