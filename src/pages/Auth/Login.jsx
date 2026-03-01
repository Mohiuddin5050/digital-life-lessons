// import React from "react";
// import { useForm } from "react-hook-form";
// import useAuth from "../../hooks/useAuth";
// import { Link, useLocation, useNavigate } from "react-router";
// import SocialLogin from "./SocialLogin";

// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const { signInUser } = useAuth();
//   const location = useLocation();
//   const Navigate = useNavigate();

//   const handleLogin = (data) => {
//     console.log("form data", data);
//     signInUser(data.email, data.password)
//       .then((result) => {
//         console.log(result.user);
//         Navigate(location?.state || "/");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   return (
//     <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
//       <form
//         className=""
//         onSubmit={handleSubmit(handleLogin)}
//       >
//         <div className="">
//           <div className="card-body">
//             <fieldset className="fieldset">
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
//               {/* password field */}
//               <label className="label">Password</label>
//               <input
//                 type="password"
//                 {...register("password", { required: true, minLength: 6 })}
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
//               <div>
//                 <Link to="/forgetPassword" className="link link-hover">Forgot password?</Link>
//               </div>
//               <button className="btn btn-neutral mt-4">Login</button>
//             </fieldset>
//             <p>
//               Don’t have any account?{" "}
//               <Link
//                 state={location.state}
//                 className="text-blue-900 underline"
//                 to="/register"
//               >
//                 Register
//               </Link>
//             </p>
//           </div>
//         </div>
//       </form>
//       <SocialLogin />
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  // 🔹 Normal Login
  const handleLogin = async (data) => {
    setLoading(true);
    setServerError("");

    try {
      await signInUser(data.email, data.password);
      toast.success("Login successful");
      navigate(location?.state || "/");
    } catch (error) {
      setServerError("Invalid email or password");
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Demo User Login
  const handleDemoUserLogin = async () => {
    try {
      setLoading(true);

      const result = await signInUser("demo@user.com", "S@kib123");
      toast.success("Login successful");

      const user = result.user;

      await axios.post("http://localhost:3000/users", {
        email: user.email,
        displayName: user.displayName || "Demo User",
        photoURL: user.photoURL || "",
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Demo Admin Login
 const handleDemoAdminLogin = async () => {
  try {
    setLoading(true);

    const result = await signInUser("admin@demo.com", "S@kib123");
    toast.success("Login successful");

    const user = result.user;

    await axios.post("http://localhost:3000/users", {
      email: user.email,
      displayName: user.displayName || "Demo Admin",
      photoURL: user.photoURL || "",
    });

    navigate("/");
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shadow-2xl">
      <div className="card-body">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {/* Demo Buttons */}
        <button
          onClick={handleDemoUserLogin}
          className="btn btn-outline w-full mb-2"
          disabled={loading}
        >
          Demo User Login
        </button>

        <button
          onClick={handleDemoAdminLogin}
          className="btn btn-outline w-full mb-4"
          disabled={loading}
        >
          Demo Admin Login
        </button>

        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset">
            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}

            {/* Password */}
            <label className="label mt-3">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            {serverError && (
              <p className="text-red-600 text-sm mt-3">{serverError}</p>
            )}

            <div className="mt-2">
              <Link to="/forgetPassword" className="link link-hover text-sm">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-neutral w-full mt-4"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </fieldset>
        </form>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <Link
            state={location.state}
            to="/register"
            className="text-blue-500 underline"
          >
            Register
          </Link>
        </p>

        <div className="mt-4">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
