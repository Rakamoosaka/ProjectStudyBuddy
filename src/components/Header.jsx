import React from "react";
import LogoImage from "../assets/Logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex w-11/12 mx-auto items-center justify-between px-4 md:px-16 py-4 bg-[#f6f7ff] font-josefinSans">
      {/* Logo Section */}
      <Link to="/home">
        <div className="flex items-center space-x-2">
          <img
            src={LogoImage}
            alt="Study Buddy Logo"
            className="h-12 md:h-16"
          />
        </div>
      </Link>

      {/* Navigation Links and Search Button */}
      <div className="flex items-center space-x-4">
        {/* Search Button */}
        <Link to="/searchpage">
          <div className="hidden sm:flex items-center border-2 border-[#162850] rounded-full px-3 py-1 md:px-4 md:py-2 space-x-2 cursor-pointer">
            <button
              type="button"
              className="text-[#162850] flex items-center gap-5"
            >
              Search
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-4 h-4 md:w-5 md:h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                />
              </svg>
            </button>
          </div>
        </Link>

        {/* Log in and Sign up buttons */}
        <a
          href="/signin"
          className="text-[#162850] text-sm md:text-base font-semibold"
        >
          log in
        </a>
        <a
          href="/signup"
          className="bg-[#162850] text-[#F6F7FF] px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base font-semibold"
        >
          sign up
        </a>
      </div>
    </header>
  );
};

export default Header;
