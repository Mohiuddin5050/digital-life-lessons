import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Login from "../pages/Auth/login";
import Register from "../pages/Auth/Register";
import Home from "../pages/HomePage/Home";
import ForgetPassword from "../pages/Auth/ForgetPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: 'register',
        Component: Register
      },
      {
        path: 'forgetPassword',
        Component: ForgetPassword
      }
    ],
  },
]);
