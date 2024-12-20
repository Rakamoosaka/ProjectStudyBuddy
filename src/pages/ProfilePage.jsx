import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HeaderWithDropdown from "../components/HeaderWithDropdown";
import AcademicTab from "../components/AcademicTab";
import Footer from "../components/Footer";
import dropdownSVG from "../assets/svg/dropdown.svg";
import axios from "../axios";

const ProfilePage = () => {
  const { userId } = useParams(); // Extract userId from URL
  const [profileData, setProfileData] = useState(null);
  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFriend, setIsFriend] = useState(false); // Track if the person is a friend
  const [requestSent, setRequestSent] = useState(false); // Track if the request was sent
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [profileResponse, disciplinesResponse] = await Promise.all([
          axios.get(`/public/profile/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(`/public/profile/${userId}/disciplines`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        setProfileData(profileResponse.data);
        setDisciplines(disciplinesResponse.data);

        // Check if the person is a friend or if a request was already sent
        const [friendsResponse, requestsResponse] = await Promise.all([
          axios.get("/user/friends/show", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("/user/friends/requests/from-me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const friends = friendsResponse.data.map((friend) => friend.id);
        const requests = requestsResponse.data.map((req) => req.receiverId);

        setIsFriend(friends.includes(Number(userId))); // Check if user is in friends list
        setRequestSent(requests.includes(Number(userId))); // Check if request is already sent
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Failed to load profile data.");
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId, token]);

  const handleSendRequest = async () => {
    try {
      const payload = { username: profileData.username }; // Construct payload
      console.log("Payload:", payload); // Log the payload
      const response = await axios.post("/user/friends/send-request", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequestSent(true); // Update state to indicate the request was sent
      alert("Friend request sent successfully!");
      console.log(response.data);
    } catch (err) {
      console.error(
        "Error sending friend request:",
        err.response || err.message
      );
      alert("Failed to send friend request. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">{error}</div>
    );
  }

  const strengths = disciplines.filter(
    (discipline) => discipline.skillLevel > 5
  );
  const weaknesses = disciplines.filter(
    (discipline) => discipline.skillLevel <= 5
  );

  return (
    <div className="bg-[#f6f7ff] min-h-screen flex flex-col gap-6">
      <HeaderWithDropdown />

      {/* Profile Card */}
      <div className="bg-[#274B6D] mx-auto text-white w-10/12 p-6 rounded-lg flex flex-col md:flex-row items-center md:items-start">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile Picture"
          className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md ml-4 mr-8"
        />
        <div className="flex flex-col gap-2 flex-1">
          <h2 className="text-2xl font-normal">
            {profileData.username} {profileData.age} y.o / From{" "}
            {profileData.country}
          </h2>
          <p className="text-base">Friends: {profileData.numberOfFriends}</p>
          <p className="text-base">
            Known languages:{" "}
            {profileData.languages.length > 0
              ? profileData.languages
                  .map((lang) => lang.languageName)
                  .join(", ")
              : "Unknown"}
          </p>
        </div>
        <div className="flex gap-4 mt-auto">
          {!isFriend &&
            !requestSent && ( // Show the button only if not a friend and request not sent
              <button
                onClick={handleSendRequest}
                className="bg-[#C2DAE1] text-[#274B6D] px-4 py-2 cursor-pointer font-semibold rounded-lg"
              >
                Send a request
              </button>
            )}
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
        <p className="text-[#1b0d13] text-lg mt-2">{profileData.about}</p>
      </div>

      {/* Strengths and Weaknesses */}
      <AcademicTab edit={false} strengths={strengths} weaknesses={weaknesses} />
      <Footer />
    </div>
  );
};

export default ProfilePage;
