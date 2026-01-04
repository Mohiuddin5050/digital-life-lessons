import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useStatus from "../../hooks/useStatus";
import { Link } from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner";

const PublicLesson = () => {
  const axiosSecure = useAxiosSecure();
  const { isPremium } = useStatus();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["publicLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons");
      return res.data;
    },
  });

  const lockedForUser = (lesson) =>
    lesson.accessLevel === "premium" && !isPremium;

  const truncate = (text, n = 140) =>
    text.length > n ? text.slice(0, n).trim() + "…" : text;

  const formatDate = (iso) => new Date(iso).toLocaleDateString();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Public Life Lessons</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => {
          const locked = lockedForUser(lesson);

          return (
            <article
              key={lesson._id}
              className="relative bg-white border rounded-lg p-4 shadow-sm min-h-[200px] flex flex-col"
            >
              <div className={`${locked ? "blur-sm" : ""} flex-1`}>
                <h3 className="text-lg font-semibold">{lesson.title}</h3>

                <div className="mt-2 flex flex-wrap gap-2 text-sm">
                  <span className="badge badge-outline">{lesson.category}</span>
                  <span className="badge badge-outline">
                    {lesson.emotionalTone}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(lesson.createdAt)}
                  </span>
                </div>

                <p className="mt-3 text-gray-600">
                  {truncate(lesson.shortDescription)}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <img
                    src={lesson.creator.photoUrl}
                    alt={lesson.creator.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="text-sm">
                    <p className="font-medium">{lesson.creator.name}</p>
                    <p className="text-xs text-gray-500">
                      {lesson.accessLevel}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center">
                {locked ? (
                  <button disabled className="btn btn-sm btn-disabled">
                    Premium – Upgrade
                  </button>
                ) : (
                  <Link
                    to={`/lessons/${lesson._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    See Details
                  </Link>
                )}
              </div>

              {locked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 rounded-lg">
                  <span className="text-2xl">🔒</span>
                  <p className="font-semibold">Premium Lesson</p>
                  <p className="text-sm">Upgrade to view</p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default PublicLesson;


