import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TiStar } from "react-icons/ti";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link } from "react-router";
import Container from "../../../components/Container";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { RiDeleteBin6Line } from "react-icons/ri";

const ManageLessons = () => {
  const axiosSecure = useAxiosSecure();

  const [filters, setFilters] = useState({
    category: "",
    visibility: "",
  });

  //  Load lessons
  const {
    data: lessons = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["admin-lessons", filters],
    queryFn: async () => {
      let query = "";
      if (filters.category) query += `category=${filters.category}&`;
      if (filters.visibility) query += `privacy=${filters.visibility}&`;

      const res = await axiosSecure.get(`/admin/lessons?${query}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // ===== Actions =====
  const handleToggleFeatured = async (lesson) => {
    const res = await axiosSecure.patch(
      `/admin/lessons/${lesson._id}/featured`,
      { featured: !lesson.featured },
    );

    if (res.data.modifiedCount) {
      refetch();
      toast.success(
        `Lesson ${lesson.featured ? "unfeatured" : "marked as featured"}`,
      );
    }
  };

  const handleMarkReviewed = async (lessonId) => {
    const res = await axiosSecure.patch(`/admin/lessons/${lessonId}/reviewed`);

    if (res.data.modifiedCount) {
      refetch();
      toast.success("marked as reviewed");
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    const result = await Swal.fire({
      title: "Delete this lesson?",
      text: "This will permanently remove the lesson.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });

    if (!result.isConfirmed) return;

     await axiosSecure.delete(`/admin/lessons/${lessonId}`);

    
      refetch();
      Swal.fire("Deleted!", "Lesson removed successfully.", "success");
    
  };

  const limitWords = (text) =>
    text?.length > 20 ? text.slice(0, 20) + "..." : text;

  return (
    <Container>
      <div className="my-20">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="font-bold text-2xl md:text-4xl">Manage Lessons</h2>
          <p className="my-3 font-semibold">
            Admin dashboard to moderate lessons.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          <select
            className="select select-bordered"
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
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
            value={filters.visibility}
            onChange={(e) =>
              setFilters({ ...filters, visibility: e.target.value })
            }
          >
            <option value="">All Visibility</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>

          {(filters.category || filters.visibility) && (
            <button
              onClick={() => {
                setFilters("");
                setFilters("");
              }}
              className="btn"
            >
              Clear
            </button>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Visibility</th>
                <th>Reports</th>
                <th>Reviewed</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {lessons.map((lesson, index) => (
                <tr key={lesson._id}>
                  <th>{index + 1}</th>

                  <td>
                    <Link to={`/lessons/${lesson._id}`}>
                      {limitWords(lesson.lessonTitle)}
                    </Link>
                  </td>

                  <td className="capitalize">{lesson.category}</td>
                  <td className="capitalize">{lesson.privacy}</td>

                  <td>{lesson.reportsCount || 0}</td>

                  <td>{lesson.reportsCount === 0 ? "Yes" : "No"}</td>

                  <td>
                    <button onClick={() => handleToggleFeatured(lesson)}>
                      <TiStar size={20} color={lesson.featured ? "gold" : ""} />
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="flex gap-2">
                    {lesson.reportsCount > 0 && (
                      <button
                        onClick={() => handleMarkReviewed(lesson._id)}
                        className="btn btn-xs btn-primary"
                      >
                        Mark Reviewed
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteLesson(lesson._id)}
                      className="btn btn-xs btn-error"
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {lessons.length === 0 && (
            <p className="text-center py-6 text-gray-500">No lessons found</p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ManageLessons;
