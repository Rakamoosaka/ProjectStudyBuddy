import React, { useState } from "react";
import trashBinSVG from "../../assets/svg/trashBinSVG.svg";

const RequestsFromMe = () => {
  const [friends, setFriends] = useState(["Amir", "John", "Alex", "Sophia"]);

  const handleTrashBinIcon = (friend) => {
    console.log(`${friend} deleted`);
    setFriends((prevFriends) => prevFriends.filter((f) => f !== friend));
  };

  return (
    <div className="w-full lg:w-3/12 flex flex-col">
      <h2 className="text-lg font-bold mb-6">Requests (from me)</h2>
      <div className="flex flex-col gap-4">
        {friends.map((friend, index) => (
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
                <span className="block text-base font-medium">{friend}</span>
                <span className="block text-sm text-gray-300">Waiting...</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestsFromMe;
