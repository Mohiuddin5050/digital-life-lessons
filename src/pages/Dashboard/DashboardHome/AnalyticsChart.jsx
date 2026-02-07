import React from 'react';

const AnalyticsChart = ({ value }) => {
  const percentage = Math.min((value / 10) * 100, 100);
  return (
   <div className="bg-white shadow rounded-xl p-6">
      <h3 className="text-2xl font-semibold mb-6">
        Weekly Contributions
      </h3>

      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-primary h-4 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-sm text-gray-500 mt-2">
        {value} lessons this week
      </p>
    </div>
  );
};

export default AnalyticsChart;