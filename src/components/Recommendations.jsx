import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // Initialize navigation

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
        console.log("Recommendations:", response.data);
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
          placeholder="#_ Find friends by code"
          className="p-2 text-base border border-black rounded-md text-black placeholder-black bg-transparent focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex flex-wrap gap-4">
        {recommendations.map((rec) => (
          <div
            key={rec.BuddiesId}
            className="flex flex-col items-center bg-white shadow rounded-lg p-3"
            style={{ flex: "1 1 calc(33.333% - 1rem)" }}
            onClick={() => handleNavigateToProfile(rec.BuddiesId)} // Navigate on click
          >
            <h3 className="text-sm font-medium">{rec.BuddiesId}</h3>
            <p className="text-xs text-gray-600 text-center">
              Subjects you can help: {rec.MyHelpToBuddieSubjects || "N/A"}
            </p>
            <p className="text-xs text-gray-600 text-center">
              Subjects they can help you: {rec.BuddieHelpToMeSubjects || "N/A"}
            </p>
            <p className="text-xs text-gray-600 text-center">
              Match Score: {rec.totalScore || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
