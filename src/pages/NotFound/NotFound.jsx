import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-bold text-indigo-600 mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>

        <p className="text-gray-600 mb-6">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
