import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";

const PrivetRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner/>
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }
  return children;
};

export default PrivetRoute;
