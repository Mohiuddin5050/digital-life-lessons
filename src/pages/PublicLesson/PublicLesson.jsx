import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";
import LessonCard from "../Lessons/LessonCard";

const PublicLesson = () => {
  const axiosSecure = useAxiosSecure();

  // UI states
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [toneFilter, setToneFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  // fetch public lessons
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["publicLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons?privacy=public");
      return res.data;
    },
  });

  // ---------- FILTER + SEARCH + SORT ----------
  const processedLessons = useMemo(() => {
    let data = [...lessons];

    // search (title + description)
    if (searchText) {
      const text = searchText.toLowerCase();
      data = data.filter((l) => l.lessonTitle?.toLowerCase().includes(text));
    }

    // category filter
    if (categoryFilter) {
      data = data.filter((l) => l.category === categoryFilter);
    }

    // emotional tone filter
    if (toneFilter) {
      data = data.filter((l) => l.emotionalTone === toneFilter);
    }

    // sorting
    if (sortBy === "newest") {
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    if (sortBy === "oldest") {
      data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    if (sortBy === "saved") {
      data.sort((a, b) => (b.favoritesCount || 0) - (a.favoritesCount || 0));
    }

    return data;
  }, [lessons, searchText, categoryFilter, toneFilter, sortBy]);

  if (isLoading) return <LoadingSpinner />;

  // ---------- PAGINATION ----------
  const totalPages = Math.ceil(processedLessons.length / itemsPerPage);
  const paginatedLessons = processedLessons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Public Life Lessons
      </h2>

      {/* ---------- Controls ---------- */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        <input
          type="text"
          placeholder="Search by title or keyword"
          className="input input-bordered w-64"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          className="select select-bordered"
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Categories</option>
          <option value="personalGrowth">Personal Growth</option>
          <option value="career">Career</option>
          <option value="relationships">Relationships</option>
          <option value="mindset">Mindset</option>
          <option value="mistakesLearned">Mistakes Learned</option>
        </select>

        <select
          className="select select-bordered"
          value={toneFilter}
          onChange={(e) => {
            setToneFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Emotions</option>
          <option value="motivational">Motivational</option>
          <option value="realization">Realization</option>
          <option value="gratitude">Gratitude</option>
          <option value="sad">Sad</option>
        </select>

        <select
          className="select select-bordered"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="oldest">Oldest</option>
          <option value="newest">Newest</option>
          <option value="saved">Most Saved</option>
        </select>
      </div>

      {/* ---------- Lessons ---------- */}
      {lessons.length === 0 ? (
        <p className="text-center text-gray-500">No lessons found</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedLessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} />
          ))}
        </div>
      )}

      {/* ---------- Pagination ---------- */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num + 1)}
              className={`btn btn-sm ${
                currentPage === num + 1 ? "btn-primary" : "btn-outline"
              }`}
            >
              {num + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicLesson;
