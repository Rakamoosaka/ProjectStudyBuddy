import React, { useState } from "react";
import chatSVG from "../../assets/svg/chatSVG.svg";
import trashBinSVG from "../../assets/svg/trashBinSVG.svg";

const MyFriends = () => {
  const [friends, setFriends] = useState(["Amir", "John", "Alex", "Sophia"]);
  const handleTrashBinIcon = (friend) => {
    console.log(`${friend} deleted`);
    // Update state by filtering out the clicked friend
    setFriends((prevFriends) => prevFriends.filter((f) => f !== friend));
  };

  return (
    <div className="w-full lg:w-3/12 flex flex-col">
      <h2 className="text-xl font-bold mb-8">Friends</h2>
      <div className="flex flex-col">
        {friends.map((friend, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-[#274B6D] text-white p-3 mb-4 shadow-lg last:mb-0 rounded-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
              <div className="flex flex-col">
                <span className="text-base">{friend}</span>
                <div className="flex mt-2 gap-1">
                  <img src={chatSVG} alt="Chat Icon" />
                  <button className="text-sm font-normal">
                    Write a message
                  </button>
                </div>
              </div>
            </div>
            <img
              src={trashBinSVG}
              onClick={() => handleTrashBinIcon(friend)}
              alt="Delete Icon"
              className="cursor-pointer hover:opacity-80"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFriends;
