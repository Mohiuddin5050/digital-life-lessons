import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Container from "../../../components/Container";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut().then(() => {
      toast.success("Log out successfully");
    }).catch(console.error);
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/add-lesson">Add Lesson</NavLink>
      </li>
      <li>
        <NavLink to="/public-lessons">Public Lessons</NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/dashboard/my-lessons">My Lessons</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Upgrade</NavLink>
          </li>
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

          <Link to="/" className="btn btn-ghost text-xl font-bold">
            Digital Life Lessons
          </Link>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>

        {/* Right */}
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost flex items-center gap-2"
              >
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full border"
                  referrerPolicy="no-referrer"
                />
                <span className="hidden md:block">
                  {user.displayName || "User"}
                </span>
              </label>

              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/dashboard/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-red-500">
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
