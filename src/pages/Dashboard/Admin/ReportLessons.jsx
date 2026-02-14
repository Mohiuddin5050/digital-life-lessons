import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ReportLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedLesson, setSelectedLesson] = useState(null);

  const {
    data: lessons = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reported-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/reported-lessons");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // ===== Delete Lesson =====
  const handleDelete = async (lessonId) => {
    const result = await Swal.fire({
      title: "Delete lesson?",
      text: "Lesson and all reports will be removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    await axiosSecure.delete(`/admin/reported-lessons/${lessonId}`);
    refetch();

    Swal.fire("Deleted", "Lesson removed", "success");
  };

  // ===== Ignore Reports =====
  const handleIgnore = async (lessonId) => {
    await axiosSecure.patch(
      `/admin/reported-lessons/ignore/${lessonId}`,
    );
    refetch();

    Swal.fire("Ignored", "Reports cleared", "success");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-3xl font-bold mb-6 text-center">
        🚩 Reported Lessons
      </h2>

      {lessons.length === 0 ? (
        <p className="text-center text-gray-500">
          No reported lessons 🎉
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Lesson Title</th>
                <th>Reports</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {lessons.map((lesson) => (
                <tr key={lesson._id}>
                  <td className="font-medium">
                    {lesson.lessonTitle}
                  </td>

                  <td>
                    <span className="badge badge-error">
                      {lesson.reportCount || 0}
                    </span>
                  </td>

                  <td className="space-x-2">
                    <button
                      onClick={() => setSelectedLesson(lesson)}
                      className="btn btn-xs btn-info"
                    >
                      View Reasons
                    </button>

                    <button
                      onClick={() => handleIgnore(lesson._id)}
                      className="btn btn-xs btn-success"
                    >
                      Ignore
                    </button>

                    <button
                      onClick={() => handleDelete(lesson._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ===== Modal ===== */}
      {selectedLesson && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              Report Reasons
            </h3>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {(selectedLesson.reports || []).map((r, i) => (
                <div
                  key={i}
                  className="border rounded p-3 bg-gray-50"
                >
                  <p>
                    <b>Reporter:</b> {r.reporterEmail}
                  </p>
                  <p>
                    <b>Reason:</b> {r.reason}
                  </p>
                </div>
              ))}
            </div>

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setSelectedLesson(null)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ReportLessons;
