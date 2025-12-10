import React from "react";
import { Link, NavLink } from "react-router";

// import useAuth from "../../../hooks/useAuth";

const Navbar = () => {

  const links = <>
  <li><NavLink to="/">Home</NavLink></li>
  </>
  // const { user, logOut } = useAuth();
  
  // const handleLogout = () => {
  //   logOut()
  //     .then()
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const links = (
  //   <>
  //     <li>
  //       <NavLink to="/">Home</NavLink>
  //     </li>
  //     <li>
  //       <NavLink to=""></NavLink>
  //     </li>
  //     <li>
  //       <NavLink to=""></NavLink>
  //     </li>

  //     <li>
  //       <NavLink to="">About Us</NavLink>
  //     </li>

  //     {user && (
  //       <>
  //         <li>
  //           <NavLink to=""></NavLink>
  //         </li>
  //         <li>
  //           <NavLink to=""></NavLink>
  //         </li>
  //       </>
  //     )}
  //   </>
  // );
  return (
    // <div className="navbar bg-base-100 shadow-sm">
    //   <div className="navbar-start">
    //     <div className="dropdown">
    //       <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           className="h-5 w-5"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           stroke="currentColor"
    //         >
    //           {" "}
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             d="M4 6h16M4 12h8m-8 6h16"
    //           />{" "}
    //         </svg>
    //       </div>
    //       <ul
    //         tabIndex="-1"
    //         className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
    //       >
    //         {links}
    //       </ul>
    //     </div>
        
    //   </div>
    //   <div className="navbar-center hidden lg:flex">
    //     <ul className="menu menu-horizontal px-1">{links}</ul>
    //   </div>
    //   <div className="navbar-end">
    //     {user ? (
    //       <a className="btn" onClick={handleLogout}>
    //         Sign Out
    //       </a>
    //     ) : (
    //       <Link className="btn" to="/login">
    //         Sign In
    //       </Link>
    //     )}
        
    //   </div>
    // </div>

    <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold mr-1.5">DL</div>
        <div></div>
    <Link to="/"><span className="text-xl font-semibold ">Digital</span>
    <br /> 
    <span>Life Lessons</span>
    </Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>
</div>
  );
};

export default Navbar;
