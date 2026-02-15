import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Container from "../../../components/Container";
import { toast } from "react-toastify";
import useStatus from "../../../hooks/useStatus";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { CgProfile } from "react-icons/cg";
import { MdOutlineDashboard } from "react-icons/md";
import Logo from "../../../components/Logo";

const Navbar = () => {
  const { user, loading, logOut } = useAuth();
  const { isPremium, useLoading } = useStatus();

  if (loading || useLoading) {
    return <LoadingSpinner />;
  }

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Log out successfully");
      })
      .catch(console.error);
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) =>
            isActive ? "text-purple-600 font-semibold" : "hover:text-purple-500"
          }>Home</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/add-lesson" className={({ isActive }) =>
            isActive ? "text-purple-600 font-semibold" : "hover:text-purple-500"
          }>Add Lesson</NavLink>
      </li>
      <li>
        <NavLink to="/public-lessons" className={({ isActive }) =>
            isActive ? "text-purple-600 font-semibold" : "hover:text-purple-500"
          }>Public Lessons</NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/dashboard/my-lessons" className={({ isActive }) =>
            isActive ? "text-purple-600 font-semibold" : "hover:text-purple-500"
          }>My Lessons</NavLink>
          </li>
          {isPremium === false && (
            <li>
              <NavLink to="/upgrade-membership" className={({ isActive }) =>
            isActive ? "text-purple-600 font-semibold" : "hover:text-purple-500"
          }>Upgrade Membership</NavLink>
            </li>
          )}
        </>
      )}
    </>
  );

  return (
    <Container>
      <div className="navbar bg-base-100 shadow-sm">
        {/* Left */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              ☰
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
            >
              {navLinks}
            </ul>
          </div>

          <Logo />
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>

        {/* Right */}
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="cursor-pointer">
                <img
                  src={user?.photoURL}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border"
                  referrerPolicy="no-referrer"
                />
              </label>

              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li className="text-center">{user?.displayName || "User"}</li>
                <li>
                  <Link to="/dashboard/profile">
                    <CgProfile size={20} />
                    <span className="is-drawer-close:hidden">Profile</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">
                    <MdOutlineDashboard size={20} />
                    <span className="is-drawer-close:hidden">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className=" btn text-red-500">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="space-x-2">
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
  );
};

export default Navbar;
