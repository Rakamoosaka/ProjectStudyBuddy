import React from "react";
import HeaderWithDropdown from "../components/HeaderWithDropdown";
import askhat from "../assets/askhat-profile.png";
import dropdownSVG from "../assets/svg/dropdown.svg";
import AcademicTab from "../components/AcademicTab";
import Footer from "../components/Footer";

const ProfilePage = () => {
  return (
    <div className="bg-[#f6f7ff] min-h-screen flex flex-col gap-6">
      <HeaderWithDropdown />

      {/* Profile Card */}
      <div className="bg-[#274B6D] mx-auto text-white w-10/12 p-6 rounded-lg flex flex-col md:flex-row items-center md:items-start">
        <img
          src={askhat}
          alt="Profile Picture"
          className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md ml-4 mr-8"
        />
        <div className="flex flex-col gap-2 flex-1">
          <h2 className="text-2xl font-normal">Askhat 21 y.o / From Germany</h2>
          <p className="text-base">Friends: 29 (5 mutual)</p>
          <p className="text-base">
            Known languages: German, English, Russian, Kazakh
          </p>
        </div>
        <div className="flex gap-4 mt-auto">
          <button className="bg-[#C2DAE1] text-[#274B6D] px-4 py-2 cursor-pointer font-semibold rounded-lg">
            Send a message
          </button>
          <button className="bg-[#C2DAE1] text-[#274B6D] px-4 py-2 cursor-pointer font-semibold rounded-lg">
            Send a request
          </button>
        </div>
      </div>

      {/* About Section */}
      <div className="flex flex-col max-w-3xl mx-auto text-center mt-6">
        <div className="relative flex justify-center items-center">
          <img src={dropdownSVG} alt="Blob" className="absolute" />
          <div className="relative">
            <button className="px-6 py-3 text-[#162850] font-medium text-xl rounded-lg focus:outline-none">
              About me:
            </button>
          </div>
        </div>
        <p className="text-[#1b0d13] text-lg mt-2">
          Hello everyone, I will be really happy if you want to see me as a
          friend. Also I really love studying, in University I’m studying
          medicine; that process gives me a thought that I’m developing myself
          and not having degradation.
        </p>
      </div>

      {/* Strengths and Weaknesses */}
      <AcademicTab />
      <Footer />
    </div>
  );
};

export default ProfilePage;
