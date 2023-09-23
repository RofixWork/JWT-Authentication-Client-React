import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { user } = useSelector((state) => state.user);
  return user != null ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
