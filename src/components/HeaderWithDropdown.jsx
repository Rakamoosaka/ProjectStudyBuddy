import React from 'react';
import LogoImage from '../assets/logo.png';
import { Link } from 'react-router-dom';
import DropdownWithBlob from './simples/DropdownWithBlob';

const HeaderWithDropdown = () => {
  return (
    <header className="relative flex w-11/12 mx-auto items-center justify-between px-4 md:px-16 py-4 bg-[#f6f7ff] font-josefinSans h-20 md:h-24">
      {/* Logo Section */}
      <Link to="/home">
        <div className="flex items-center space-x-2">
          <img src={LogoImage} alt="Study Buddy Logo" className="h-12 md:h-16" />
        </div>
      </Link>

      {/* Navigation Links and Search Bar */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="hidden sm:flex items-center border-2 border-[#162850] rounded-full px-3 py-1 md:px-4 md:py-2 space-x-2">
          <input
            type="text"
            placeholder="search"
            className="outline-none bg-transparent text-[#162850] text-sm md:text-base w-20 md:w-48 placeholder:text-[#162850]"
          />
        </div>

        {/* Dropdown With Blob */}
        <div className="relative h-full flex items-center">
          {/* Blob */}
          <div className="absolute -z-10 w-full h-full bg-[#CDF5FD] blur-3xl rounded-full"></div>

          {/* Dropdown Button */}
          <DropdownWithBlob />
        </div>
      </div>
    </header>
  );
};

export default HeaderWithDropdown;
