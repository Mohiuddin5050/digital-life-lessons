// import { useParams, Link, useNavigate } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";
// import useStatus from "../../hooks/useStatus";
// import LoadingSpinner from "../../components/LoadingSpinner";
// import { toast } from "react-toastify";
// import {
//   FaHeart,
//   FaRegHeart,
//   FaBookmark,
//   FaRegBookmark,
//   FaFlag,
//   FaShareAlt,
// } from "react-icons/fa";

// const LifeLessonDetails = () => {
//   const { id } = useParams();
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
//   const { isPremium } = useStatus();
//   const navigate = useNavigate();

//   const views = Math.floor(Math.random() * 10000);

//   const { data: lesson, isLoading, refetch } = useQuery({
//     queryKey: ["lesson-details", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/lessons/${id}`);
//       return res.data;
//     },
//   });

//   if (isLoading) return <LoadingSpinner />;
//   if (!lesson) return <div className="text-center py-20">Lesson not found</div>;

//   const isLocked =
//     lesson.accessLevel === "paid" && !isPremium;

//   /* ---------------- Like Handler ---------------- */
//   const handleLike = async () => {
//     if (!user) {
//       toast.info("Please log in to like");
//       return navigate("/login");
//     }

//     await axiosSecure.patch(`/lessons/like/${lesson._id}`);
//     refetch();
//   };

//   /* ---------------- Favorite Handler ---------------- */
//   const handleFavorite = async () => {
//     if (!user) {
//       toast.info("Please log in to save");
//       return navigate("/login");
//     }

//     await axiosSecure.patch(`/lessons/favorite/${lesson._id}`);
//     refetch();
//   };

//   /* ---------------- Report Handler ---------------- */
//   const handleReport = async () => {
//     if (!user) {
//       toast.info("Please log in to report");
//       return;
//     }

//     const reason = prompt(
//       "Reason:\nInappropriate Content / Hate Speech / Misleading / Spam / Sensitive / Other"
//     );

//     if (!reason) return;

//     await axiosSecure.post("/lesson-reports", {
//       lessonId: lesson._id,
//       reportedUserEmail: lesson.createdBy,
//       reporterUserEmail: user.email,
//       reason,
//     });

//     toast.success("Lesson reported");
//   };

//   return (
//     <section className="max-w-6xl mx-auto px-4 py-12">
//       {/* ================= Lesson Info ================= */}
//       <h1 className="text-3xl md:text-4xl font-bold mb-3">
//         {lesson.lessonTitle}
//       </h1>

//       <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
//         <span>Category: {lesson.category}</span>
//         <span>Emotion: {lesson.emotionalTone}</span>
//       </div>

//       {lesson.lessonImage && (
//         <img
//           src={lesson.lessonImage}
//           className="w-full h-[420px] object-cover rounded-xl mb-8"
//           alt={lesson.lessonTitle}
//         />
//       )}

//       {/* ================= Content ================= */}
//       <div className="relative bg-white border rounded-xl p-6 shadow-sm">
//         {isLocked && (
//           <div className="absolute inset-0 backdrop-blur-sm bg-white/70 flex flex-col items-center justify-center z-10">
//             <h3 className="text-xl font-semibold mb-3">
//               Premium Lesson 🔒
//             </h3>
//             <p className="text-gray-600 mb-4">
//               Upgrade to read full lesson
//             </p>
//             <Link to="/upgrade-membership" className="btn btn-primary">
//               Upgrade Membership
//             </Link>
//           </div>
//         )}

//         <p className="text-gray-700 leading-relaxed whitespace-pre-line">
//           {lesson.lessonDesc}
//         </p>
//       </div>

//       {/* ================= Metadata ================= */}
//       <div className="mt-6 text-sm text-gray-500 grid grid-cols-2 md:grid-cols-4 gap-4">
//         <span>Created: {new Date(lesson.createdAt).toLocaleDateString()}</span>
//         <span>
//           Updated:{" "}
//           {lesson.updatedAt
//             ? new Date(lesson.updatedAt).toLocaleDateString()
//             : "—"}
//         </span>
//         <span>Visibility: Public</span>
//         {/* <span>Reading time: ~3 min</span> */}
//       </div>

