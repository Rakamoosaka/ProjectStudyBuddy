import React, { useState } from "react";
import trashBinSVG from "../../assets/svg/trashBinSVG.svg";

const RequestsToMe = () => {
  const [requests, setRequests] = useState(["Amir", "John", "Alex", "Sophia"]);

  const handleAccept = (friend) => {
    console.log(`${friend} accepted`);
    // Add logic for accepting the request
    setRequests((prevRequests) => prevRequests.filter((req) => req !== friend));
  };

  const handleDecline = (friend) => {
    console.log(`${friend} declined`);
    // Add logic for declining the request
    setRequests((prevRequests) => prevRequests.filter((req) => req !== friend));
  };

  const handleTrashBinIcon = (friend) => {
    console.log(`${friend} deleted`);
    // Update state by filtering out the clicked friend
    setRequests((prevRequests) => prevRequests.filter((req) => req !== friend));
  };

  return (
    <div className="w-full lg:w-3/12 flex flex-col">
      <h2 className="text-lg font-bold mb-6">Requests (to me)</h2>
      <div className="flex flex-col gap-4">
        {requests.map((request, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-[#274B6D] text-white p-4 rounded-lg shadow-md"
          >
            {/* Avatar and Info */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>

              {/* Text Information */}
              <div>
                <span className="block text-base font-medium">{request}</span>
                {/* Accept and Decline Buttons */}
                <div className="flex items-center gap-4 mt-1">
                  <button
                    onClick={() => handleAccept(request)}
                    className="text-sm text-green-400 hover:underline"
                  >
                    ✓ Accept
                  </button>
                  <button
                    onClick={() => handleDecline(request)}
                    className="text-sm text-red-400 hover:underline"
                  >
                    ✕ Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestsToMe;
