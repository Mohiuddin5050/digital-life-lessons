import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { registerUser } = useAuth();
   const location = useLocation();
  const navigate = useNavigate();

  const handelRegister = (data) => {
    console.log("after register", data);
    registerUser(data.email, data.password, data.displayName, data.photoURL
)
    .then(result=>{
      console.log(result.user);
      navigate(location?.state || "/");
    })
    .catch(error=>{
      console.log(error);
    })
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <form
        onSubmit={handleSubmit(handelRegister)}
        className=""
      >
        <div className="">
          <div className="card-body">
            <fieldset className="fieldset">
              {/* Name field */}
              <label className="label">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input"
                placeholder="Your Name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Name is required</p>
              )}
              {/* Photo field */}
              <label className="label">Photo</label>
              <input
                type="text"
                {...register("photo", { required: true })}
                className="input"
                placeholder="Your PhotoURL"
              />
              {errors.photo?.type === "required" && (
                <p className="text-red-500">Photo is required</p>
              )}
              {/* email field */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required</p>
              )}
              {/* password */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                })}
                className="input"
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be 6 characters or longer
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500">
                  Password must contain at least 1 uppercase, 1 lowercase, 1
                  number, and 1 special character.
                </p>
              )}
              <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
            <p>
          Already have an account?{" "}
          <Link
            state={location.state}
            className="text-blue-900 underline"
            to="/login"
          >
            Login
          </Link>
        </p>
          </div>
        </div>
      </form>
      <SocialLogin/>
    </div>
  );
};

export default Register;