//       {/* ================= Author ================= */}
//       <div className="mt-10 bg-base-100 border rounded-xl p-6 flex gap-5 items-center">
//         <img
//           src={lesson.authorPhoto}
//           className="w-16 h-16 rounded-full border"
//           alt="author"
//         />
//         <div>
//           <h3 className="font-semibold text-lg">
//             {lesson.authorName}
//           </h3>
//           <p className="text-sm text-gray-500">
//             Total lessons: {lesson.authorTotalLessons}
//           </p>
//           <Link
//             to={`/profile/${lesson.createdBy}`}
//             className="btn btn-link btn-sm px-0"
//           >
//             View all lessons
//           </Link>
//         </div>
//       </div>

//       {/* ================= Stats ================= */}
//       <div className="mt-8 flex flex-wrap gap-6 text-gray-600">
//         <span>❤️ {lesson.likesCount} Likes</span>
//         <span>🔖 {lesson.favoritesCount} Favorites</span>
//         <span>👀 {views} Views</span>
//       </div>

//       {/* ================= Actions ================= */}
//       <div className="mt-6 flex flex-wrap gap-4">
//         <button onClick={handleLike} className="btn btn-outline btn-sm">
//           {lesson.likes?.includes(user?.uid) ? <FaHeart /> : <FaRegHeart />}
//           Like
//         </button>

//         <button onClick={handleFavorite} className="btn btn-outline btn-sm">
//           {lesson.favorites?.includes(user?.uid) ? (
//             <FaBookmark />
//           ) : (
//             <FaRegBookmark />
//           )}
//           Save
//         </button>

//         <button onClick={handleReport} className="btn btn-outline btn-sm">
//           <FaFlag /> Report
//         </button>

//         <button className="btn btn-outline btn-sm">
//           <FaShareAlt /> Share
//         </button>
//       </div>

//       {/* ================= Comments ================= */}
//       <div className="mt-12">
//         <h3 className="text-xl font-semibold mb-4">Comments</h3>
//         {/* তোমার Comment component এখানে বসাবে */}
//       </div>

//       {/* ================= Similar Lessons ================= */}
//       <div className="mt-14">
//         <h3 className="text-xl font-semibold mb-6">
//           Similar Lessons
//         </h3>
//         {/* Similar lessons card grid */}
//       </div>
//     </section>
//   );
// };

// export default LifeLessonDetails;

import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Calendar, Clock, Lock, Tag, Smile } from "lucide-react";
import Creator from "./Creator";
import LessonEngagement from "./LessonEngagement";
import useAuth from "../../hooks/useAuth";
import CommentSection from "./CommentSection";
import RecommendedLessons from "./RecommendedLessons";

const LessonDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: lesson, isLoading } = useQuery({
    queryKey: ["lesson", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${id}`);
      return res.data;
    },
  });

  const { user} = useAuth()
  

  if (isLoading) return <LoadingSpinner />;
  if (!lesson) return <div>No lesson found</div>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Main Card Container */}
      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden p-3">
        {/* 1. Image Header Section */}
        {lesson.lessonImage && (
          <div className="relative h-[300px] md:h-[450px] w-full">
            <img
              src={lesson.lessonImage}
              alt={lesson.lessonTitle}
              className="w-full h-full object-cover rounded-3xl"
            />
            {/* Overlay Gradient for better contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-8">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">
                  {lesson.lessonTitle}
                </h1>
              </div>
            </div>
          </div>
        )}

        {/* 2. Content Body */}
        <div className="">
          {/* Tags / Badges */}
          <div className="mt-3 flex flex-wrap gap-2 text-xs capitalize">
            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded">
              {lesson.category}
            </span>
            <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded">
              {lesson.emotionalTone}
            </span>
            <span className="px-2 py-1 bg-green-100 text-green-600 rounded">
              {lesson.accessLevel}
            </span>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded">
              {lesson.privacy}
            </span>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 mb-8 ">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <Calendar className="text-blue-500" size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-tight">
                  Created On
                </p>
                <p className="text-gray-700 font-medium">
                  {new Date(lesson.createdAt).toDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <Clock className="text-purple-500" size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-tight">
                  Last Updated
                </p>
                <p className="text-gray-700 font-medium">
                  {lesson.updatedAt
                    ? new Date(lesson.updatedAt).toDateString()
                    : "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-blue max-w-none">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Lesson Overview
            </h3>
            <div className="">
              {lesson.lessonDesc}
            </div>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 justify-center items-center">
        {lesson && <Creator lesson={lesson} />}
      <LessonEngagement lesson={lesson} user={user} />
      </div>
      <CommentSection lessonId={lesson._id} user={user} />
      <RecommendedLessons lessonId={lesson._id} />

      {/* <LessonInteractions /> */}
    </section>
  );
};

export default LessonDetails;
