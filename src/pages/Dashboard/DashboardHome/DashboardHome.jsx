import React from "react";
import useStatus from "../../../hooks/useStatus";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";
import AdminDashboardHome from "./AdminDashboardHome";
import UserDashboardHome from "./UserDashboardHome";

const DashboardHome = () => {
  const { role, useLoading } = useStatus();
  const { loading } = useAuth();

  if (useLoading || loading) {
    return <LoadingSpinner />;
  }

  if (role === "admin") {
    return <AdminDashboardHome />;
  } else {
    return <UserDashboardHome />;
  }
};

export default DashboardHome;
