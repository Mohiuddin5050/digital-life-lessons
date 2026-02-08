import React from "react";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-2">
          Payment Cancelled
        </h2>

        <p className="text-gray-600 mb-6">
          Your payment was cancelled. No money has been charged. You can try
          again anytime.
        </p>

        <div className="flex gap-3 justify-center">
          <Link to="/upgrade-membership" className="btn btn-primary">
            Try Again
          </Link>

          <Link to="/" className="btn btn-outline">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
