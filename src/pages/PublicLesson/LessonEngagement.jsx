import { useState } from "react";
import { Heart, Bookmark, Flag, Share2 } from "lucide-react";
import Swal from "sweetalert2";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  XIcon,
} from "react-share";
import useAxios from "../../hooks/useAxios";

const LessonEngagement = ({ lesson, user }) => {
  const axiosInstance = useAxios();

  if (!lesson) return null;

  const [likes, setLikes] = useState(lesson.likesCount || 0);
  const [liked, setLiked] = useState(
    user ? lesson.likes?.includes(user.email) : false
  );
  const [favorites, setFavorites] = useState(lesson.favoritesCount || 0);
  const [openShare, setOpenShare] = useState(false);

  const views = Math.floor(Math.random() * 10000);
  const shareUrl = window.location.href;

  // ❤️ LIKE
  const handleLike = async () => {
    if (!user) {
      return Swal.fire("Login required", "Please login to like", "info");
    }

    setLiked(!liked);
    setLikes(prev => (liked ? prev - 1 : prev + 1));

    await axiosInstance.patch(`/lessons/${lesson._id}/like`, {
      email: user.email,
    });
  };

  // 🔖 FAVORITE
  const handleFavorite = async () => {
    if (!user) {
      return Swal.fire("Login required", "Please login first", "info");
    }

    const res = await axiosInstance.post("/favorites/toggle", {
      lessonId: lesson._id,
      email: user.email,
    });

    setFavorites(prev => (res.data.favorited ? prev + 1 : prev - 1));
  };

  // 🚩 REPORT
  const handleReport = async () => {
    if (!user) {
      return Swal.fire("Login required", "Please login first", "info");
    }

    const confirm = await Swal.fire({
      title: "Report this lesson?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Report",
    });

    if (!confirm.isConfirmed) return;

    const { value: reason } = await Swal.fire({
      title: "Select reason",
      input: "select",
      inputOptions: {
        inappropriate: "Inappropriate Content",
        hate: "Hate Speech",
        misleading: "Misleading Information",
        spam: "Spam",
        other: "Other",
      },
      showCancelButton: true,
    });

    if (!reason) return;

  try {
  await axiosInstance.post("/reports", {
    lessonId: lesson._id,
    reporterEmail: user.email,
    reason,
  });

  Swal.fire("Reported", "Thank you for reporting", "success");
} catch (error) {
  const message = error.response?.data?.message;

  if (message === "You already reported this lesson.") {
    Swal.fire("Info", "You already reported this lesson", "info");
  } else {
    Swal.fire("Error", "Something went wrong", "error");
  }
}

  };

  return (
    <div className="mt-10 space-y-6">
      {/* 📊 Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-gray-100 rounded-xl p-4">❤️ {likes} Likes</div>
        <div className="bg-gray-100 rounded-xl p-4">🔖 {favorites} Favorites</div>
        <div className="bg-gray-100 rounded-xl p-4">👀 {views} Views</div>
      </div>

      {/* 🔘 Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleLike}
          className={`flex-1 py-3 rounded-xl border ${
            liked ? "bg-red-100 text-red-600" : ""
          }`}
        >
          <Heart className="inline mr-2" size={18} />
          Like
        </button>

        <button
          onClick={handleFavorite}
          className="flex-1 py-3 rounded-xl border"
        >
          <Bookmark className="inline mr-2" size={18} />
          Save
        </button>

        <button
          onClick={handleReport}
          className="flex-1 py-3 rounded-xl border"
        >
          <Flag className="inline mr-2" size={18} />
          Report
        </button>

        <button
          onClick={() => setOpenShare(true)}
          className="flex-1 py-3 rounded-xl border"
        >
          <Share2 className="inline mr-2" size={18} />
          Share
        </button>
      </div>

      {/* 🔗 SHARE POPUP */}
      {openShare && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl text-center">
            <h3 className="mb-4 font-semibold">Share this lesson</h3>
            <div className="flex gap-3 justify-center">
              <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={36} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl}>
                <XIcon size={36} round />
              </TwitterShareButton>
            </div>
            <button
              onClick={() => setOpenShare(false)}
              className="mt-4 btn btn-sm btn-outline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonEngagement;
