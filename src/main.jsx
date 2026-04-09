import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Register from "./pages/register.jsx";
import Feed from "./pages/feed.jsx";
import Login from "./pages/login.jsx";
import Addpost from "./pages/addpost.jsx";

const ProtectedRoute = ({ children }) => {
  const isloggedin = localStorage.getItem("Useremail");
  return isloggedin ? children : <Navigate to="/login" />;
};
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "login/register",
        element: <Register />,
      },
      {
        path: "",
        element: <Feed />,
      },
      {
        path: "addpost",
        element: (
          <ProtectedRoute>
            <Addpost />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
