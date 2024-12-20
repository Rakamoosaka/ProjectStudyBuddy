import React from "react";
import LogoImage from "../assets/Logo.png";
import { Link } from "react-router-dom";
import DropdownWithBlob from "./simples/DropdownWithBlob";

const HeaderWithDropdown = ({ search }) => {
  return (
    <header className="relative flex w-11/12 mx-auto items-center justify-between px-4 md:px-16 py-4 bg-[#f6f7ff] font-josefinSans h-20 md:h-24">
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

      {/* Navigation Links and Search Bar */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}

        {!search && (
          <Link to="/searchpage">
            <button className="bg-white text-[#274B6D] text-lg font-medium py-2 px-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              Search
            </button>
          </Link>
        )}

        {/* Dropdown With Blob */}
        <div className="relative h-full flex items-center">
          <DropdownWithBlob />
        </div>
      </div>
    </header>
  );
};

export default HeaderWithDropdown;
