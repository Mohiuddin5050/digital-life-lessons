import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useStatus = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading: useLoading, data: userStatus } = useQuery({
    queryKey: ["userStatus", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/status`);
      return res.data;
    },
  });

  const isPremium = userStatus?.isPremium || false;
  const role = userStatus?.role || "user";

  return { isPremium, role, useLoading };
};

export default useStatus;
