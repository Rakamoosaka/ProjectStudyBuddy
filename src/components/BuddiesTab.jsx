import React, { useState } from "react";
import chatSVG from "../assets/svg/chatSVG.svg";
import trashBinSVG from "../assets/svg/trashBinSVG.svg";
import MyFriends from "../components/simples/MyFriends";
import RequestsFromMe from "../components/simples/RequestsFromMe";
import RequestsToMe from "../components/simples/RequestsToMe";

const BuddiesTab = () => {
  // State to manage the friends list
  const [friends, setFriends] = useState(["Amir", "John", "Alex", "Sophia"]);

  // State to manage the active component
  const [activeComponent, setActiveComponent] = useState("MyFriends");

  // State to manage dropdown visibility
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const somepeople = [
    {
      name: "Aitore",
      info: "You have 3 mutual friends",
      img: "https://via.placeholder.com/100",
    },
    {
      name: "Omar",
      info: "You have 2 mutual friends",
      img: "https://via.placeholder.com/100",
    },
    {
      name: "Nurmukhammed",
      info: "You have 124 mutual friends",
      img: "https://via.placeholder.com/100",
    },
  ];

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleComponentChange = (component) => {
    setActiveComponent(component);
    setDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div className="flex-grow p-6 flex flex-col lg:flex-row justify-center gap-24">
      {/* Render the active component */}

      {activeComponent === "MyFriends" && <MyFriends />}
      {activeComponent === "RequestsFromMe" && <RequestsFromMe />}
      {activeComponent === "RequestsToMe" && <RequestsToMe />}

      {/* Recommendations Section */}
      <div className="w-full lg:w-4/12 flex flex-col">
        <div className="flex flex-wrap justify-between mb-4">
          <h2 className="text-xl font-bold">Recommendations</h2>
          <input
            type="text"
            placeholder="#_ Find friends by code"
            className="p-2 text-base border border-black rounded-md text-black placeholder-black bg-transparent focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          {somepeople.map((rec, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white shadow rounded-lg p-3"
              style={{ flex: "1 1 calc(33.333% - 1rem)" }}
            >
              <img
                src={rec.img}
                alt={`${rec.name}'s profile`}
                className="w-16 h-16 rounded-full mb-2"
              />
              <h3 className="text-sm font-medium">{rec.name}</h3>
              <p className="text-xs text-gray-600 text-center">{rec.info}</p>
            </div>
          ))}
        </div>
        {/* Requests Section with Dropdown */}
        <div className="mt-6">
          <button
            onClick={toggleDropdown}
            className="text-left bg-[#C2DAE1] py-3 px-4 shadow-sm rounded-lg text-lg font-medium"
          >
            Requests {isDropdownOpen ? "▲" : "▼"}
          </button>
          {isDropdownOpen && (
            <div className="bg-white w-[110px] shadow-lg rounded-lg mt-2 absolute">
              <button
                onClick={() => handleComponentChange("RequestsFromMe")}
                className="block text-left px-4 py-2 w-full hover:bg-gray-100"
              >
                From me
              </button>
              <button
                onClick={() => handleComponentChange("RequestsToMe")}
                className="block text-left px-4 py-2 w-full hover:bg-gray-100"
              >
                To me
              </button>
            </div>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-[#C3DAE2] p-4 rounded-lg shadow-lg flex items-center justify-center"
            style={{
              border: "none", // Ensure no border for the button
              cursor: "pointer", // Make it clear that the button is interactive
            }}
            onClick={() => console.log("Message button clicked!")} // Example click handler
          >
            <div
              className="w-8 h-8 rounded-md text-center text-lg font-bold text-[#526F8A] flex items-center justify-center"
              style={{
                backgroundImage: `url(${chatSVG})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              3
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuddiesTab;
