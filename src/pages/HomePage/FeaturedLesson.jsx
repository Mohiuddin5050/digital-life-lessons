import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LessonCard from "../Lessons/LessonCard";

const FeaturedLesson = () => {
  const axiosSecure = useAxiosSecure();
  const limit = 3;

  const { data: lessons = [] } = useQuery({
    queryKey: ["featuredPublicLessons", limit],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/lessons?privacy=public&limit=${limit}`
      );
      return res.data;
    },
  });

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-2 text-center">
        Featured Life Lessons
      </h2>

      <p className="text-center mb-6 text-gray-600">
        Anyone can explore publicly shared wisdom
      </p>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson, i) => (
          <LessonCard key={i} lesson={lesson}></LessonCard>
        ))}
      </div>
    </section>
  );
};

export default FeaturedLesson;
