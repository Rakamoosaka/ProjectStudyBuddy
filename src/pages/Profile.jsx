import React, { useState, useEffect } from "react";
import HeaderWithDropdown from "../components/HeaderWithDropdown";
import BuddiesTab from "../components/BuddiesTab";
import AcademicTab from "../components/AcademicTab";
import ProjectsTab from "../components/ProjectsTab";
import axios from "../axios";
import useAuth from "../hooks/useAuth";
import Footer from "../components/Footer";
import tabsSVG from "../assets/svg/tabsSVG.svg";
import EditProfilePopup from "../components/EditProfilePopup"; // Import the popup component

const Profile = () => {
  // Get user information from auth context
  const { auth } = useAuth();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("Buddies");
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false); // Popup state
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch user profile data from the backend
    axios
      .get("http://localhost:8080/user/profile/details", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
        console.log("User Data:", response.data);
        localStorage.setItem("username", response?.data?.username);
        localStorage.setItem("details", JSON.stringify(response?.data));
      })
      .catch((error) => {
        console.error(
          "Error fetching user profile:",
          error.response || error.message
        );
      });
  }, []);

  const handleProfileUpdate = () => {
    // Refresh user profile data after update
    axios
      .get("http://localhost:8080/user/profile/details", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
        setIsEditPopupOpen(false); // Close popup
        alert("Profile updated successfully!");
      })
      .catch((error) => {
        console.error(
          "Error updating profile:",
          error.response || error.message
        );
      });
  };

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

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#f6f7ff] font-josefinSans min-h-screen flex flex-col gap-6">
      {/* Header Section */}
      <HeaderWithDropdown />

      {/* Profile Section */}
      <div className="bg-[#274B6D] mx-auto text-white w-10/12 p-6 rounded-lg flex flex-col justify-center gap-7 items-center md:flex-row">
        <img
          src={userData.profilePicture || "https://via.placeholder.com/150"}
          alt={`${userData?.username}'s profile`}
          className="rounded-full w-32 h-32"
        />
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-normal">{userData?.username}</h2>
          <p className="text-sm">
            Known languages:{" "}
            {userData.languages?.length > 0
              ? userData.languages.map((lang) => lang.languageName).join(", ")
              : "Unknown"}
          </p>
          <p className="text-sm">
            About me: {userData?.about || "No details provided."}
          </p>
        </div>
        <button
          onClick={() => setIsEditPopupOpen(true)}
          className="bg-[#C2DAE1] text-[#274B6D] px-7 mt-auto rounded-lg"
        >
          Edit profile
        </button>
      </div>

      {/* Edit Profile Popup */}
      <EditProfilePopup
        isOpen={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
        userDetails={userData}
        onUpdate={handleProfileUpdate}
      />

      {/* Navigation Section */}
      <div className="flex justify-center my-4">
        <img src={tabsSVG} className="absolute" alt="tabs" />
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
      <Footer />
    </div>
  );
};

export default Profile;
