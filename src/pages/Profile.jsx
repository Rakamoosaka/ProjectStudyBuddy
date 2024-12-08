import React, { useState, useEffect } from "react";
import HeaderWithDropdown from "../components/HeaderWithDropdown";
import BuddiesTab from "../components/BuddiesTab";
import AcademicTab from "../components/AcademicTab";
import ProjectsTab from "../components/ProjectsTab";
import axios from "../axios";
import useAuth from "../hooks/useAuth";
import Footer from "../components/Footer";
import tabsSVG from "../assets/svg/tabsSVG.svg";
import EditProfilePopup from "../components/EditProfilePopup";
import { toast } from "react-toastify";

const Profile = () => {
  const { auth } = useAuth();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("Buddies");
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [isExpanded, setIsExpanded] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const notify = () => toast("Avatar updated successfully.");
  const toggleExpanded = () => {
    setIsExpanded((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Fetch user details
        const profileResponse = await axios.get("/user/profile/details", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(profileResponse.data);

        // Fetch avatar
        try {
          const avatarResponse = await axios.get(
            "/user/profile/avatar/my-get",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setAvatarUrl(avatarResponse.data.avatarUrl);
        } catch (avatarError) {
          if (avatarError.response && avatarError.response.status === 404) {
            console.warn("Avatar not found. Defaulting to placeholder.");
            setAvatarUrl(null); // Use placeholder if avatar not found
          } else {
            console.error("Error fetching avatar:", avatarError.message);
          }
        }
      } catch (error) {
        console.error(
          "Error fetching user profile:",
          error.response || error.message
        );
      }
    };

    fetchUserProfile();
  }, [token]);

  const handleProfileUpdate = async () => {
    try {
      const profileResponse = await axios.get("/user/profile/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(profileResponse.data);

      // Refresh avatar
      try {
        const avatarResponse = await axios.get("/user/profile/avatar/my-get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAvatarUrl(avatarResponse.data.avatarUrl);
      } catch (avatarError) {
        if (avatarError.response && avatarError.response.status === 404) {
          console.warn("Avatar not found during profile update.");
          setAvatarUrl(null);
        } else {
          console.error("Error updating avatar:", avatarError.message);
        }
      }

      setIsEditPopupOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error.response || error.message);
    }
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Load the image and crop it to a square
    const cropToSquare = (file) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const size = Math.min(img.width, img.height); // Use the smaller dimension for cropping
          const canvas = document.createElement("canvas");
          canvas.width = size;
          canvas.height = size;

          const ctx = canvas.getContext("2d");
          const offsetX = (img.width - size) / 2;
          const offsetY = (img.height - size) / 2;

          ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, size, size);
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Canvas cropping failed."));
          }, file.type);
        };
        img.onerror = () => reject(new Error("Failed to load image."));
        img.src = URL.createObjectURL(file);
      });
    };

    try {
      const croppedImageBlob = await cropToSquare(file);
      const formData = new FormData();
      formData.append("file", croppedImageBlob, file.name);

      console.log("Form Data:", formData);
      console.log("Token:", token);
      const response = await axios.post(
        "/user/profile/avatar/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAvatarUrl(response.data.avatarUrl);
      notify();

      handleProfileUpdate();
    } catch (error) {
      console.error("Error uploading cropped avatar:", error.message);
      alert("Failed to upload/update avatar. Please try again.");
    }
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
      <HeaderWithDropdown />

      {/* Profile Section */}
      <div className="bg-[#274B6D] mx-auto text-white w-10/12 p-6 rounded-lg flex flex-col justify-center gap-7 items-center md:flex-row">
        <div className="relative">
          <label htmlFor="avatar-upload" className="cursor-pointer">
            <img
              src={avatarUrl || "https://via.placeholder.com/150"}
              alt={`${userData?.username}'s profile`}
              className="rounded-lg w-32 h-32"
            />
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            style={{ display: "none" }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-normal">{userData?.username}</h2>
          <p className="text-sm">
            Known languages:{" "}
            {userData.languages?.length > 0
              ? userData.languages.map((lang) => lang.languageName).join(", ")
              : "Unknown"}
          </p>
          <p className="text-sm">
            About me:{" "}
            {userData?.about ? (
              <>
                {isExpanded
                  ? userData.about
                  : `${userData.about.slice(0, 30)}... `}
                {userData.about.length > 30 && (
                  <span
                    onClick={toggleExpanded}
                    className="text-white cursor-pointer hover:underline"
                  >
                    [{isExpanded ? "less" : "more"}]
                  </span>
                )}
              </>
            ) : (
              "No details provided."
            )}
          </p>
        </div>
        <button
          onClick={() => setIsEditPopupOpen(true)}
          className="bg-[#C2DAE1] text-[#274B6D] hover:bg-[#cae3ea] px-7 mt-auto rounded-lg"
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

      <div className="flex justify-center my-4">
        <img src={tabsSVG} className="absolute" alt="tabs" />
        {["Academic", "Buddies"].map((tab) => (
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

      <div className="flex-grow">{renderTab()}</div>
      <Footer />
    </div>
  );
};

export default Profile;
