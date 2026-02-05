import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Calendar, Clock } from "lucide-react";
import Creator from "./Creator";
import LessonEngagement from "./LessonEngagement";
import useAuth from "../../hooks/useAuth";
import CommentSection from "./CommentSection";
import RecommendedLessons from "./RecommendedLessons";
import Container from "../../components/Container";

const LessonDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: lesson, isLoading } = useQuery({
    queryKey: ["lesson", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${id}`);
      return res.data;
    },
  });

  const { user } = useAuth();

  if (isLoading) return <LoadingSpinner />;
  if (!lesson) return <div>No lesson found</div>;

  return (
    <Container>
      <section className="px-4 py-12">
        {/* Main Card Container */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden p-3">
          {/* 1. Image Header Section */}
          {lesson.lessonImage && (
            <div className="relative h-[300px] md:h-[450px] w-full">
              <img
                src={lesson.lessonImage}
                alt={lesson.lessonTitle}
                className="w-full h-full object-cover rounded-3xl"
              />
              {/* Overlay Gradient for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8">
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">
                    {lesson.lessonTitle}
                  </h1>
                </div>
              </div>
            </div>
          )}

          {/* 2. Content Body */}
          <div className="">
            {/* Tags / Badges */}
            <div className="mt-3 flex flex-wrap gap-2 text-xs capitalize">
              <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded">
                {lesson.category}
              </span>
              <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded">
                {lesson.emotionalTone}
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-600 rounded">
                {lesson.accessLevel}
              </span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded">
                {lesson.privacy}
              </span>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 mb-8 ">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <Calendar className="text-blue-500" size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-tight">
                    Created On
                  </p>
                  <p className="text-gray-700 font-medium">
                    {new Date(lesson.createdAt).toDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <Clock className="text-purple-500" size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-tight">
                    Last Updated
                  </p>
                  <p className="text-gray-700 font-medium">
                    {lesson.updatedAt
                      ? new Date(lesson.updatedAt).toDateString()
                      : "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-blue max-w-none">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Lesson Overview
              </h3>
              <div className="">{lesson.lessonDesc}</div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 justify-center items-center">
          {lesson && <Creator lesson={lesson} />}
          <LessonEngagement lesson={lesson} user={user} />
        </div>
        <CommentSection lessonId={lesson._id} user={user} />
        <RecommendedLessons lessonId={lesson._id} />
      </section>
    </Container>
  );
};

export default LessonDetails;
