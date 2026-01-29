import React, { useState } from "react";
import { useParams, Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useStatus from "../../hooks/useStatus";
import LoadingSpinner from "../../components/LoadingSpinner";
import { toast } from "react-hot-toast";

const LessonDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { isPremium, user } = useStatus();
  const queryClient = useQueryClient();

  const [newComment, setNewComment] = useState("");

  // Fetch lesson details
  const { data: lesson, isLoading } = useQuery({
    queryKey: ["lesson", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${id}`);
      return res.data;
    },
  });

  // Fetch comments
  const { data: comments = [] } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments?lessonId=${id}`);
      return res.data;
    },
  });

  // Premium check
  const locked = lesson?.accessLevel === "premium" && !isPremium;

  // Likes mutation
  const likeMutation = useMutation({
    mutationFn: (userId) =>
      axiosSecure.patch(`/lessons/${id}/like`, { userId }),
    onSuccess: () => queryClient.invalidateQueries(["lesson", id]),
  });

  // Favorite mutation
  const favoriteMutation = useMutation({
    mutationFn: () =>
      axiosSecure.post("/favorites", { lessonId: id, userEmail: user?.email }),
    onSuccess: () => queryClient.invalidateQueries(["lesson", id]),
  });

  // Report mutation
  const reportMutation = useMutation({
    mutationFn: (reason) =>
      axiosSecure.post("/reports", {
        lessonId: id,
        reporterEmail: user.email,
        reason,
      }),
    onSuccess: () => toast.success("Reported successfully"),
  });

  // Comment mutation
  const commentMutation = useMutation({
    mutationFn: () =>
      axiosSecure.post("/comments", {
        lessonId: id,
        commenterEmail: user.email,
        commenterName: user.displayName,
        comment: newComment,
        createdAt: new Date(),
      }),
    onSuccess: () => {
      toast.success("Comment posted");
      setNewComment("");
      queryClient.invalidateQueries(["comments", id]);
    },
  });

  const handleLike = () => {
    if (!user) return toast.error("Please log in to like");
    likeMutation.mutate(user._id);
  };

  const handleFavorite = () => {
    if (!user) return toast.error("Please log in to save");
    favoriteMutation.mutate();
  };

  const handleReport = () => {
    if (!user) return toast.error("Please log in to report");
    const reason = prompt(
      "Report reason (Inappropriate Content / Hate Speech / Misleading / Spam / Sensitive / Other):",
    );
    if (reason) reportMutation.mutate(reason);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please log in to comment");
    if (!newComment.trim()) return;
    commentMutation.mutate();
  };

  if (isLoading) return <LoadingSpinner />;

  if (!lesson) return <p>Lesson not found</p>;

  return (
    <div className="p-6">
      {/* Lesson Info */}
      <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
      {lesson.lessonImage && (
        <img
          src={lesson.lessonImage}
          alt={lesson.title}
          className="w-full max-h-80 object-cover mb-4 rounded"
        />
      )}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="badge badge-outline">{lesson.category}</span>
        <span className="badge badge-outline">{lesson.emotionalTone}</span>
      </div>
      <p className={`text-gray-700 leading-relaxed ${locked ? "blur-sm" : ""}`}>
        {lesson.lessonDesc}
      </p>

      {/* Metadata */}
      <div className="bg-gray-50 p-4 rounded my-6 flex flex-wrap gap-4 text-sm text-gray-600">
        <div>Created: {new Date(lesson.createdAt).toLocaleDateString()}</div>
        {lesson.lastUpdatedDate && (
          <div>
            Updated: {new Date(lesson.lastUpdatedDate).toLocaleDateString()}
          </div>
        )}
        <div>Visibility: {lesson.privacy || "Public"}</div>
        <div>
          Reading Time:{" "}
          {Math.ceil((lesson?.lessonDesc?.split(" ").length || 0) / 200)} min
        </div>
      </div>

      {/* Creator Section */}
      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded mb-6">
        <img
          src={lesson.creator.photoUrl}
          alt={lesson.creator.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <p className="font-medium">{lesson.creator.name}</p>
          <p className="text-sm text-gray-500">
            Total Lessons: {lesson.creator.totalLessons || 0}
          </p>
          <button
            className="btn btn-sm btn-outline mt-2"
            onClick={() =>
              (window.location.href = `/profile/${lesson.creator.email}`)
            }
          >
            View all lessons
          </button>
        </div>
      </div>

      {/* Stats & Engagement */}
      <div className="flex gap-4 mb-6 items-center">
        <button
          className={`btn btn-sm ${
            lesson.likes?.includes(user?._id) ? "btn-error" : "btn-outline"
          }`}
          onClick={handleLike}
          disabled={locked}
        >
          ❤️ {lesson.likesCount || 0}
        </button>
        <button
          className={`btn btn-sm ${
            lesson.favorited ? "btn-warning" : "btn-outline"
          }`}
          onClick={handleFavorite}
          disabled={locked}
        >
          🔖 {lesson.favoritesCount || 0}
        </button>
        <button className="btn btn-sm btn-outline" onClick={handleReport}>
          🚩 Report
        </button>
        <div className="ml-auto text-gray-500">
          👀 {Math.floor(Math.random() * 10000)} views
        </div>
      </div>

      {/* Comment Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Comments</h3>
        {user ? (
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-2 border rounded mb-2"
            />
            <button className="btn btn-sm btn-primary">Post Comment</button>
          </form>
        ) : (
          <p>
            Please <Link to="/login">log in</Link> to comment.
          </p>
        )}

        {comments.map((c) => (
          <div key={c._id} className="border-b py-2">
            <p className="font-medium">{c.commenterName}</p>
            <p className="text-gray-600 text-sm">{c.comment}</p>
          </div>
        ))}
      </div>

      {/* Recommended Lessons */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Recommended Lessons</h3>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {lesson.recommended?.slice(0, 6).map((l) => (
            <Link
              key={l._id}
              to={`/lessons/${l._id}`}
              className="block border rounded p-2 hover:shadow"
            >
              <h4 className="font-medium">{l.title}</h4>
              <p className="text-xs text-gray-500">{l.category}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;
