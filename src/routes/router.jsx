import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Login from "../pages/Auth/login";
import Register from "../pages/Auth/Register";
import Home from "../pages/HomePage/Home";
import ForgetPassword from "../pages/Auth/ForgetPassword";
import PublicLesson from "../pages/PublicLesson/PublicLesson";
import AddLesson from "../pages/Dashboard/AddLesson";
import LessonDetails from "../pages/PublicLesson/LessonDetails";
import PrivetRoute from "./PrivetRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyLessons from "../pages/Dashboard/MyLessons";
import UpgradeMembership from "../pages/Payment/UpgradeMembership";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "forgetPassword",
        Component: ForgetPassword,
      },
      {
        path: "public-lessons",
        Component: PublicLesson,
      },
      {
        path: "upgrade-membership",
        element: (
          <PrivetRoute>
            <UpgradeMembership />
          </PrivetRoute>
        ),
      },

      {
        path: "lessons/:id",
        element: (
          <PrivetRoute>
            <LessonDetails />
          </PrivetRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivetRoute>
        <DashboardLayout></DashboardLayout>
      </PrivetRoute>
    ),
    children: [
      {
        path: "add-lesson",
        Component: AddLesson,
      },
      {
        path: "my-lessons",
        Component: MyLessons,
      },
    ],
  },
]);
