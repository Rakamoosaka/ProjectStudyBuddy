import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import axios from "../../axios"; // Import Axios for API calls
import rightArrowPNG from "../../assets/svg/right-arrow.png";
import down from "../../assets/svg/down.svg";
import up from "../../assets/svg/up.svg";
import { useUser } from "../../hooks/UserContext";

const DropdownWithBlob = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("Loading..."); // Default loading text for the button
  const navigate = useNavigate(); // React Router hook for navigation
  const { username, logout } = useUser();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Fetch the name from the backend
  useEffect(() => {
    const fetchName = async () => {
      try {
        setName(username);
      } catch (error) {
        console.error("Error fetching name:", error);
        setName("Error"); // Fallback if the fetch fails
      }
    };

    fetchName();
  }, []); // Empty dependency array ensures this runs only once on component mount

  const dropdownButtons = [
    { label: "profile", path: `/profile/${username}` },
    { label: "messages", path: "/chatpage" },
    { label: "about us", path: "/about-us" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <div
      onClick={toggleDropdown}
      className="relative flex justify-center items-center py-2 px-6 font-medium text-lg shadow-sm hover:shadow-md transition-shadow rounded-lg cursor-pointer"
    >
      {/* Dropdown button */}
      <div className="relative">
        <div className="flex items-center">
          <p className=" text-[#162850] focus:outline-none">{name}</p>
          {isOpen ? (
            <img src={up} alt="Up Arrow" className="ml-2" />
          ) : (
            <img src={down} alt="Down Arrow" className="ml-2" />
          )}
        </div>

        {/* Dropdown items */}
        {isOpen && (
          <div className="absolute top-12 left-1">
            <ul className="flex flex-col">
              <li className="flex items-center px-4 text-[#162850] mt-0.5 py-1 bg-[#C2DAE1] rounded-full">
                <button
                  className="flex items-center w-full"
                  onClick={() => navigate("/settings")}
                >
                  Settings
                  <img
                    src={rightArrowPNG}
                    alt="Right Arrow"
                    className="w-2 h-2 ml-2"
                  />
                </button>
              </li>
              {dropdownButtons.map((item) => (
                <li
                  key={item.label}
                  className="px-4 text-[#162850] mt-0.5 py-1 hover:bg-[#a3c4cf] cursor-pointer bg-[#C2DAE1] rounded-full"
                >
                  <button
                    className="w-full text-left"
                    onClick={() => navigate(item.path)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="px-4 text-[#162850] mt-0.5 py-1 hover:bg-[#a3c4cf] cursor-pointer bg-[#C2DAE1] rounded-full">
                <button
                  className="w-full text-left text-[#ae2b2b]"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownWithBlob;
