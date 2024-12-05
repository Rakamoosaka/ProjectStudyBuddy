import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";

const RequestsFromMe = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("/user/friends/requests/from-me", {
        headers: { Authorization: `Bearer ${token}` },
      }) // Updated request path
      .then((response) => {
        console.log("Requests data:", response.data);
        setRequests(response.data);
      })
      .catch((error) => console.error("Error fetching requests:", error));
  }, []);

  const handleNavigateToProfile = (userId) => {
    navigate(`/profilepage/${userId}`);
  };

  const handleDeleteRequest = (requestId) => {
    axios
      .delete(`/user/friends/requests/${requestId}/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      }) // Updated request path
      .then(() => {
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request.requestId !== requestId)
        );
        alert("Friend request deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting friend request:", error);
        alert("Failed to delete friend request.");
      });
  };

  return (
    <div className="w-full lg:w-3/12 flex flex-col">
      <h2 className="text-lg font-bold mb-6">Requests (from me)</h2>
      <div className="flex flex-col gap-4">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div
              key={request.requestId}
              className="flex items-center justify-between bg-[#274B6D] text-white p-4 rounded-lg shadow-md"
            >
              <div
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => handleNavigateToProfile(request.receiverId)}
              >
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div>
                  <span className="block text-base font-medium">
                    {request.receiverUsername}
                  </span>
                  <span className="block text-sm text-gray-300">
                    {request.requestStatus}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleDeleteRequest(request.requestId)}
                className="text-sm text-red-400 hover:underline"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <div>No requests sent</div>
        )}
      </div>
    </div>
  );
};

export default RequestsFromMe;
