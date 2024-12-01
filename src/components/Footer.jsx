import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Footer() {
  const { username } = useAuth();

  const navigate = useNavigate();

  const handleGoToProfile = () => {
    if (username) {
      navigate(`/profile/${username}`);
    } else {
      console.error("Username not found");
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
          <a href="home" className="hover:text-gray-300">
            Home
          </a>
          <a href="searchpage" className="hover:text-gray-300">
            Search for buddy
          </a>
          <button
            onClick={handleGoToProfile}
            className="hover:text-gray-300 cursor-pointer bg-transparent border-none p-0 text-inherit"
          >
            Profile
          </button>
          <a href="chatpage" className="hover:text-gray-300">
            Chats
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-6 text-center">
          <a href="#" className="hover:text-gray-300" aria-label="Twitter">
            <i className="fab fa-twitter text-lg"></i>
          </a>
          <a href="#" className="hover:text-gray-300" aria-label="Facebook">
            <i className="fab fa-facebook text-lg"></i>
          </a>
          <a href="#" className="hover:text-gray-300" aria-label="Instagram">
            <i className="fab fa-instagram text-lg"></i>
          </a>
          <a href="#" className="hover:text-gray-300" aria-label="LinkedIn">
            <i className="fab fa-linkedin text-lg"></i>
          </a>
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
