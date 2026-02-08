import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";
import Swal from "sweetalert2";
import { useEffect } from "react";
import axios from "axios";
import useStatus from "../../hooks/useStatus";


const UpdateLesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  // const { user } = useAuth();
  const { isPremium} = useStatus();

  // const isPremium = user?.isPremium;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Load lesson
  const { data: lesson = {}, isLoading } = useQuery({
    queryKey: ["edit-lesson", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/edit/${id}`);
      return res.data;
    },
  });

  // Prefill
  useEffect(() => {
    if (lesson?._id) {
      setValue("lessonTitle", lesson.lessonTitle);
      setValue("lessonDesc", lesson.lessonDesc);
      setValue("category", lesson.category);
      setValue("emotionalTone", lesson.emotionalTone);
      setValue("privacy", lesson.privacy);
      setValue("accessLevel", lesson.accessLevel);
    }
  }, [lesson, setValue]);

  if (isLoading) return <LoadingSpinner />;

  const onSubmit = async (data) => {
    let imageUrl = lesson.lessonImage;

    //Image re-upload
    if (data.image?.length) {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_img_host
        }`,
        formData
      );

      imageUrl = imgRes.data.data.url;
    }

    const updatedLesson = {
      lessonTitle: data.lessonTitle,
      lessonDesc: data.lessonDesc,
      category: data.category,
      emotionalTone: data.emotionalTone,
      privacy: data.privacy,
      accessLevel: data.accessLevel,
      lessonImage: imageUrl,
    };

    await axiosSecure.patch(`/lessons/${id}`, updatedLesson);

    Swal.fire("Updated!", "Lesson updated successfully", "success");
    navigate("/dashboard/my-lessons");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-8">Update Lesson</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* LEFT */}
          <div className="space-y-5">
            <div>
              <label className="label">Lesson Title</label>
              <input
                className="input input-bordered w-full"
                {...register("lessonTitle", { required: true })}
              />
              {errors.lessonTitle && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>

            <div>
              <label className="label">Category</label>
              <select
                className="select select-bordered w-full"
                {...register("category", { required: true })}
              >
                <option value="">Select</option>
                <option value="personalGrowth">Personal Growth</option>
                <option value="career">Career</option>
                <option value="relationships">Relationships</option>
                <option value="mindset">Mindset</option>
                <option value="mistakesLearned">Mistakes Learned</option>
              </select>
            </div>

            <div>
              <label className="label">Emotional Tone</label>
              <select
                className="select select-bordered w-full"
                {...register("emotionalTone", { required: true })}
              >
                <option value="">Select</option>
                <option value="sad">Sad</option>
                <option value="gratitude">Gratitude</option>
                <option value="motivational">Motivational</option>
                <option value="realization">Realization</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Privacy</label>
                <select
                  className="select select-bordered w-full"
                  {...register("privacy", { required: true })}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <div>
                <label className="label">Access</label>
                <select
                  className="select select-bordered w-full"
                  {...register("accessLevel", { required: true })}
                >
                  <option value="free">Free</option>
                  <option value="paid" disabled={!isPremium}>
                    Paid
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-5">
            {/* <div>
              <label className="label">Current Image</label>
              {lesson.lessonImage && (
                <img
                  src={lesson.lessonImage}
                  alt="Lesson"
                  className="rounded-xl mb-2 max-h-40"
                />
              )}
            </div> */}

            <div>
              <label className="label">Re-upload Image</label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                {...register("image")}
              />
            </div>

            <div>
              <label className="label">Description</label>
              <textarea
                className="textarea textarea-bordered min-h-[200px] w-full"
                {...register("lessonDesc", { required: true })}
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <button className="btn btn-primary px-10">
            Update Lesson
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateLesson;
