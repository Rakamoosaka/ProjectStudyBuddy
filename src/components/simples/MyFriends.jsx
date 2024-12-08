import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import chatSVG from "../../assets/svg/chatSVG.svg";
import trashBinSVG from "../../assets/svg/trashBinSVG.svg";

const MyFriends = () => {
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/user/friends/show", {
        headers: { Authorization: `Bearer ${token}` },
      }) // Updated request path
      .then((response) => {
        console.log("Friends:", response.data);
        setFriends(response.data);
      })
      .catch((error) => console.error("Error fetching friends:", error));
  }, []);

  const handleTrashBinIcon = (friendId) => {
    axios
      .delete(`/user/friends/delete/${friendId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }) // Updated request path
      .then(() => {
        setFriends((prevFriends) =>
          prevFriends.filter((f) => f.id !== friendId)
        );
      })
      .catch((error) => console.error("Error deleting friend:", error));
  };

  const handleNavigateToProfile = (friendId) => {
    navigate(`/profilepage/${friendId}`);
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
                onClick={() => handleNavigateToProfile(friend.id)}
              >
                <img
                  src={friend.avatarPath || "https://via.placeholder.com/150"}
                  alt={friend.username}
                  className="w-12 h-12 rounded-full"
                />
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
