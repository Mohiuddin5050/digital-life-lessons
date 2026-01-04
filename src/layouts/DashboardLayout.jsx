import React from "react";
import useStatus from "../hooks/useStatus";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link, Outlet } from "react-router";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { MdOutlineNoteAdd } from "react-icons/md";
import { RiHeartsFill } from "react-icons/ri";
import { PiNotebook } from "react-icons/pi";
import { LiaUsersSolid } from "react-icons/lia";
import { LuNotebook } from "react-icons/lu";
import { TbMessageReport } from "react-icons/tb";
import { IoSettingsSharp } from "react-icons/io5";

const DashboardLayout = () => {
  const { role, userLoading } = useStatus();

  if (userLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">Life Lessons Dashboard</div>
        </nav>
        {/* Page content here */}
        <Outlet />
      </div>
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-300 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow space-y-2">
            {/* List item */}
            {/* Dashboard drawer menu bar logo */}
            {/* <li>
              <Link to="/">
                <img src={logo} alt="" className="w-10" />
              </Link>
            </li> */}

            {/* Dashboard Home */}
            <li>
              <Link
                to="/dashboard"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Home Page"
              >
                {/* Home icon */}
                <FaHome size={20} />
                <span className="is-drawer-close:hidden">Home Page</span>
              </Link>
            </li>

            {/* Profile */}
            <li>
              <Link
                to="/dashboard/profile"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Profile"
              >
                {/* Profile icon */}
                <CgProfile size={20} />
                <span className="is-drawer-close:hidden">My Profile</span>
              </Link>
            </li>

            {/* Add Lesson  */}
            <li>
              <Link
                to="/dashboard/add-lesson"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Add Lesson"
              >
                {/* Add Lesson icon */}
                <MdOutlineNoteAdd size={20} />

                <span className="is-drawer-close:hidden">Add Lesson</span>
              </Link>
            </li>

            {/* My Lesson  */}
            <li>
              <Link
                to="/dashboard/my-lessons"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Lessons"
              >
                {/* My Lesson icon */}
                <PiNotebook size={20} />

                <span className="is-drawer-close:hidden">My Lessons</span>
              </Link>
            </li>

            {/* My Favorites  */}
            <li>
              <Link
                to="/dashboard/my-favorites"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Favorites"
              >
                {/* My Lesson icon */}
                <RiHeartsFill size={20} />

                <span className="is-drawer-close:hidden">My Favorites</span>
              </Link>
            </li>

            {/* Admin Access Only */}
            {role === "admin" && (
              <>
                <span className="h-0.5 w-full bg-gray-300"></span>
                {/* Manage User  */}
                <li>
                  <Link
                    to="/dashboard/admin/manage-users"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Users"
                  >
                    {/* Manage Users icon */}
                    <LiaUsersSolid size={20} />

                    <span className="is-drawer-close:hidden">Manage Users</span>
                  </Link>
                </li>

                {/* Manage Lessons  */}
                <li>
                  <Link
                    to="/dashboard/admin/manage-lessons"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Lessons"
                  >
                    {/* Manage Lessons icon */}
                    <LuNotebook size={20} />
                    <span className="is-drawer-close:hidden">
                      Manage Lessons
                    </span>
                  </Link>
                </li>

                {/* Reported Lesson  */}
                <li>
                  <Link
                    to="/dashboard/admin/reported-lessons"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Reported Lesson"
                  >
                    {/* Reported Lesson icon */}
                    <TbMessageReport size={20} />
                    <span className="is-drawer-close:hidden">
                      Reported Lesson
                    </span>
                  </Link>
                </li>
              </>
            )}

            {/* Settings */}
            <span className="h-0.5 w-full bg-gray-300"></span>
            <li>
              <Link
                to={"/dashboard/settings"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <IoSettingsSharp size={20} />

                <span className="is-drawer-close:hidden">Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
