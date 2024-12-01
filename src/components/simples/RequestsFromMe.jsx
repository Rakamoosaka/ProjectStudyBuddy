import React, { useState, useEffect } from "react";
import axios from "axios";

const RequestsFromMe = () => {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token"); // Get token from localStorage

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/friends/requests/from-me", {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
        },
      })
      .then((response) => {
        console.log("Requests data:", response.data);
        setRequests(response.data); // Update state with requests
      })
      .catch((error) => console.error("Error fetching requests:", error));
  }, []);

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
              <div className="flex items-center gap-4">
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
