import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";

const RequestsToMe = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/user/friends/requests/to-me", {
        headers: { Authorization: `Bearer ${token}` },
      }) // Updated request path
      .then((response) => {
        setRequests(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load friend requests.");
        setLoading(false);
      });
  }, []);

  const handleAccept = (requestId) => {
    setProcessing(true);
    axios
      .post(
        `/user/friends/requests/${requestId}/accept`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      ) // Updated request path
      .then(() => {
        setRequests((prevRequests) =>
          prevRequests.filter((req) => req.id !== requestId)
        );
      })
      .catch((error) => console.error("Error accepting request:", error))
      .finally(() => setProcessing(false));
  };

  const handleDecline = (requestId) => {
    setProcessing(true);
    axios
      .post(
        `/user/friends/requests/${requestId}/decline`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      ) // Updated request path
      .then(() => {
        setRequests((prevRequests) =>
          prevRequests.filter((req) => req.id !== requestId)
        );
      })
      .catch((error) => console.error("Error declining request:", error))
      .finally(() => setProcessing(false));
  };

  const handleNavigateToProfile = (userId) => {
    navigate(`/profilepage/${userId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full lg:w-3/12 flex flex-col">
      <h2 className="text-lg font-bold mb-6">Requests (to me)</h2>
      <div className="flex flex-col gap-4">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div
              key={request.requestId}
              className="flex items-center justify-between bg-[#274B6D] text-white p-4 rounded-lg shadow-md"
            >
              <div
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => handleNavigateToProfile(request.senderId)}
              >
                <img
                  className="w-10 h-10 bg-gray-300 rounded-full"
                  src={request.senderAvatarURL}
                  alt={request.senderUsername}
                />
                <div>
                  <span className="block text-base font-medium">
                    {request.senderUsername}
                  </span>
                  <div className="flex items-center gap-4 mt-1">
                    <button
                      onClick={() => handleAccept(request.requestId)}
                      disabled={processing}
                      className={`text-sm ${
                        processing
                          ? "text-gray-400"
                          : "text-green-400 hover:underline"
                      }`}
                    >
                      ✓ Accept
                    </button>
                    <button
                      onClick={() => handleDecline(request.requestId)}
                      disabled={processing}
                      className={`text-sm ${
                        processing
                          ? "text-gray-400"
                          : "text-red-400 hover:underline"
                      }`}
                    >
                      ✕ Decline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No pending requests</div>
        )}
      </div>
    </div>
  );
};

export default RequestsToMe;
