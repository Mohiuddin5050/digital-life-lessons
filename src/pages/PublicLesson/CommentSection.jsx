import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CommentSection = ({ lessonId, user }) => {
  const axiosSecure = useAxiosSecure();
  const [text, setText] = useState("");

  const { data: comments = [], refetch } = useQuery({
    queryKey: ["comments", lessonId],
    enabled: !!lessonId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments/${lessonId}`);
      return res.data;
    },
  });

  const handleSubmit = async () => {
    if (!user) {
      return Swal.fire("Login required", "Please login to comment", "info");
    }

    if (!text.trim()) return;

    await axiosSecure.post("/comments", {
      lessonId,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoUrl,
      comment: text,
    });

    setText("");
    refetch();
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-4">Comments</h3>

      {/* Add Comment */}
      <div className="flex gap-3 mb-6">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border rounded-xl px-4 py-3"
        />
        <button
          onClick={handleSubmit}
          className="bg-primary text-white px-6 rounded-xl"
        >
          Post
        </button>
      </div>

      {/* Comment List */}
      <div className="space-y-4">
        {comments.map((c) => (
          <div
            key={c._id}
            className="bg-gray-50 p-4 rounded-xl flex gap-3"
          >
            <img
              src={c.userPhoto}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="">{c.userName}</p>
              <p className="text-gray-600 font-semibold">{c.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
