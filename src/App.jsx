import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AboutUs from "./pages/AboutUs";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ErrorPage from "./pages/ErrorPage";
import { AuthProvider } from "./hooks/AuthProvider";
import ProtectedRoute from "./pages/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/home",
      element: <Homepage />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/about-us",
      element: <AboutUs />,
    },
    {
      path: "/profilepage/:userId",
      element: <ProfilePage />,
    },
    {
      element: <ProtectedRoute />, // Protect these routes
      children: [
        {
          path: "/profile/:username",
          element: <Profile />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
      ],
    },
    {
      path: "*", // Catch-all route for 404
      element: <ErrorPage />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
