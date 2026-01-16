import React from "react";
import { Link } from "react-router";
import logo from "../assets/logo.png"

const Logo = () => {
  return (
    <div>
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="w-6 h-6" />
        <p className="md:text-xl font-bold">Life Lessons</p>
      </Link>
    </div>
  );
};

export default Logo;
