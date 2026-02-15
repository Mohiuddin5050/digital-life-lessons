import React from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useStatus from "../../hooks/useStatus";
import LoadingSpinner from "../../components/LoadingSpinner";
import user1 from "../../assets/image.png";
import user2 from "../../assets/imageplaceholder.jpg";
import useAxios from "../../hooks/useAxios";

const LessonCard = ({ lesson }) => {
  const axiosInstance = useAxios();
  const { isPremium, userLoading } = useStatus();

  const {
    _id,
    lessonImage,
    lessonTitle,
    lessonDesc,
    category,
    emotionalTone,
    accessLevel,
    createdAt,
    createdBy,
    privacy,
  } = lesson || {};

  const { data: user = [], isLoading } = useQuery({
    queryKey: ["users", createdBy],
    enabled: !!createdBy,
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?email=${createdBy}`);
      return res.data;
    },
  });

  const limitText = (text, length) => {
    if (!text) return "";
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  if (userLoading || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative bg-white shadow rounded-xl p-4 w-full border border-gray-100">
      {/* Premium Overlay */}
      {!isPremium && accessLevel === "paid" && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
          <Link
            to="/upgrade-membership"
            className="text-primary font-semibold text-center"
          >
            <svg
              className="w-8 h-8 mx-auto mb-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 36 24"
              fill="currentColor"
            >
              <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z" />
            </svg>
            Upgrade Membership
          </Link>
        </div>
      )}

      <img
        src={lessonImage || user2}
        alt={lessonTitle}
        className="w-full h-56 object-cover rounded-lg"
      />

      <div className="mt-3 flex flex-wrap gap-2 text-xs capitalize">
        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded">
          {category}
        </span>
        <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded">
          {emotionalTone}
        </span>
        <span className="px-2 py-1 bg-green-100 text-green-600 rounded">
          {accessLevel}
        </span>
        <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded">
          {privacy}
        </span>
      </div>

      <h3 className="text-lg font-bold mt-3">{limitText(lessonTitle, 18)}</h3>

      <p className="text-sm mt-1 text-gray-600">{limitText(lessonDesc, 70)}</p>

      <div className="flex items-center gap-3 mt-4 pt-4 border-t">
        <img
          src={user[0]?.photoURL || user1}
          alt=""
          className="w-12 h-12"
        />
        <div>
          <p className="font-semibold text-sm">
            {user[0]?.displayName || "Admin"}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <Link
        to={`/lessons/${_id}`}
        className="mt-4 block w-full text-center bg-primary text-white py-2 rounded hover:bg-blue-700 transition"
      >
        See Details
      </Link>
    </div>
  );
};

export default LessonCard;
