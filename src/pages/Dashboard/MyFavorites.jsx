import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";
import { useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { BiMessageAltDetail } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";

const MyFavorites = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["my-favorites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites/my?email=${user.email}`);
      return res.data;
    },
  });

  if (loading || isLoading) return <LoadingSpinner />;

  // Filter logic
  const filteredFavorites = favorites.filter((item) => {
    const matchCategory = category ? item.category === category : true;
    const matchTone = tone ? item.emotionalTone === tone : true;
    return matchCategory && matchTone;
  });

  const limitWords = (text) => {
    return text?.length > 20 ? text.slice(0, 20) + "..." : text;
  };

  const handleRemove = async (lessonId) => {
    await axiosSecure.delete(
      `/favorites/remove?lessonId=${lessonId}&email=${user.email}`,
    );

    toast.success("Removed from favorites");

    // Refresh my-favorites query
    queryClient.invalidateQueries(["my-favorites", user.email]);

    // Refresh dashboard-summary query to update totalFavorites
    queryClient.invalidateQueries(["dashboard-summary", user.email]);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Favorites</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered"
        >
          <option value="">All Categories</option>
          <option value="personalGrowth">Personal Growth</option>
          <option value="career">Career</option>
          <option value="relationships">Relationships</option>
          <option value="mindset">Mindset</option>
          <option value="mistakesLearned">Mistakes Learned</option>
        </select>

        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="select select-bordered"
        >
          <option value="">All Emotional Tones</option>
          <option value="motivational">Motivational</option>
          <option value="sad">Sad</option>
          <option value="realization">Realization</option>
          <option value="gratitude">Gratitude</option>
        </select>

        {(category || tone) && (
          <button
            onClick={() => {
              setCategory("");
              setTone("");
            }}
            className="btn btn-outline btn-sm"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Favorites Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Emotional Tone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredFavorites.map((item) => (
              <tr key={item._id}>
                <td className="font-medium">{limitWords(item.lessonTitle)}</td>
                <td>{item.category}</td>
                <td>{item.emotionalTone}</td>
                <td className="flex space-x-2">
                  <Link
                    to={`/lessons/${item._id}`}
                    className="btn btn-xs btn-info"
                  >
                    <BiMessageAltDetail />
                  </Link>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="btn btn-xs btn-error"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredFavorites.length === 0 && (
          <p className="text-center py-10 text-gray-500">No favorites found</p>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;
