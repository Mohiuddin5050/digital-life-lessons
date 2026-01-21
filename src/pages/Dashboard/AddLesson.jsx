import React from "react";
import { useForm } from "react-hook-form";
import useStatus from "../../hooks/useStatus";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";
import { toast } from "react-toastify";
import axios from "axios";

const AddLesson = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { isPremium, userLoading } = useStatus();
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  if (userLoading || loading) {
    return <LoadingSpinner />;
  }

  const handleAddLesson = async (data) => {
    try {
      let lessonImage = "";
      const selectedFile = data.lessonImg?.[0];

      // Upload image if exists
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_img_host
        }`;

        const res = await axios.post(image_API_URL, formData);
        lessonImage = res.data.data.url;
      }

      const lessonData = {
        lessonTitle: data.lessonTitle,
        category: data.category,
        emotionalTone: data.emotionalTone,

        privacy: data.privacy,
        accessLevel: data.accessLevel,

        lessonDesc: data.lessonDesc,
        lessonImage,
        createdBy: user.email,

        isFeatured: false,
        createdAt: new Date(),

        likes: [],
        likesCount: 0,
        favoritesCount: 0,
      };

      await axiosSecure.post("/lessons", lessonData);

      toast.success("Lesson Created Successfully");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create lesson");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="bg-base-100 shadow-xl rounded-2xl p-6 md:p-10">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">
          Add a Life Lesson
        </h2>

        <form onSubmit={handleSubmit(handleAddLesson)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LEFT */}
            <div className="space-y-5">
              <div>
                <label className="label font-medium">Lesson Title</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter lesson title"
                  {...register("lessonTitle", { required: true })}
                />
                {errors.lessonTitle && (
                  <p className="text-red-500 text-sm">
                    Lesson title is required
                  </p>
                )}
              </div>

              <div>
                <label className="label font-medium">Category</label>
                <select
                  className="select select-bordered w-full"
                  {...register("category", { required: true })}
                >
                  <option value="">Select category</option>
                  <option value="personalGrowth">Personal Growth</option>
                  <option value="career">Career</option>
                  <option value="relationships">Relationships</option>
                  <option value="mindset">Mindset</option>
                  <option value="mistakesLearned">Mistakes Learned</option>
                </select>
              </div>

              <div>
                <label className="label font-medium">Emotional Tone</label>
                <select
                  className="select select-bordered w-full"
                  {...register("emotionalTone", { required: true })}
                >
                  <option value="">Select tone</option>
                  <option value="sad">Sad</option>
                  <option value="gratitude">Gratitude</option>
                  <option value="motivational">Motivational</option>
                  <option value="realization">Realization</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label font-medium">Privacy</label>
                  <select
                    className="select select-bordered w-full"
                    {...register("privacy", { required: true })}
                  >
                    <option value="">Select</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                <div>
                  <label className="label font-medium">Access Level</label>
                  <select
                    className="select select-bordered w-full"
                    {...register("accessLevel", { required: true })}
                  >
                    <option value="">Select</option>
                    <option value="free">Free</option>
                    <option value="premium" disabled={!isPremium}>
                      Paid 
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-5">
              <div>
                <label className="label font-medium">Lesson Image</label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  {...register("lessonImg")}
                />
              </div>

              <div>
                <label className="label font-medium">Lesson Description</label>
                <textarea
                  className="textarea textarea-bordered w-full min-h-[200px]"
                  placeholder="Write your life lesson here..."
                  {...register("lessonDesc", { required: true })}
                />
                {errors.lessonDesc && (
                  <p className="text-red-500 text-sm">
                    Description is required
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <button className="btn btn-primary px-10">Create Lesson</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLesson;
