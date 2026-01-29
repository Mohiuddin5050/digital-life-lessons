import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";
import Container from "../../components/Container";

const TopContributors = () => {
  const axiosSecure = useAxiosSecure();

  const { data = [], isLoading } = useQuery({
    queryKey: ["top-contributors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/top-contributors");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (data.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No contributors found this week.
      </div>
    );
  }

  return (
    <Container>
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Top Contributors of the Week
          </h2>
          <p className="text-gray-500 mt-3 text-lg">
            Creators who shared the most public lessons this week
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((user, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 flex flex-col items-center text-center"
            >
              <div className="relative w-30 h-30 mb-4">
                <img
                  src={
                    user.photoURL ||
                    `https://ui-avatars.com/api/?name=${user.name || "User"}&background=random`
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
      </section>
    </Container>
  );
};

export default TopContributors;
