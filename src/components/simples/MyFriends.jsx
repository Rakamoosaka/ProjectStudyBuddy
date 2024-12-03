import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import chatSVG from "../../assets/svg/chatSVG.svg";
import trashBinSVG from "../../assets/svg/trashBinSVG.svg";

const MyFriends = () => {
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  const token = localStorage.getItem("token"); // Get token from localStorage

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/friends/show", {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
        },
      })
      .then((response) => {
        console.log("Friends:", response.data);
        setFriends(response.data);
      })
      .catch((error) => console.error("Error fetching friends:", error));
  }, []);

  const handleTrashBinIcon = (friendId) => {
    axios
      .delete(`http://localhost:8080/user/friends/delete/${friendId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setFriends((prevFriends) =>
          prevFriends.filter((f) => f.id !== friendId)
        );
      })
      .catch((error) => console.error("Error deleting friend:", error));
  };

  const handleNavigateToProfile = (friendId) => {
    navigate(`/profilepage/${friendId}`); // Navigate to the friend's ProfilePage
  };

  return (
    <div className="w-full lg:w-3/12 flex flex-col">
      <h2 className="text-xl font-bold mb-8">Friends</h2>
      <div className="flex flex-col">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center justify-between bg-[#274B6D] text-white p-3 mb-4 shadow-lg last:mb-0 rounded-md"
            >
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => handleNavigateToProfile(friend.id)} // Navigate on click
              >
                <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
                <div className="flex flex-col">
                  <span className="text-base">{friend.username}</span>
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
                onClick={() => handleTrashBinIcon(friend.id)}
                alt="Delete Icon"
                className="cursor-pointer hover:opacity-80"
              />
            </div>
          ))
        ) : (
          <div>No friends acquired yet</div>
        )}
      </div>
    </div>
  );
};

export default MyFriends;
