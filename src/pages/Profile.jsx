import React, { useState } from "react";
import BuddiesTab from "../components/BuddiesTab";
import AcademicTab from "../components/AcademicTab";
import ProjectsTab from "../components/ProjectsTab";
import HeaderWithDropdown from "../components/HeaderWithDropdown";
import tabsSVG from "../assets/svg/tabsSVG.svg";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Buddies");

  const renderTab = () => {
    switch (activeTab) {
      case "Buddies":
        return <BuddiesTab />;
      case "Academic":
        return <AcademicTab {...{ edit: true }} />;
      case "Projects":
        return <ProjectsTab />;
      default:
        return <BuddiesTab />;
    }
  };

  return (
    <div className="bg-[#f6f7ff] font-josefinSans min-h-screen flex flex-col gap-6">
      {/* Header Section */}
      <HeaderWithDropdown />

      {/* Profile Section */}
      <div className="bg-[#274B6D] mx-auto text-white w-10/12 p-6 rounded-lg flex flex-col justify-center gap-7 items-center md:flex-row">
        <img src="" alt="Profile Picture" />
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-normal">Omar</h2>
          <p className="text-sm">Known languages: English, Russian</p>
          <p className="text-sm">
            About me: Naruto potato aitore motato i like banana monkey super
            strit
          </p>
        </div>
        <button className="bg-[#C2DAE1] text-[#274B6D] px-7 mt-auto rounded-lg">
          edit profile
        </button>
      </div>

      {/* Navigation Section */}
      <div className="flex justify-center my-4">
        <img src={tabsSVG} className="absolute" />
        {["Academic", "Buddies", "Projects"].map((tab) => (
          <div
            key={tab}
            className={`relative mx-6 pt-2 mt-2 text-xl md:text-2xl cursor-pointer text-[#162850] ${
              activeTab === tab ? "font-semibold" : "font-medium"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute left-0 right-0 bottom-[-2px] h-[1.5px] bg-[#162850]"></span>
            )}
          </div>
        ))}
      </div>

      {/* Dynamic Content Section */}
      <div className="flex-grow">{renderTab()}</div>
    </div>
  );
};

export default ProfilePage;
