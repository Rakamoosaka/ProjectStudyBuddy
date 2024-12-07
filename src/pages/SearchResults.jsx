import React from "react";
import HeaderWithDropdown from "../components/HeaderWithDropdown";

const searchResults = [
  {
    id: 1,
    name: "Omar",
    country: "America",
    subjects: "ICT, General IT systems, Programming",
    image: "path_to_omar_image.jpg",
  },
  {
    id: 2,
    name: "Askhat",
    country: "Australia",
    subjects: "ICT, General IT systems, Programming",
    image: "path_to_askhat_image.jpg",
  },
  {
    id: 3,
    name: "Daniyar",
    country: "Serbia",
    subjects: "ICT, General IT systems, Programming",
    image: "path_to_daniyar_image.jpg",
  },
  {
    id: 4,
    name: "Ayan",
    country: "China",
    subjects: "ICT, General IT systems, Programming",
    image: "path_to_ayan_image.jpg",
  },
];

const SearchResults = () => {
  return (
    <div className="bg-[#f6f7ff] min-h-screen">
      {/* Assuming Header is a separate component */}
      <HeaderWithDropdown />

      <div className="px-6 py-8 w-8/12 mx-auto">
        <h2 className="text-[#1b0d13] text-2xl font-semibold mb-6">Results</h2>
        <div className="space-y-6">
          {searchResults.map((result, index) => (
            <div
              key={index}
              className={`flex items-center rounded-lg shadow-lg p-4 ${
                index % 2 === 0 ? "bg-[#526F8A]" : "bg-[#274B6D]"
              }`}
            >
              <img
                src={result.image}
                alt={result.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-white">
                  {result.name} / from {result.country}
                </h3>
                <p className="text-sm text-white mt-1">
                  Well-known subjects: {result.subjects}
                </p>
                <p className="text-sm text-white mt-1">
                  Needs help with: {result.help}
                </p>
              </div>
              <button className="bg-[#C2DAE1] text-[#274B6D] mt-8 text-sm font-medium px-4 py-2 rounded-md shadow-md hover:bg-[#b9d0d7]">
                Send a request
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
