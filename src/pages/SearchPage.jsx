import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DropdownWithBlob from "../components/simples/DropdownWithBlob";
import LogoImage from "../assets/Logo.png";
import tabsSVG from "../assets/svg/tabsSVG.svg"; // Import the SVG
import axios from "../axios";

const SearchPage = () => {
  const [filters, setFilters] = useState({
    gender: "",
    language: [],
    subjects: [],
    country: false,
  });
  const [results, setResults] = useState([]);
  const [languages, setLanguages] = useState([]); // To store dynamic languages
  const [disciplines, setDisciplines] = useState([]); // To store dynamic disciplines
  const [isToggled, setIsToggled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // For error handling

  // Set up axios headers with the token
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token from localStorage
    },
  });

  // Fetch languages from the backend
  useEffect(() => {
    axiosInstance
      .get("/user/profile/details") // Backend endpoint for languages
      .then((response) => {
        setLanguages(response.data.languages || []); // Assuming backend returns languages in "languages" key
      })
      .catch((error) => {
        console.error("Error fetching languages:", error);
        setErrorMessage("Failed to load languages. Try refreshing the page.");
      });
  }, []);

  // Fetch disciplines from the backend
  useEffect(() => {
    axiosInstance
      .get("/user/profile/discipline") // Backend endpoint for disciplines
      .then((response) => {
        // Filter disciplines where skillLevel <= 5
        const filteredDisciplines = response.data.filter(
          (discipline) => discipline.skillLevel <= 5
        );
        setDisciplines(filteredDisciplines);
      })
      .catch((error) => {
        console.error("Error fetching disciplines:", error);
        setErrorMessage("Failed to load disciplines. Try refreshing the page.");
      });
  }, []);

  // Fetch search results based on filters
  const handleSearch = async () => {
    setIsLoading(true);
    setErrorMessage(""); // Reset any previous errors
    setResults([]); // Clear previous results

    try {
      const searchRequest = {
        weakSubjects: filters.subjects,
        genderFilter: filters.gender,
        locationFilter: filters.country,
      };
      console.log("Search request:", searchRequest);
      const response = await axiosInstance.post(
        "/user/matching/search",
        searchRequest
      );
      console.log("Search results:", response.data);
      const searchResults = response.data.map((user) => {
        // Separate disciplines into well-known and needs help with
        const wellKnownDisciplines = user.disciplines
          .filter((discipline) => discipline.skillLevel >= 7)
          .map((discipline) => discipline.name);
        const needsHelpWithDisciplines = user.disciplines
          .filter((discipline) => discipline.skillLevel <= 4)
          .map((discipline) => discipline.name);

        return {
          id: user.id,
          name: user.username,
          country: user.country,
          image: user.avatar,
          wellKnownDisciplines: wellKnownDisciplines.join(", "),
          needsHelpWithDisciplines: needsHelpWithDisciplines.join(", "),
        };
      });

      if (searchResults.length === 0) {
        setErrorMessage("No results found. Try adjusting your filters.");
      } else {
        setResults(searchResults);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setErrorMessage("An error occurred during the search. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (filterType, value) => {
    setFilters((prev) => {
      const updatedValues = prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value];
      return { ...prev, [filterType]: updatedValues };
    });
  };

  const toggleSwitch = () => {
    setFilters((prev) => ({
      ...prev,
      country: !prev.country,
    }));
    setIsToggled(!isToggled);
  };

  return (
    <div className="relative flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-[#274B6D] text-white p-6 shadow-strong-right z-10 rounded-xl mx-auto md:mx-4 my-4 flex flex-col justify-start overflow-y-auto scrollbar">
        <h1 className="text-2xl md:text-3xl text-center font-bold mb-4">
          Find your study buddy
        </h1>
        <p className="mb-6 text-center text-sm md:text-base">
          Search for a study partner based on subjects, language, and location.
        </p>

        {/* Gender Filter */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Gender:</label>
          <label className="block">
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={() => setFilters({ ...filters, gender: "male" })}
            />{" "}
            Male
          </label>
          <label className="block">
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={() => setFilters({ ...filters, gender: "female" })}
            />{" "}
            Female
          </label>
          <label className="block">
            <input
              type="radio"
              name="gender"
              value=""
              onChange={() => setFilters({ ...filters, gender: "" })}
            />{" "}
            Doesn't matter
          </label>
          <hr className="border-t border-white mt-4 mb-4" />
        </div>

        {/* Language Filter */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Language:</label>
          {languages.map((language, index) => (
            <label key={language.id} className="block">
              <input
                type="checkbox"
                onChange={() =>
                  handleCheckboxChange("language", language.languageName)
                }
              />{" "}
              {language.languageName}
            </label>
          ))}
          <hr className="border-t border-white mt-4 mb-4" />
        </div>

        {/* Discipline Filter */}
        <div className="mb-8">
          <label className="block mb-1 font-semibold">Disciplines:</label>
          {disciplines.map((discipline) => (
            <label key={discipline.subDisciplineId} className="block">
              <input
                type="checkbox"
                onChange={() =>
                  handleCheckboxChange("subjects", discipline.subDisciplineName)
                }
              />{" "}
              {discipline.subDisciplineName} ({discipline.category})
            </label>
          ))}
          <hr className="border-t border-white mt-4 mb-4" />
        </div>

        {/* Country Filter */}
        <div className="flex gap-3 items-center mb-6">
          <label className="font-semibold text-sm md:text-base">
            Search by my country
          </label>
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
        </div>

        <button
          onClick={handleSearch}
          className="bg-white text-[#526F8A] text-base md:text-lg px-8 py-2 rounded-xl font-normal mx-auto mb-auto hover:bg-[#D9D9D9] transition-all"
        >
          Search
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="relative flex w-full md:w-11/12 mx-auto items-center justify-between py-4 bg-[#f6f7ff] font-josefinSans h-20 md:h-24">
          <Link to="/home">
            <div className="flex items-center space-x-2">
              <img
                src={LogoImage}
                alt="Study Buddy Logo"
                className="h-8 md:h-12"
              />
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <DropdownWithBlob />
          </div>
        </header>

        {/* Results Section */}
        <main className="flex-1 bg-[#f6f7ff] p-4 md:p-6 overflow-y-auto">
          <div className="relative flex items-center justify-center mb-8">
            <img
              src={tabsSVG}
              alt="Background Shape"
              className="absolute w-40 md:w-64 z-1"
            />
            <h2 className="relative text-xl md:text-2xl font-bold text-[#274B6D]">
              Results
            </h2>
          </div>

          {/* Responsive Results */}
          <div className="space-y-4 md:space-y-6">
            {isLoading ? (
              <p className="text-center text-lg text-[#274B6D]">
                Loading results...
              </p>
            ) : errorMessage ? (
              <p className="text-center text-lg text-red-500">{errorMessage}</p>
            ) : results.length === 0 ? (
              <p className="text-center text-lg text-[#274B6D]">
                Click "Search" to view results!
              </p>
            ) : (
              results.map((result, index) => (
                <Link
                  key={index}
                  to={`/profilepage/${result.id}`}
                  className={`flex flex-col md:flex-row items-center rounded-lg shadow-lg p-4 ${
                    index % 2 === 0 ? "bg-[#526F8A]" : "bg-[#274B6D]"
                  } hover:bg-opacity-90`}
                >
                  <img
                    src={result.image}
                    alt={result.name}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover shadow-lg mb-4 md:mb-0"
                  />
                  <div className="ml-0 md:ml-4 flex-1 text-center md:text-left">
                    <h3 className="text-base md:text-lg font-semibold text-white">
                      {result.name} / from {result.country}
                    </h3>
                    <p className="text-sm text-white mt-1">
                      Well-known subjects: {result.wellKnownDisciplines}
                    </p>
                    <p className="text-sm text-white mt-1">
                      Needs help with: {result.needsHelpWithDisciplines}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SearchPage;
