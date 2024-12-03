import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProfilePopup = ({ isOpen, onClose, userDetails, onUpdate }) => {
  const [about, setAbout] = useState(userDetails?.about || "");
  const [languages, setLanguages] = useState([]);
  const [newLanguage, setNewLanguage] = useState("");
  const [languageSuggestions, setLanguageSuggestions] = useState([]);
  const [removedLanguages, setRemovedLanguages] = useState([]);
  const [addedLanguages, setAddedLanguages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const token = localStorage.getItem("token");

  // Initialize known languages when `userDetails` changes
  useEffect(() => {
    if (userDetails?.languages) {
      setLanguages(
        userDetails.languages.map((lang) => ({
          id: lang.id,
          languageName: lang.languageName,
        }))
      );
    }
  }, [userDetails]);

  const fetchLanguageSuggestions = async (query) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/user/profile/language/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Validate response structure and filter languages
      const filteredLanguages = (response.data || []).filter(
        (language) =>
          language.name &&
          language.name.toLowerCase().startsWith(query.toLowerCase())
      );

      setLanguageSuggestions(filteredLanguages);
    } catch (error) {
      console.error("Error fetching language suggestions:", error);
    }
  };

  const handleAddLanguage = (language) => {
    if (
      language &&
      !languages.some(
        (lang) =>
          lang.languageName.toLowerCase() === language.name.toLowerCase()
      )
    ) {
      const newLang = { id: language.id, languageName: language.name };
      setLanguages([...languages, newLang]);
      setAddedLanguages([...addedLanguages, newLang]);
      setNewLanguage(""); // Clear the input field
      setLanguageSuggestions([]); // Clear suggestions
    } else {
      alert("Language already exists or input is invalid!");
    }
  };

  const handleInputChange = (value) => {
    setNewLanguage(value);
    if (value.length > 0) {
      fetchLanguageSuggestions(value);
    } else {
      setLanguageSuggestions([]);
    }
  };

  const handleRemoveLanguage = (languageName) => {
    const removedLang = languages.find(
      (lang) => lang.languageName === languageName
    );
    if (removedLang) {
      setRemovedLanguages([...removedLanguages, removedLang]);
    }
    setLanguages((prevLanguages) =>
      prevLanguages.filter((lang) => lang.languageName !== languageName)
    );
    setAddedLanguages((prevAdded) =>
      prevAdded.filter((lang) => lang.languageName !== languageName)
    );
  };

  const handleSaveChanges = async () => {
    setIsProcessing(true);
    try {
      // Update "About Me"
      if (about !== userDetails?.about) {
        await axios.put(
          "http://localhost:8080/user/profile/about/edit",
          { about },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      // Add new languages to the backend
      for (const language of addedLanguages) {
        await axios.post(
          "http://localhost:8080/user/profile/language/add",
          { languageName: language.languageName },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      // Remove deleted languages from the backend
      for (const language of removedLanguages) {
        await axios.delete(
          "http://localhost:8080/user/profile/language/delete",
          {
            data: { languageName: language.languageName },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      // Notify parent to refresh profile data
      await onUpdate();

      // Reset state
      setAddedLanguages([]);
      setRemovedLanguages([]);
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

        {/* About Me Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">About Me:</label>
          <textarea
            className="w-full border rounded-lg p-2"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows={3}
          ></textarea>
        </div>

        {/* Known Languages Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Known Languages:
          </label>
          <ul className="list-disc list-inside mb-2">
            {languages.map((language) => (
              <li
                key={language.id}
                className="flex justify-between items-center"
              >
                {language.languageName}
                <button
                  onClick={() => handleRemoveLanguage(language.languageName)}
                  disabled={isProcessing}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="relative">
            <input
              type="text"
              className="border rounded-lg p-2 w-full"
              value={newLanguage}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Type to search and add"
            />
            {languageSuggestions.length > 0 && (
              <ul
                className="absolute bg-white border rounded-lg w-full max-h-60 overflow-y-auto mt-1 z-10 shadow-lg"
                style={{ minWidth: "20rem" }} // Ensures the suggestion box is at least 20rem wide
              >
                {languageSuggestions.map((language) => (
                  <li
                    key={language.id}
                    onClick={() => handleAddLanguage(language)}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {language.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-400"
            disabled={isProcessing}
          >
            Cancel
          </button>
          <button
            onClick={handleSaveChanges}
            className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
            disabled={isProcessing}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePopup;
