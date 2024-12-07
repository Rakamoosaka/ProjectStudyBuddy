import { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import rightArrowPNG from "../../assets/svg/right-arrow.png";
import down from "../../assets/svg/down.svg";
import up from "../../assets/svg/up.svg";
import { useLogout } from "../../hooks/logout";

const DropdownWithBlob = () => {
  const [isOpen, setIsOpen] = useState(false); // Dropdown open/close state
  const navigate = useNavigate(); // React Router hook for navigation

  const handleLogout = useLogout();

  const username = localStorage.getItem("username");
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const dropdownButtons = [
    { label: "Profile", path: `/profile/${username}` },
    { label: "Messages", path: "/chatpage" },
    { label: "About Us", path: "/about-us" },
  ];

  return (
    <div className="relative flex justify-center items-center">
      {/* Dropdown button */}
      <div
        onClick={toggleDropdown}
        className="flex justify-center items-center py-2 px-6 font-medium text-lg shadow-sm hover:shadow-md transition-shadow rounded-lg cursor-pointer"
      >
        <p className="text-[#162850] focus:outline-none">
          {username || "Loading..."}
        </p>
        {isOpen ? (
          <img src={up} alt="Up Arrow" className="ml-2" />
        ) : (
          <img src={down} alt="Down Arrow" className="ml-2" />
        )}
      </div>

      {/* Dropdown items */}
      {isOpen && (
        <ul className="absolute top-full mt-2 bg-[#f6f7ff] rounded-lg shadow-lg z-10">
          <li className="px-4 text-[#162850] mt-0.5 py-1 hover:bg-[#e7e8ef] cursor-pointer rounded-lg">
            <button
              className="flex items-center justify-center w-full"
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
              className="px-4 text-[#162850] mt-0.5 py-1 hover:bg-[#e7e8ef] cursor-pointer rounded-lg"
            >
              <button
                className="w-full text-left"
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </button>
            </li>
          ))}
          <li className="px-4 text-[#162850] mt-0.5 py-1 hover:bg-[#e7e8ef] cursor-pointer rounded-lg">
            <button
              className="w-full text-left text-[#ae2b2b]"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropdownWithBlob;
