const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
      <div className="p-3 rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <p className="text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
