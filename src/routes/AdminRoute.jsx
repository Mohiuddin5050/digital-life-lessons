import React from 'react';
import useAuth from '../hooks/useAuth';
import useStatus from '../hooks/useStatus';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, userLoading } = useStatus();

  if (loading || userLoading) {
    return <LoadingSpinner />;
  }

  if (role !== "admin") {
    // return <NotFound/>
  }
  return children;
};

export default AdminRoute;