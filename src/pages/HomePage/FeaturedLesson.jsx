import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LessonCard from "../Lessons/LessonCard";
import LoadingSpinner from "../../components/LoadingSpinner";

const FeaturedLesson = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: lessons = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["featuredLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError || lessons.length === 0) {
    return null; // hide section if no featured lessons
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Featured Life Lessons
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Handpicked wisdom shared by our community to inspire growth and
          self-reflection.
        </p>
      </div>

      {/* Lessons Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.slice(0, 3).map((lesson) => (
          <LessonCard key={lesson._id} lesson={lesson} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedLesson;
