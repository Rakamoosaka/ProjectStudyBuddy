import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For redirecting if needed
import BuddiesTab from "../components/BuddiesTab";
import AcademicTab from "../components/AcademicTab";
import ProjectsTab from "../components/ProjectsTab";
import HeaderWithDropdown from "../components/HeaderWithDropdown";
import axios from "../axios"; // Assuming axios is already configured for your API
import tabsSVG from "../assets/svg/tabsSVG.svg";
import Footer from "../components/Footer";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("Buddies");

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("jwt");

      if (!token) {
        navigate("/signin");
        return;
      }

      try {
        const [nicknameResponse, aboutResponse, languagesResponse] =
          await Promise.all([
            axios.get("/user/profile/nickname", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get("/user/profile/about", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get("/user/profile/language", {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

        setUserData({
          username: nicknameResponse.data,
          about: aboutResponse.data,
          language:
            languagesResponse.data
              .map((lang) => lang.languageName)
              .join(", ") || "Unknown",
          profilePicture: "https://via.placeholder.com/150", // Placeholder, replace if the backend provides a URL
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
        if (error.response?.status === 401) {
          navigate("/signin");
        }
      }
    };

    fetchProfileData();
  }, [navigate]);

  const renderTab = () => {
    switch (activeTab) {
      case "Buddies":
        return <BuddiesTab />;
      case "Academic":
        return <AcademicTab edit={true} />;
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
          src={userData.profilePicture} // Use dynamic profile picture URL
          alt={`${userData.username}'s profile`}
          className=" h-48 object-cover rounded-md"
        />
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-normal">{userData.username}</h2>
          <p className="text-sm">Known languages: {userData.language}</p>
          <p className="text-sm">
            About me: {userData.about || "No details provided."}
          </p>
        </div>
        <button className="bg-[#C2DAE1] text-[#274B6D] px-7 mt-auto rounded-lg">
          Edit profile
        </button>
      </div>

      {/* Navigation Section */}
      <div className="flex justify-center my-4">
        <img src={tabsSVG} className="absolute" alt="Tabs background" />
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
