import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FaCrown } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";
import Container from "../../components/Container";
import LessonCard from "./LessonCard";

const Author = () => {
  const { email } = useParams(); 
  const axiosSecure = useAxiosSecure();

  // ===== Author Info =====
  const { data: author = {}, isLoading } = useQuery({
    queryKey: ["author", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${email}`);
      return res.data[0];
    },
    enabled: !!email,
  });

  // ===== Author Lessons =====
  const { data: lessons = [], isLoading: lessonsLoading } = useQuery({
    queryKey: ["author-lessons", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/my?email=${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  if (isLoading || lessonsLoading) return <LoadingSpinner />;

  const publicLessons = lessons.filter(
    (lesson) => lesson.privacy === "public"
  );

  return (
    <Container>
      {/* ===== Author Profile ===== */}
      <div className="bg-white rounded-2xl shadow p-6 mt-10 flex flex-col md:flex-row gap-6 items-center justify-center max-w-lg mx-auto">
        <img
          src={author.photoURL || "https://i.ibb.co/2n9xk5Q/avatar.png"}
          className="w-32 h-32 rounded-full object-cover border-4 border-primary"
        />

        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold flex items-center gap-2 justify-center md:justify-start">
            {author.displayName}
            {author.isPremium && <FaCrown className="text-yellow-500" />}
          </h2>

          <p className="text-gray-500">{author.email}</p>

          <span className="badge badge-outline mt-3">
            {publicLessons.length} Public Lessons
          </span>
        </div>
      </div>

      {/* ===== Lessons ===== */}
      <div className="mt-12">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Public Lessons by {author.displayName}
        </h3>

        {publicLessons.length === 0 ? (
          <p className="text-center text-gray-500">
            No public lessons yet
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicLessons.map((lesson) => (
              <LessonCard key={lesson._id} lesson={lesson} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Author;
