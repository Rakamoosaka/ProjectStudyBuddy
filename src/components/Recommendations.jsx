import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // Initialize navigation
  const [friends, setFriends] = useState([]);
  const [allUsernames, setAllUsernames] = useState([]); // Store all usernames
  const [searchInput, setSearchInput] = useState(""); // Store search input

  useEffect(() => {
    // Fetch friends
    axios
      .get("http://localhost:8080/user/friends/show", {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
        },
      })
      .then((response) => {
        const friendIds = response.data.map((friend) => friend.id);
        const friendNames = response.data.map((friend) => friend.username); // Extract IDs
        setFriends(friendNames); // Update state with friend IDs
      })
      .catch((error) => console.error("Error fetching friends:", error));
  }, [token]);

  useEffect(() => {
    // Fetch recommendations
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/user/matching/default",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRecommendations(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setError("Failed to load recommendations.");
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [token]);

  useEffect(() => {
    // Fetch all usernames
    const fetchUsernames = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/user/profile/all-usernames",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAllUsernames(response.data); // Update state with all usernames
      } catch (err) {
        console.error("Error fetching usernames:", err);
        setError("Failed to load usernames.");
      }
    };

    fetchUsernames();
  }, [token]);

  const handleNavigateToProfile = (userId) => {
    navigate(`/profilepage/${userId}`); // Navigate to the user's profile page
  };

  const handleSearch = () => {
    // Find user ID by username
    const user = allUsernames.find(
      (usernameObj) =>
        usernameObj.username.toLowerCase() === searchInput.toLowerCase()
    );
    if (user) {
      handleNavigateToProfile(user.id);
    } else {
      alert("User not found!");
    }
  };

  // Filter recommendations to exclude friends
  const filteredRecommendations = recommendations.filter(
    (rec) => !friends.includes(rec.buddiesName)
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="flex flex-wrap justify-between mb-4">
        <h2 className="text-xl font-bold">Recommendations</h2>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Find friends by name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="p-2 text-base border border-black rounded-md text-black placeholder-black bg-transparent focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSearch}
            className="ml-2 px-4 py-2 bg-[#C2DAE1] text-[#274B6D] hover:bg-[#cae3ea] mt-auto rounded-lg"
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {filteredRecommendations.slice(0, 3).map((rec) => (
          <div
            key={rec.buddiesName}
            className="flex flex-col items-center bg-white shadow rounded-lg p-3"
            style={{ flex: "1 1 calc(33.333% - 1rem)" }}
            onClick={() => handleNavigateToProfile(rec.buddiesId)} // Navigate on click
          >
            <h3 className="text-sm font-medium">{rec.buddiesName}</h3>
            <p className="text-xs text-gray-600 text-center">
              You are good at: {rec.myHelpToBuddieSubjects || "N/A"}
            </p>
            <p className="text-xs text-gray-600 text-center">
              He/She could help with: {rec.buddieHelpToMeSubjects || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
