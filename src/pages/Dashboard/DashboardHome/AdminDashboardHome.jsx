import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Container from "../../../components/Container";
import { FaUsers, FaBook, FaFlag, FaFire } from "react-icons/fa";
import StatCard from "./StatCard";
import { Link } from "react-router";
import AdminAnalytics from "../Admin/AdminAnalytics";


const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
 

  const { data, isLoading } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/overview");
      return res.data;
    },
  });

  const { data: topContributorsData = [], isLoading: topContributorsLoading } =
    useQuery({
      queryKey: ["top-contributors"],
      queryFn: async () => {
        const res = await axiosSecure.get("/users/top-contributors");
        return res.data;
      },
    });

  if (isLoading || topContributorsLoading) return <LoadingSpinner />;

  const {
    totalUsers,
    totalPublicLessons,
    totalReportedLessons,
    todaysLessons,
  } = data;

  return (
    <Container>
      <div className="py-10 space-y-10">
        {/* ===== Page Title ===== */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">Platform overview & activity summary</p>
        </div>

        {/* ===== Stat Cards ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/dashboard/admin/manage-users"
            className="text-decoration-none"
          >
            <StatCard
              title="Total Users"
              value={totalUsers}
              icon={<FaUsers size={24} />}
            />
          </Link>
          <Link
            to="/dashboard/admin/manage-lessons"
            className="text-decoration-none"
          >
            <StatCard
              title="Public Lessons"
              value={totalPublicLessons}
              icon={<FaBook size={24} />}
            />
          </Link>
          <Link
            to="/dashboard/admin/reported-lessons"
            className="text-decoration-none"
          >
            <StatCard
              title="Reported Lessons"
              value={totalReportedLessons}
              icon={<FaFlag size={24} />}
            />
          </Link>
          <Link
            to="/dashboard/admin/manage-users"
            className="text-decoration-none"
          >
            <StatCard
              title="Today's Lessons"
              value={todaysLessons}
              icon={<FaFire size={24} />}
            />
          </Link>
        </div>

        {/* ===== Middle Section ===== */}
        <div className="">
          {/* ===== Most Active Contributors ===== */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl text-center font-bold mb-4 p-4">
              Most Active Contributors
            </h2>

            {topContributorsData.length === 0 ? (
              <p className="text-gray-500">No data available</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {topContributorsData.map((user, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 flex flex-col items-center text-center"
                  >
                    <div className="relative w-30 h-30 mb-4">
                      <img
                        src={
                          user.photoURL ||
                          `https://ui-avatars.com/api/?name=${user.name || "User"}`
                        }
                        alt={user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>

                    <h3 className="font-semibold text-xl text-gray-900">
                      {user.name || "Anonymous"}
                    </h3>
                    <p className="text-gray-400 text-sm truncate w-full">
                      {user.email}
                    </p>

                    <div className="mt-2 flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                      <span className="text-gray-500 text-sm">
                        Lessons this week:
                      </span>
                      <span className="font-bold text-primary text-lg">
                        {user.totalLessons}
                      </span>
                    </div>

                    <Link
                      to={`/profile/${user.email}`}
                      className="mt-6 w-full bg-primary text-white py-2 px-4 rounded-full hover:bg-primary-dark transition"
                    >
                      View Profile
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ===== Placeholder for Graphs ===== */}
          <div className="mt-10 mb-20">
            <AdminAnalytics />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AdminDashboardHome;
