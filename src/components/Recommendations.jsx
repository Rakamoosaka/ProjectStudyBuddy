import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState(""); // State for search input
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // Initialize navigation
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/friends/show", {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
        },
      })
      .then((response) => {
        const friendNames = response.data.map((friend) => friend.username);
        setFriends(friendNames); // Update state with friend names
      })
      .catch((error) => console.error("Error fetching friends:", error));
  }, [token]);

  useEffect(() => {
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

  const handleNavigateToProfile = (buddiesId) => {
    navigate(`/profilepage/${buddiesId}`); // Navigate to the recommended user's profile page
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const foundUser = recommendations.find(
        (rec) => rec.buddiesName.toLowerCase() === searchInput.toLowerCase()
      );
      if (foundUser) {
        handleNavigateToProfile(foundUser.buddiesId);
      } else {
        alert("User not found in recommendations.");
      }
    }
  };

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
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)} // Update search input state
          onKeyDown={handleSearch} // Trigger search on Enter key press
          placeholder="# Find friends by name"
          className="p-2 text-base border border-black rounded-md text-black placeholder-black bg-transparent focus:outline-none focus:border-blue-500"
        />
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
