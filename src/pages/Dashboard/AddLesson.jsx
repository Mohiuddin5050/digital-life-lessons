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

  const { isPremium, useLoading } = useStatus();
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  if (useLoading || loading) {
    return <LoadingSpinner />;
  }

  const handleAddLesson = async (data) => {
    //store the image and get the Photo url
    let lessonImage = "";
    const selectedFile = data.lessonImg?.[0];

    // Upload only if image exists
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_img_host
      }`;

      await axios.post(image_API_URL, formData).then((res) => {
        const photoURL = res.data.data.url;
        lessonImage = photoURL;
      });
    }

    // Save the Lesson to the data base

    const lessonData = {
      ...data,
      lessonImage,
      createdBy: user.email,
    };

    await axiosSecure.post("/lessons", lessonData).then((res) => {
      if (res.data.insertedId) {
        toast.success("Lesson Created Successfully");
        // Show Lottie animation
        // setShowAnimation(true);
        // Hide after 2 seconds
        // setTimeout(() => setShowAnimation(false), 5500);
      }
    });

    // Reset the form
    reset();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="font-bold text-2xl md:text-4xl text-center mb-8">
        Add A Life Lesson
      </h2>

      <form onSubmit={handleSubmit(handleAddLesson)} className="text-black!">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12">
          {/* Left Side Lesson Title And Description */}
          <div>
            <fieldset className="fieldset">
              {/* Lesson Title */}
              <label className="label">Lesson Title</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Type your lesson title"
                {...register("lessonTitle", { required: true })}
              />
              {errors.lessonTitle?.type === "required" && (
                <p className="text-red-500">Add a lesson title</p>
              )}

              {/* Category  */}
              <label className="label">Category</label>
              <select
                defaultValue=""
                className="select w-full"
                {...register("category", { required: true })}
              >
                <option value="" disabled={true}>
                  Select Category
                </option>
                <option value="personalGrowth"> Personal Growth </option>
                <option value="career"> Career </option>
                <option value="relationships"> Relationships </option>
                <option value="mindset"> Mindset </option>
                <option value="mistakesLearned"> Mistakes Learned </option>
              </select>
              {errors.category?.type === "required" && (
                <p className="text-red-500">Select a category</p>
              )}

              {/* Emotional Tone  */}
              <label className="label">Emotional Tone</label>
              <select
                defaultValue=""
                className="select w-full"
                {...register("emotionalTone", { required: true })}
              >
                <option value="" disabled={true}>
                  Select A Emotional Tone
                </option>
                <option value="sad"> Sad </option>
                <option value="gratitude"> Gratitude </option>
                <option value="motivational"> Motivational </option>
                <option value="realization"> Realization </option>
              </select>
              {errors.emotionalTone?.type === "required" && (
                <p className="text-red-500">Select a emotional tone</p>
              )}

              {/*Lesson Privacy   */}
              <label className="label">Lesson Privacy</label>
              <select
                defaultValue=""
                className="select w-full"
                {...register("privacy", { required: true })}
              >
                <option value="" disabled={true}>
                  Select Lesson Privacy
                </option>
                <option value="public"> Public </option>
                <option value="private">Private</option>
              </select>
              {errors.privacy?.type === "required" && (
                <p className="text-red-500">Select lesson privacy</p>
              )}

              {/*Access Level */}
              <label className="label">Access Level </label>
              <select
                defaultValue=""
                className="select w-full"
                {...register("accessLevel", { required: true })}
              >
                <option value="" disabled={true}>
                  Select Access Level
                </option>
                <option value="free">Free</option>
                <option
                  value="paid"
                  disabled={!isPremium}
                  className={!isPremium ? "tooltip tooltip-right" : ""}
                  data-tip={
                    !isPremium
                      ? "Upgrade to Premium to create paid lessons."
                      : ""
                  }
                >
                  Paid
                </option>
              </select>
              {errors.accessLevel?.type === "required" && (
                <p className="text-red-500">Select access level </p>
              )}
            </fieldset>
          </div>

          {/* Right Side Lesson others Filed */}
          <div>
            <fieldset className="fieldset">
              {/*Lesson Images Input and show */}
              <div className="">
                {/* Lesson Image */}
                <label className="label">Image</label>
                <br />
                <input
                  type="file"
                  {...register("lessonImg", { required: true })}
                  className="file-input mt-1"
                  placeholder=""
                />
                {errors.lessonImg?.type === "required" && (
                  <p className="text-red-500">Image is required</p>
                )}

                {/* Show selected Img */}
                {/* <div>
                  {viewImage && (
                    <img
                      src={viewImage}
                      alt=""
                      className="h-50 w-50 object-cover object-center rounded-lg"
                    />
                  )}
                </div> */}
              </div>

              {/* Lesson Description  */}
              <div>
                <label className="label">Lesson Description</label>
                <textarea
                  className="textarea h-50! w-full mt-1"
                  placeholder="Type your story"
                  {...register("lessonDesc", { required: true })}
                />
                {errors.lessonDesc?.type === "required" && (
                  <p className="text-red-500">Write your story</p>
                )}
              </div>
            </fieldset>
          </div>
        </div>
        {/* Form Submit Button */}
        <div className="text-center">
          <input
            type="submit"
            value="Create a new life lesson"
            className="btn btn-primary mt-5"
          />
        </div>
      </form>
    </div>
  );
};

export default AddLesson;
