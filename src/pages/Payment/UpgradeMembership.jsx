// import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/LoadingSpinner";

const UpgradeMembership = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // const [paying, setPaying] = useState(false);

  const { isLoading, data: users = [] } = useQuery({
    // enabled: !!user?.email,
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      _id: users[0]._id,
      email: users[0].email,
    };

    // Then send it
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.assign(res.data.url);
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold text-center mb-4">
        Upgrade to Premium
      </h2>

      <p className="text-center text-gray-600 mb-6">
        Get access to premium life lessons and exclusive content.
      </p>

      <div className="border rounded-lg p-4 mb-6 text-center">
        <h3 className="text-xl font-semibold mb-2">Premium Membership</h3>
        <p className="text-gray-500 mb-4">
          Unlock all paid lessons and future updates.
        </p>
        <p className="text-3xl font-bold mb-4">৳1500</p>

        <button
          onClick={handlePayment}
          // disabled={paying}
          className="btn btn-primary w-full"
        >
          {/* {paying ? "Redirecting..." : "Upgrade Now"} */}
          Upgrade Now
        </button>
      </div>
    </div>
  );
};

export default UpgradeMembership;
