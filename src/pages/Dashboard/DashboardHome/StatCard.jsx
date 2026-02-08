import React from "react";

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow rounded-xl p-6 text-center">
      <p className="text-gray-500">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default StatCard;
