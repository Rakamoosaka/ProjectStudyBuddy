import React, { useState, useEffect } from "react";
import axios from "axios";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch recommendations
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        console.log("Fetching recommendations...");
        const response = await axios.get(
          "http://localhost:8080/matching/default",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Recommendations data:", response.data);
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
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white shadow rounded-lg p-3"
            style={{ flex: "1 1 calc(33.333% - 1rem)" }}
          >
            <img
              src={rec.profilePicture || "https://via.placeholder.com/100"}
              alt={`${rec.username}'s profile`}
              className="w-16 h-16 rounded-full mb-2"
            />
            <h3 className="text-sm font-medium">{rec.username}</h3>
            <p className="text-xs text-gray-600 text-center">
              {rec.about || "No bio available."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
