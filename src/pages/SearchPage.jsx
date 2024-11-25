import React from "react";
import { useState } from "react";
import HeaderWithDropdown from "../components/HeaderWithDropdown";

const SearchPage = () => {
  const subjects = ["Discrete Math", "ICT", "UX/UI design"];
  const languages = ["Russian C1", "English B1", "Nigerian B2"];

  const recommendations = [
    {
      name: "Айторе",
      description: "A bold and creative individual.",
      image: "path_to_image1.jpg",
    },
    {
      name: "Омар",
      description: "Excels in Philosophy with deep insights.",
      image: "path_to_image2.jpg",
    },
    {
      name: "Нурмухамед",
      description: "Outstanding skills in Programming.",
      image: "path_to_image3.jpg",
    },
  ];

  const renderOptions = (items) =>
    items.map((item, index) => (
      <span key={index} className="text-sm">
        • {item}
      </span>
    ));

  const [isToggled, setIsToggled] = useState(false);

  const toggleSwitch = () => setIsToggled(!isToggled);

  return (
    <div className="bg-[#f6f7ff] min-h-screen flex flex-col">
      {/* Header */}
      <HeaderWithDropdown {...{ search: true }} />

      {/* Main Content */}
      <div className="flex flex-col items-center gap-12 mt-10">
        {/* Search Box */}
        <div className="bg-[#274B6D] text-white w-11/12 max-w-4xl px-12 py-12 rounded-lg shadow-md">
          <h2 className="text-center text-3xl font-semibold mb-4">
            Find your study buddy
          </h2>
          <p className="text-center text-base mb-6">
            Search for a study partner based on subjects, language and location
          </p>
          <div className="flex flex-col gap-6">
            {/* Subjects */}
            <div className="flex items-center gap-4">
              <label className="font-semibold">Subjects:</label>
              {renderOptions(subjects)}
              <select className="bg-transparent border-2 text-white rounded-md px-1 py-0.5 text-sm ml-4 mr-auto">
                <option className="bg-[#274B6D]" value="">
                  Choose
                </option>
                <option className="bg-[#274B6D]" value="other">
                  Other
                </option>
              </select>
            </div>
            {/* Language */}
            <div className="flex items-center gap-4">
              <label className="font-semibold">Language:</label>
              {renderOptions(languages)}
              <select className="bg-transparent border-2 text-white rounded-md px-1 py-0.5 text-sm ml-4 mr-auto">
                <option className="bg-[#274B6D]" value="">
                  Choose
                </option>
                <option className="bg-[#274B6D]" value="other">
                  Other
                </option>
              </select>
            </div>
            {/* Gender */}
            <div className="flex items-center gap-4">
              <label className="font-semibold">Gender:</label>
              <div className="flex items-center gap-4">
                {/* Male Radio */}
                <label className="flex items-center gap-1">
                  Male
                  <input
                    type="radio"
                    name="gender" // Group by name to make it mutually exclusive
                    className="appearance-none w-4 h-4 border-2 border-white bg-transparent rounded-sm checked:bg-white checked:border-white checked:accent-secondary focus:ring-4 focus:ring-offset-1 focus:ring-secondary"
                  />
                </label>

                {/* Female Radio */}
                <label className="flex items-center gap-1">
                  Female
                  <input
                    type="radio"
                    name="gender" // Same group name
                    className="appearance-none w-4 h-4 border-2 border-white bg-transparent rounded-sm checked:bg-white checked:border-white checked:accent-secondary focus:ring-4 focus:ring-offset-1 focus:ring-secondary"
                  />
                </label>
              </div>
            </div>

            {/* Search by country */}
            <div className="flex items-center gap-4">
              <label className="font-semibold">Search by my country</label>
              <div className="relative flex items-center w-10 h-6">
                <input type="checkbox" className="peer hidden" />
                <div
                  onClick={toggleSwitch}
                  className={`flex items-center w-10 h-4 rounded-full cursor-pointer ${
                    isToggled ? "bg-[#526F8A]" : "bg-white"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full bg-[#D9D9D9] shadow-md transform transition-transform duration-150 ${
                      isToggled ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></div>
                </div>
              </div>
              {/* Search Button */}
              <button className="bg-white text-[#526F8A] text-lg px-10 py-1 rounded-xl font-normal ml-auto">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="bg-[#f6f7ff] py-10 px-6">
          <h2 className="text-2xl font-semibold text-[#1b0d13] text-center mb-8">
            Recommendations
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {recommendations.map((item, index) => (
              <div key={index} className=" rounded-lg p-4 w-60 text-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[240px] h-[200px] object-cover rounded-t-lg"
                />
                <h3 className="text-lg font-medium text-main mt-4">
                  {item.name}
                </h3>
                <p className="text-sm text-main mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
