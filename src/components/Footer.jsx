import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const handleGoToProfile = () => {
    const token = localStorage.getItem("token"); // Check for token in localStorage
    const username = localStorage.getItem("username");

    if (token && username) {
      navigate(`/profile/${username}`);
    } else {
      navigate(`/signin`); // Redirect to login page if no token is found
    }
  };

  const HandleGoToSearchPage = () => {
    const token = localStorage.getItem("token"); // Check for token in localStorage
    const username = localStorage.getItem("username");
    if (token && username) {
      navigate(`/searchpage`);
    } else {
      navigate(`/signin`); // Redirect to login page if no token is found
    }
  };

  return (
    <footer className="bg-[#526F8A] text-white py-10 px-8">
      <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Logo Section */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold">Study Buddy</h2>
          <p className="text-sm mt-2">
            Empowering learning through connection.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row md:space-x-10 text-center space-y-4 md:space-y-0">
          <Link to="/home" className="hover:text-gray-300">
            Home
          </Link>
          <button
            onClick={HandleGoToSearchPage}
            className="hover:text-gray-300 cursor-pointer bg-transparent border-none p-0 text-inherit"
          >
            Search for buddy
          </button>
          <button
            onClick={handleGoToProfile}
            className="hover:text-gray-300 cursor-pointer bg-transparent border-none p-0 text-inherit"
          >
            Profile
          </button>
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-t border-gray-700 mt-6 pt-6">
        <p className="text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Study Buddy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
