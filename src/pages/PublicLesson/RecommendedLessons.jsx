import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LessonCard from "../Lessons/LessonCard";

const RecommendedLessons = ({ lessonId }) => {
  const axiosSecure = useAxiosSecure();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["recommended-lessons", lessonId],
    enabled: !!lessonId,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/lessons/${lessonId}/recommended`,
      );
      return res.data;
    },
  });

  if (isLoading || lessons.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl lg:text-4xl text-center font-bold mb-10">
        Similar & Recommended Lessons
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <LessonCard key={lesson._id} lesson={lesson} />
        ))}
      </div>
    </section>
  );
};

export default RecommendedLessons;
