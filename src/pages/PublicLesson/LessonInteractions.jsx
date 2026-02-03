import React, { useEffect, useState } from "react";
import { Heart, Bookmark, Flag, Share2, Eye, User } from "lucide-react";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  XIcon,
} from "react-share";
import Swal from "sweetalert2"; // For the Report confirmation & toast

const LessonInteractions = ({ lesson, authorStats, currentUser }) => {
  // Local State for Real-time UI updates
 const [likes, setLikes] = useState(0);
const [isLiked, setIsLiked] = useState(false);

useEffect(() => {
  if (lesson?.likes) {
    setLikes(lesson.likes.length);
    setIsLiked(lesson.likes.includes(currentUser?.email));
  }
}, [lesson, currentUser]);

  const [isFavorite, setIsFavorite] = useState(false); // Link this to your favorites state
  const [showReportModal, setShowReportModal] = useState(false);

  const shareUrl = window.location.href;

  // --- 5. Interaction: Like Logic ---
  const handleLike = async () => {
    if (!currentUser) {
      return Swal.fire(
        "Please log in",
        "You need an account to like lessons.",
        "info",
      );
    }

    // Optimistic UI Update
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikes((prev) => (newLikedState ? prev + 1 : prev - 1));

    // API Call to toggle like in MongoDB
    try {
      await fetch(`http://localhost:5000/lessons/${lesson._id}/like`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: currentUser.email }),
      });
    } catch (err) {
      console.error("Like failed", err);
    }
  };

  // --- 5. Interaction: Report Logic ---
  const handleReportSubmit = async (e) => {
    e.preventDefault();
    const reason = e.target.reason.value;

    const reportData = {
      lessonId: lesson._id,
      reporterEmail: currentUser.email,
      reason,
      timestamp: new Date(),
    };

    try {
      const res = await fetch("http://localhost:5000/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportData),
      });
      if (res.ok) {
        setShowReportModal(false);
        Swal.fire(
          "Reported",
          "Thank you for keeping our community safe.",
          "success",
        );
      }
    } catch (err) {
      Swal.fire("Error", "Failed to submit report.", "error");
    }
  };

  return (
    <div className="space-y-8">
      {/* 3. Author Section */}
      {/* <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
          Author
        </h4>
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={lesson.author.photoUrl}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-indigo-50"
            alt=""
          />
          <div>
            <h5 className="font-bold text-gray-900 text-lg">
              {lesson.author.displayName}
            </h5>
            <p className="text-sm text-indigo-600 font-medium">
              {authorStats.totalLessons} Lessons Created
            </p>
          </div>
        </div>
        <button className="w-full py-2 bg-indigo-50 text-indigo-700 rounded-xl font-semibold hover:bg-indigo-100 transition">
          View Profile
        </button>
      </div> */}

      {/* 4. Stats & Engagement */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-gray-50 p-4 rounded-xl">
          <p className="text-xl font-bold text-gray-900">{likes}</p>
          <p className="text-xs text-gray-500 uppercase">Likes</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl">
          <p className="text-xl font-bold text-gray-900">342</p>
          <p className="text-xs text-gray-500 uppercase">Saved</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl">
          <p className="text-xl font-bold text-gray-900 flex justify-center items-center">
            {Math.floor(Math.random() * 10000).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 uppercase">Views</p>
        </div>
      </div>

      {/* 5. Interaction Buttons */}
      <div className="flex flex-col space-y-3">
        <div className="flex gap-2">
          <button
            onClick={handleLike}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl border-2 transition ${isLiked ? "bg-red-50 border-red-200 text-red-600" : "bg-white border-gray-100 text-gray-600 hover:border-red-100"}`}
          >
            <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
            <span className="font-bold">{isLiked ? "Liked" : "Like"}</span>
          </button>

          <button className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl border-2 bg-white border-gray-100 text-gray-600 hover:border-indigo-100 transition">
            <Bookmark size={20} />
            <span className="font-bold">Save</span>
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div className="flex space-x-2">
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl}>
              <XIcon size={32} round />
            </TwitterShareButton>
          </div>
          <button
            onClick={() => setShowReportModal(true)}
            className="text-gray-400 hover:text-red-600 transition p-2"
          >
            <Flag size={20} />
          </button>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Report Lesson</h3>
            <form onSubmit={handleReportSubmit}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for reporting
              </label>
              <select
                name="reason"
                className="w-full p-3 border border-gray-200 rounded-xl mb-6 focus:ring-2 focus:ring-indigo-500"
              >
                <option>Inappropriate Content</option>
                <option>Hate Speech or Harassment</option>
                <option>Misleading or False Information</option>
                <option>Spam or Promotional Content</option>
                <option>Other</option>
              </select>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 py-3 text-gray-500 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonInteractions;
