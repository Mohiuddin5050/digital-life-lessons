import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaCrown } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import LessonCard from "../../Lessons/LessonCard";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useStatus from "../../../hooks/useStatus";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Container from "../../../components/Container";

const UserProfile = () => {
  const { user, setUser, updateUserProfile, setLoading } = useAuth();
  const { isPremium } = useStatus();
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef();
  const [preview, setPreview] = useState(null);
  const { register, handleSubmit } = useForm();

  // ===== User Info =====
  const {
    data: userData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  const currentUser = userData[0];

  // ===== My Lessons =====
  const { data: lessons = [], isLoading: lessonsLoading } = useQuery({
    queryKey: ["my-lessons", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/my?email=${user.email}`);
      return res.data;
    },
  });

  // ===== Favorites =====
  const { data: favorites = [] } = useQuery({
    queryKey: ["favorites", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites/my?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading || lessonsLoading) return <LoadingSpinner />;

  const publicLessons = lessons
    .filter((l) => l.privacy === "public")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // ===== Update Profile =====
  const onUpdate = async (data) => {
    let photoURL = currentUser.photoURL;

    if (data.photo?.[0]) {
      const formData = new FormData();
      formData.append("image", data.photo[0]);

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_host}`,
        formData,
      );
      photoURL = res.data.data.url;
    }

    const updateData = {
      displayName: data.name,
      photoURL,
    };

    updateUserProfile(updateData)
      .then(() => {
        setUser({ ...user, ...updateData });
        return axiosSecure.patch(`/users?email=${user.email}`, updateData);
      })
      .then(() => {
        refetch();
        Swal.fire("Updated", "Profile updated successfully", "success");
      })
      .catch(() => setLoading(false));

    modalRef.current.close();
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Container>
        {/* ===== Profile Card ===== */}
        <div className="bg-white rounded-2xl shadow p-6 mt-10 flex flex-col md:flex-row gap-6 items-center justify-center max-w-lg mx-auto">
          <div className="relative">
            <img
              src={
                currentUser.photoURL || "https://i.ibb.co/2n9xk5Q/avatar.png"
              }
              className="w-32 h-32 rounded-full object-cover border-4 border-primary"
            />
            <button
              onClick={() => modalRef.current.showModal()}
              className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full cursor-pointer"
            >
              <BiEdit />
            </button>
          </div>

          <div className="">
            <h2 className="text-2xl font-bold flex items-center gap-2 justify-center md:justify-start">
              {currentUser.displayName}
              {isPremium && <FaCrown className="text-yellow-500" />}
            </h2>

            <p className="text-gray-500">{currentUser.email}</p>

            <div className="flex gap-4 justify-center md:justify-start mt-4">
              <span className="badge badge-outline">
                {publicLessons.length} Lessons
              </span>
              <span className="badge badge-outline">
                {favorites.length} Saved
              </span>
            </div>
          </div>
        </div>

        {/* ===== Lessons ===== */}
        <div className="mt-12">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-5">
            All created lesson
          </h3>

          {publicLessons.length === 0 ? (
            <p className="text-center text-gray-500">No public lessons yet</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {publicLessons.map((lesson) => (
                <LessonCard key={lesson._id} lesson={lesson} />
              ))}
            </div>
          )}
        </div>
      </Container>

      {/* ===== Update Modal ===== */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box rounded-2xl">
          <h3 className="font-bold text-xl mb-4 text-center">Update Profile</h3>

          <form onSubmit={handleSubmit(onUpdate)}>
            <label className="flex items-center gap-3 cursor-pointer mb-4">
              <IoCloudUploadOutline size={25} />
              <input
                type="file"
                hidden
                {...register("photo", {
                  onChange: (e) =>
                    setPreview(URL.createObjectURL(e.target.files[0])),
                })}
              />
              <span className="text-sm text-gray-500">Change photo</span>
            </label>

            {preview && (
              <img
                src={preview}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
            )}

            <input
              {...register("name")}
              defaultValue={currentUser.displayName}
              className="input input-bordered w-full mb-4"
              placeholder="Display name"
            />

            <button className="btn btn-primary w-full">Save Changes</button>
          </form>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-outline">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UserProfile;
