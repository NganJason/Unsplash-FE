import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  isAuth: boolean;
  redirectPath: string;
};

function ProtectedRoute(props: ProtectedRouteProps) {
  const { isAuth, redirectPath } = props;

  if (!isAuth) {
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
