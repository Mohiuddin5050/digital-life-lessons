import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { Link } from "react-router";
import StatCard from "./StatCard";
import LessonCard from "../../Lessons/LessonCard";
import AnalyticsChart from "./AnalyticsChart";

const UserDashboardHome = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-summary", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/summary?email=${user.email}`,
      );
      return res.data;
    },
  });

  if (loading || isLoading) return <LoadingSpinner />;

  const { totalLessons, totalFavorites, recentLessons, analytics } = data;

  return (
    <div className="space-y-8 lg:w-8/12 mx-auto">
      {/* 🔹 Header */}
      <h1 className="text-3xl md:text-4xl font-bold p-4 text-center mt-8">Dashboard Overview</h1>

      {/* 🔹 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        <StatCard title="Total Lessons" value={totalLessons} />
        <StatCard title="Saved Lessons" value={totalFavorites} />
        {/* <StatCard title="This Week" value={analytics.weeklyLessons} /> */}
      </div>

      {/* 🔹 Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 m-4">
        <Link
          to="/dashboard/add-lesson"
          className="px-6 py-3 bg-primary text-white rounded-xl"
        >
          ➕ Add Lesson
        </Link>

        <Link
          to="/dashboard/my-lessons"
          className="px-6 py-3 bg-gray-200 rounded-xl"
        >
          📚 My Lessons
        </Link>

        <Link
          to="/dashboard/favorites"
          className="px-6 py-3 bg-gray-200 rounded-xl"
        >
          🔖 Favorites
        </Link>
        <Link
          to="/dashboard/profile"
          className="px-6 py-3 bg-gray-200 rounded-xl"
        >
          🧑 Profile
        </Link>
      </div>

      {/* 🔹 Recent Lessons */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 p-4">Recently Added Lessons</h2>

        {recentLessons.length === 0 ? (
          <p className="text-gray-500">No lessons yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentLessons.map((lesson) => (
              <LessonCard key={lesson._id} lesson={lesson} />
            ))}
          </div>
        )}
      </div>

      {/* 🔹 Analytics */}
      <AnalyticsChart value={analytics.weeklyLessons} />
    </div>
  );
};

export default UserDashboardHome;
