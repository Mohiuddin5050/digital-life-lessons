// import { Link, NavLink } from "react-router";
// import useAuth from "../../../hooks/useAuth";
// import Container from "../../../components/Container";
// import { toast } from "react-toastify";
// import useStatus from "../../../hooks/useStatus";
// import LoadingSpinner from "../../../components/LoadingSpinner";
// import { CgProfile } from "react-icons/cg";
// import { MdOutlineDashboard } from "react-icons/md";
// import Logo from "../../../components/Logo";
// import { ThemeContext } from "../../../context/ThemeContext";
// import { useContext } from "react";

// const Navbar = () => {
//   const { theme, toggleTheme } = useContext(ThemeContext);
//   const { user, loading, logOut } = useAuth();
//   const { isPremium, useLoading } = useStatus();

//   if (loading || useLoading) {
//     return <LoadingSpinner />;
//   }

//   const handleLogout = () => {
//     logOut()
//       .then(() => {
//         toast.success("Log out successfully");
//       })
//       .catch(console.error);
//   };

//   const navLinks = (
//     <>
//       <li>
//         <NavLink to="/" className={({ isActive }) =>
//             isActive ? "text-purple-600 font-semibold" : "hover:text-purple-500"
//           }>Home</NavLink>
//       </li>
//       <li>
//         <NavLink to="/dashboard/add-lesson" className={({ isActive }) =>
//             isActive ? "text-purple-600 font-semibold" : "hover:text-purple-500"
//           }>Add Lesson</NavLink>
//       </li>
//       <li>
//         <NavLink to="/public-lessons" className={({ isActive }) =>
//             isActive ? "text-purple-600 font-semibold" : "hover:text-purple-500"
//           }>Public Lessons</NavLink>
//       </li>

//       {user && (
//         <>
//           <li>
//             <NavLink to="/dashboard/my-lessons" className={({ isActive }) =>
//             isActive ? "text-purple-600 font-semibold" : "hover:text-purple-500"
//           }>My Lessons</NavLink>
//           </li>
//           {isPremium === false && (
//             <li>
//               <NavLink to="/upgrade-membership" className={({ isActive }) =>
//             isActive ? "text-purple-600 font-semibold" : "hover:text-purple-500"
//           }>Upgrade Membership</NavLink>
//             </li>
//           )}
//         </>
//       )}
//     </>
//   );

//   return (
//     <Container>
//       <div className="navbar bg-base-100 shadow-sm">
//         {/* Left */}
//         <div className="navbar-start">
//           <div className="dropdown">
//             <label tabIndex={0} className="btn btn-ghost lg:hidden">
//               ☰
//             </label>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
//             >
//               {navLinks}
//             </ul>
//           </div>

//           <Logo />
//         </div>

//         {/* Center */}
//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal px-1">{navLinks}</ul>
//         </div>

//         {/* Right */}
//         <div className="navbar-end">
//           <button onClick={toggleTheme} className="mr-5">
//         {theme === "light" ? "🌙" : "☀️"}
//       </button>
//           {user ? (
//             <div className="dropdown dropdown-end">
//               <label tabIndex={0} className="cursor-pointer">
//                 <img
//                   src={user?.photoURL}
//                   alt="avatar"
//                   className="w-10 h-10 rounded-full border"
//                   referrerPolicy="no-referrer"
//                 />
//               </label>

//               <ul
//                 tabIndex={0}
//                 className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
//               >
//                 <li className="text-center">{user?.displayName || "User"}</li>
//                 <li>
//                   <Link to="/dashboard/profile">
//                     <CgProfile size={20} />
//                     <span className="is-drawer-close:hidden">Profile</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/dashboard">
//                     <MdOutlineDashboard size={20} />
//                     <span className="is-drawer-close:hidden">Dashboard</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <button onClick={handleLogout} className=" btn text-red-500">
//                     Logout
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           ) : (
//             <div className="space-x-2">
//               <Link to="/login" className="btn btn-outline btn-sm">
//                 Login
//               </Link>
//               <Link to="/register" className="btn btn-primary btn-sm">
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default Navbar;

import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Container from "../../../components/Container";
import { toast } from "react-toastify";
import useStatus from "../../../hooks/useStatus";
import { CgProfile } from "react-icons/cg";
import { MdOutlineDashboard } from "react-icons/md";
import { FiLogOut, FiMenu } from "react-icons/fi";
import Logo from "../../../components/Logo";
import { ThemeContext } from "../../../context/ThemeContext";
import { useContext } from "react";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logOut } = useAuth();
  const { isPremium } = useStatus();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Log out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const navStyle = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold"
      : "hover:text-primary transition duration-200";

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={navStyle}>
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/dashboard/add-lesson" className={navStyle}>
          Add Lesson
        </NavLink>
      </li>

      <li>
        <NavLink to="/public-lessons" className={navStyle}>
          Public Lessons
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/dashboard/my-lessons" className={navStyle}>
              My Lessons
            </NavLink>
          </li>

          {isPremium === false && (
            <li>
              <NavLink to="/upgrade-membership" className={navStyle}>
                Upgrade Membership
              </NavLink>
            </li>
          )}
        </>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-base-100 shadow-md">
      <Container>
        <div className="navbar px-0">

          {/* Left */}
          <div className="navbar-start">
            <div className="dropdown">
              <button
                className="btn btn-ghost lg:hidden"
                aria-label="Open Menu"
              >
                <FiMenu size={22} />
              </button>

              <ul className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-100 rounded-xl w-56 space-y-1">
                {navLinks}
              </ul>
            </div>

            <Logo />
          </div>

          {/* Center */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-3">
              {navLinks}
            </ul>
          </div>

          {/* Right */}
          <div className="navbar-end gap-3">

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-sm"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {user ? (
              <div className="dropdown dropdown-end">
                <button
                  className="avatar"
                  aria-label="User Menu"
                >
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={
                        user?.photoURL ||
                        "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                      alt="User Avatar"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </button>

                <ul className="menu dropdown-content mt-3 p-3 shadow bg-base-100 rounded-xl w-56 space-y-1">
                  <li className="text-sm font-semibold text-center border-b pb-2">
                    {user?.displayName || "User"}
                  </li>

                  <li>
                    <Link to="/dashboard/profile">
                      <CgProfile size={18} />
                      Profile
                    </Link>
                  </li>

                  <li>
                    <Link to="/dashboard">
                      <MdOutlineDashboard size={18} />
                      Dashboard
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-red-500 flex items-center gap-2"
                    >
                      <FiLogOut size={18} />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="btn btn-outline btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Sign Up
                </Link>
              </div>
            )}

          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;