import { useQuery } from "@tanstack/react-query";
import LessonCard from "../Lessons/LessonCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import Container from "../../components/Container";
import useAxios from "../../hooks/useAxios";

const FeaturedLesson = () => {
  const axiosInstance = useAxios();

  const {
    data: lessons = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["featuredLessons"],
    queryFn: async () => {
      const res = await axiosInstance.get("/lessons");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError || lessons.length === 0) {
    return null; 
  }

  return (
    <Container>
      <section className="py-12">
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
    </Container>
  );
};

export default FeaturedLesson;
