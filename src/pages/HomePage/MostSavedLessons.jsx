import { useQuery } from "@tanstack/react-query";
import LessonCard from "../Lessons/LessonCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import useAxios from "../../hooks/useAxios";

const MostSavedLessons = () => {
  const axiosInstance = useAxios();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["mostSavedLessons"],
    queryFn: async () => {
      const res = await axiosInstance.get("/lessons/most-saved");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="mt-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Most Saved Lessons
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <LessonCard key={lesson._id} lesson={lesson} />
        ))}
      </div>
    </section>
  );
};

export default MostSavedLessons;
