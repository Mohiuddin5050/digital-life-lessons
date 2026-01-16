import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useStatus from "../../hooks/useStatus";
import { Link } from "react-router";
import { FaLock } from "react-icons/fa";
import LoadingSpinner from "../../components/LoadingSpinner";

const PublicLesson = () => {
  const axiosSecure = useAxiosSecure();
  const { isPremium } = useStatus() || {};

  // States
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  // Fetch lessons
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["publicLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons");
      return res.data.filter((item) => item.visibility === "public");
    },
  });

  // loading state
  if (isLoading) return <LoadingSpinner />;

  // ---------- PROCESSING DATA ----------
  const processedLessons = useMemo(() => {
    let filtered = [...lessons];

    // search
    if (searchText) {
      filtered = filtered.filter((l) =>
        l.title?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // category filter
    if (categoryFilter) {
      filtered = filtered.filter((l) => l.category === categoryFilter);
    }

    // sort
    filtered.sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

    return filtered;
  }, [lessons, searchText, categoryFilter, sortOrder]);

  // ---------- PAGINATION ----------
  const totalPages = Math.ceil(processedLessons.length / itemsPerPage);
  const paginatedLessons = processedLessons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Browse Public Life Lessons
      </h2>

      {/* -------- Controls -------- */}
      <div className="flex flex-wrap gap-3 mb-5">
        {/* search */}
        <input
          type="text"
          placeholder="Search lesson title"
          className="input input-bordered"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {/* category filter */}
        <select
          className="select select-bordered"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="personalGrowth">Personal Growth</option>
          <option value="career">Career</option>
          <option value="relationship">Relationship</option>
          <option value="motivational">Motivational</option>
          <option value="health">Health</option>
        </select>

        {/* sort dropdown */}
        <select
          className="select select-bordered"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* -------- Lesson Cards -------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paginatedLessons.map((lesson) => {
          const locked =
            lesson.accessLevel === "premium" && !isPremium;

          return (
            <div key={lesson._id} className="relative">
              <div
                className={`border rounded-2xl p-4 shadow bg-white min-h-[360px] ${
                  locked ? "blur-[2px] opacity-60 pointer-events-none" : ""
                }`}
              >
                <img
                  src={lesson.lessonImage || "https://via.placeholder.com/400"}
                  className="w-full h-44 object-cover rounded-xl mb-3"
                  alt=""
                />

                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="badge badge-info">{lesson.category}</span>
                  <span className="badge badge-secondary">
                    {lesson.emotionalTone}
                  </span>
                  <span
                    className={`badge ${
                      lesson.accessLevel === "premium"
                        ? "badge-warning"
                        : "badge-success"
                    }`}
                  >
                    {lesson.accessLevel}
                  </span>
                  <span className="badge badge-primary">Public</span>
                </div>

                <h3 className="font-semibold text-lg">
                  {lesson.title?.slice(0, 25)}...
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  {lesson.shortDescription?.slice(0, 110)}...
                </p>

                <div className="flex items-center gap-2 mt-3">
                  <img
                    src={lesson.creator?.photoUrl || "https://i.pravatar.cc/150"}
                    className="w-8 h-8 rounded-full"
                    alt=""
                  />
                  <div>
                    <p className="text-sm">{lesson.creator?.name}</p>
                    <p className="text-xs text-gray-500">
                      Created:{" "}
                      {new Date(lesson.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <Link
                  to={`/lessons/${lesson._id}`}
                  className="btn btn-primary w-full mt-3"
                >
                  See Details
                </Link>
              </div>

              {locked && (
                <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center">
                  <FaLock size={28} className="text-yellow-500" />
                  <p className="font-medium">
                    Premium Lesson – Upgrade to view
                  </p>
                  <Link
                    to="/pricing"
                    className="px-4 py-2 rounded-full text-white"
                    style={{
                      background:
                        "linear-gradient(90deg,#ff006a,#ff8a00,#ffd700)",
                    }}
                  >
                    Upgrade Membership
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* -------- Pagination Buttons -------- */}
      <div className="flex justify-center gap-2 mt-6">
        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num + 1)}
            className={`btn btn-sm ${
              currentPage === num + 1 ? "btn-primary" : ""
            }`}
          >
            {num + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PublicLesson;
