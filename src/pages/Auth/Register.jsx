// import React from "react";
// import { useForm } from "react-hook-form";
// import useAuth from "../../hooks/useAuth";
// import { Link, useLocation, useNavigate } from "react-router";
// import SocialLogin from "./SocialLogin";
// import axios from "axios";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { toast } from "react-toastify";

// const Register = () => {
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//   } = useForm();

//   const { setUser, registerUser, updateUserProfile } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handelRegister = (data) => {
//     const profileImg = data.photo[0];

//     registerUser(data.email, data.password)
//       .then((result) => {
//         const user = result.user;
//         setUser(user);
//         // store the image and get the photoURL
//         const formData = new FormData();
//         formData.append("image", profileImg);

//         const image_API_URL = `https://api.imgbb.com/1/upload?key=${
//           import.meta.env.VITE_img_host
//         }`;

//         axios
//           .post(image_API_URL, formData)
//           .then((res) => {
//             console.log("after image uploaded", res.data.data.url);
//             const photoURL = res.data.data.url;

//             // update user profile in firebase
//             const userProfile = {
//               displayName: data.name,
//               photoURL: photoURL,
//             };

//             updateUserProfile(userProfile)
//               .then(() => {
//                 // create user in the database
//                 const userInfo = {
//                   email: data.email,
//                   displayName: data.name,
//                   photoURL: photoURL,
//                 };
//                 axiosSecure
//                   .post("/users", userInfo)
//                   .then(() => {
//                     toast.success("Account created successfully!");
//                     navigate(location.state || "/");
//                   })
//                   .catch((error) => console.log(error));
//               })
//               .catch((error) => console.log(error));
//           })
//           .catch((error) => console.log(error));
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
//       <form onSubmit={handleSubmit(handelRegister)} className="">
//         <div className="">
//           <div className="card-body">
//             <fieldset className="fieldset">
//               {/* Name field */}
//               <label className="label">Name</label>
//               <input
//                 type="text"
//                 {...register("name", { required: true })}
//                 className="input"
//                 placeholder="Your Name"
//               />
//               {errors.name?.type === "required" && (
//                 <p className="text-red-500">Name is required</p>
//               )}
//               {/* Photo field */}
//               <label className="label">Photo</label>
//               <input
//                 type="file"
//                 {...register("photo", { required: true })}
//                 className="file-input"
//                 placeholder="Your Photo"
//               />
//               {errors.photo?.type === "required" && (
//                 <p className="text-red-500">Photo is required</p>
//               )}
//               {/* email field */}
//               <label className="label">Email</label>
//               <input
//                 type="email"
//                 {...register("email", { required: true })}
//                 className="input"
//                 placeholder="Email"
//               />
//               {errors.email?.type === "required" && (
//                 <p className="text-red-500">Email is required</p>
//               )}
//               {/* password */}
//               <label className="label">Password</label>
//               <input
//                 type="password"
//                 {...register("password", {
//                   required: true,
//                   minLength: 6,
//                   pattern:
//                     /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
//                 })}
//                 className="input"
//                 placeholder="Password"
//               />
//               {errors.password?.type === "required" && (
//                 <p className="text-red-500">Password is required</p>
//               )}
//               {errors.password?.type === "minLength" && (
//                 <p className="text-red-500">
//                   Password must be 6 characters or longer
//                 </p>
//               )}
//               {errors.password?.type === "pattern" && (
//                 <p className="text-red-500">
//                   Password must contain at least 1 uppercase, 1 lowercase, 1
//                   number, and 1 special character.
//                 </p>
//               )}
//               <button className="btn btn-neutral mt-4">Register</button>
//             </fieldset>
//             <p>
//               Already have an account?{" "}
//               <Link
//                 state={location.state}
//                 className="text-blue-900 underline"
//                 to="/login"
//               >
//                 Login
//               </Link>
//             </p>
//           </div>
//         </div>
//       </form>
//       <SocialLogin />
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { setUser, registerUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleRegister = async (data) => {
    setLoading(true);
    setServerError("");

    try {
      // 1️⃣ Create user in Firebase
      const result = await registerUser(data.email, data.password);
      const user = result.user;
      setUser(user);

      // 2️⃣ Upload image to imgbb
      const formData = new FormData();
      formData.append("image", data.photo[0]);

      const imageAPI = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_img_host
      }`;

      const imgRes = await axios.post(imageAPI, formData);
      const photoURL = imgRes.data.data.url;

      // 3️⃣ Update Firebase profile
      await updateUserProfile({
        displayName: data.name,
        photoURL,
      });

      // 4️⃣ Save user to database
      await axiosSecure.post("/users", {
        email: data.email,
        displayName: data.name,
        photoURL,
      });

      toast.success("Account created successfully!");
      navigate(location.state || "/");

    } catch (error) {
      setServerError(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shadow-2xl">
      <form onSubmit={handleSubmit(handleRegister)}>
        <div className="card-body">
          <fieldset className="fieldset">

            {/* Name */}
            <label htmlFor="name" className="label">Name</label>
            <input
              id="name"
              type="text"
              className="input"
              placeholder="Your Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            {/* Photo */}
            <label htmlFor="photo" className="label mt-3">Photo</label>
            <input
              id="photo"
              type="file"
              className="file-input"
              {...register("photo", { required: "Photo is required" })}
            />
            {errors.photo && (
              <p className="text-red-500 text-sm">{errors.photo.message}</p>
            )}

            {/* Email */}
            <label htmlFor="email" className="label mt-3">Email</label>
            <input
              id="email"
              type="email"
              className="input"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            {/* Password */}
            <label htmlFor="password" className="label mt-3">Password</label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/,
                  message:
                    "Must include uppercase, lowercase, number and special character",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}

            {/* Server Error */}
            {serverError && (
              <p className="text-red-600 text-sm mt-3">{serverError}</p>
            )}

            {/* Button */}
            <button
              type="submit"
              className="btn btn-neutral mt-4"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </fieldset>

          <p className="mt-4 text-sm">
            Already have an account?{" "}
            <Link
              state={location.state}
              to="/login"
              className="text-blue-500 underline"
            >
              Login
            </Link>
          </p>
        </div>
      </form>

      <SocialLogin />
    </div>
  );
};

export default Register;