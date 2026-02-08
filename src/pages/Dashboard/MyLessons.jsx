import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Link } from "react-router";
import { BiMessageAltDetail } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";

const MyLessons = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myLessons = [], isLoading } = useQuery({
    queryKey: ["my-lessons", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/my?email=${user.email}`);
      return res.data;
    },
  });

  if (loading || isLoading) return <LoadingSpinner />;

  const limitWords = (text) => {
    return text?.length > 20 ? text.slice(0, 20) + "..." : text;
  };

  // Visibility Toggle
 const handleVisibility = async (id, current) => {
  const newPrivacy = current === "public" ? "private" : "public";

  // Optimistic UI
  queryClient.setQueryData(
    ["my-lessons", user.email],
    (old = []) =>
      old.map((lesson) =>
        lesson._id === id
          ? { ...lesson, privacy: newPrivacy }
          : lesson
      )
  );

  //  Backend update
  await axiosSecure.patch(`/lessons/${id}/visibility`, {
    privacy: newPrivacy,
  });

  toast.success(`Privacy updated to ${newPrivacy}`);
};


  // Access Level Toggle
  const handleAccess = async (id, current) => {
  const newAccess = current === "free" ? "premium" : "free";

  queryClient.setQueryData(
    ["my-lessons", user.email],
    (old = []) =>
      old.map((lesson) =>
        lesson._id === id
          ? { ...lesson, accessLevel: newAccess }
          : lesson
      )
  );

  await axiosSecure.patch(`/lessons/${id}/access`, {
    accessLevel: newAccess,
  });

  toast.success(`Access level updated to ${newAccess}`);
};


  // ❌ Delete Lesson
  const queryClient = useQueryClient();

const handleDelete = async (id) => {
  const confirm = await Swal.fire({
    title: "Delete lesson?",
    text: "This cannot be undone",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Delete",
  });

  if (!confirm.isConfirmed) return;

  // 🔥 Optimistic UI
  queryClient.setQueryData(
    ["my-lessons", user.email],
    (old = []) => old.filter((l) => l._id !== id)
  );

  await axiosSecure.delete(`/lessons/${id}`);

  Swal.fire("Deleted!", "Lesson removed", "success");
};


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Lessons</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Privacy</th>
              <th>Access</th>
              <th>Likes</th>
              <th>Favorites</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {myLessons.map((lesson) => (
              <tr key={lesson._id}>
                <td className="font-medium">
                  {limitWords(lesson.lessonTitle)}
                </td>

                <td>
                  <button
                    onClick={() => handleVisibility(lesson._id, lesson.privacy)}
                    className="btn btn-xs"
                  >
                    {lesson.privacy}
                  </button>
                </td>

                <td>
                  {user?.isPremium ? (
                    <button
                      onClick={() =>
                        handleAccess(lesson._id, lesson.accessLevel)
                      }
                      className="btn btn-xs"
                    >
                      {lesson.accessLevel}
                    </button>
                  ) : (
                    <span className="text-gray-400">Free</span>
                  )}
                </td>

                <td>{lesson.likesCount || 0}</td>
                <td>{lesson.favoritesCount || 0}</td>

                <td>{new Date(lesson.createdAt).toLocaleDateString()}</td>

                <td className="flex space-x-2">
                  <Link
                    to={`/lessons/${lesson._id}`}
                    className="btn btn-xs btn-info"
                  >
                    <BiMessageAltDetail />
                  </Link>

                  <Link
                    to={`/dashboard/update-lesson/${lesson._id}`}
                    className="btn btn-xs btn-warning"
                  >
                    <FiEdit />
                  </Link>

                  <button
                    onClick={() => handleDelete(lesson._id)}
                    className="btn btn-xs btn-error"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {myLessons.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No lessons created yet
          </p>
        )}
      </div>
    </div>
  );
};

export default MyLessons;
