import React, { useState } from "react";
import chatSVG from "../assets/svg/chatSVG.svg";
import MyFriends from "../components/simples/MyFriends";
import RequestsFromMe from "../components/simples/RequestsFromMe";
import RequestsToMe from "../components/simples/RequestsToMe";
import Recommendations from "./Recommendations"; // Updated Recommendations component
import { useNavigate } from "react-router-dom";

const BuddiesTab = () => {
  const [activeComponent, setActiveComponent] = useState("MyFriends");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

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
        <Recommendations />
        {/* Requests Section with Dropdown */}
        <div className="mt-6 flex flex-wrap gap-3 relative">
          <button
            onClick={toggleDropdown}
            className="bg-[#C2DAE1] py-3 px-4 shadow-sm rounded-lg text-lg font-medium flex items-center justify-between w-40"
          >
            Requests
            <span className="ml-2">{isDropdownOpen ? "▲" : "▼"}</span>
          </button>
          {isDropdownOpen && (
            <div
              className="bg-white w-40 shadow-lg rounded-lg mt-2 absolute z-10"
              style={{ top: "100%", left: 0 }}
            >
              <button
                onClick={() => handleComponentChange("RequestsFromMe")}
                className="block text-left px-4 py-2 w-full hover:bg-gray-100 border-b border-gray-200"
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
          <button
            onClick={() => handleComponentChange("MyFriends")}
            className="bg-[#C2DAE1] py-3 px-4 shadow-sm rounded-lg text-lg font-medium w-40"
          >
            My Friends
          </button>
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
