import "./App.css";
import Homepage from "./pages/Homepage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import SearchResults from "./pages/SearchResults";
import ChatPage from "./pages/ChatPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/simples/ErrorPage";
import { UserProvider } from "./hooks/UserContext"; // Import UserProvider
import ProtectedRoute from "./components/ProtectedRoute";
import AboutUs from "./pages/AboutUs";

// Create routes
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
      {
        path: "/chatpage",
        element: <ChatPage />,
      },
      {
        path: "/searchresults",
        element: <SearchResults />,
      },
      {
        path: "/searchpage",
        element: <SearchPage />,
      },
      {
        path: "/profilepage",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "*", // Catch-all route for 404
    element: <ErrorPage />,
  },
]);

// Wrap the RouterProvider in UserProvider
const App = () => {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
};

export default App;
