import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProfilePopup = ({ isOpen, onClose, userDetails, onUpdate }) => {
  const [about, setAbout] = useState(userDetails?.about || "");
  const [languages, setLanguages] = useState([]);
  const [newLanguage, setNewLanguage] = useState("");

  const token = localStorage.getItem("token");

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

  const handleSaveChanges = async () => {
    try {
      // Update About Me
      if (about !== userDetails?.about) {
        await axios.put(
          "http://localhost:8080/user/profile/about/edit",
          { about },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // Add New Language
      if (newLanguage) {
        await axios.post(
          "http://localhost:8080/user/profile/language/add",
          { languageName: newLanguage },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLanguages([
          ...languages,
          { id: Date.now(), languageName: newLanguage },
        ]);
        setNewLanguage(""); // Clear input
      }

      // Refresh profile data from parent
      await onUpdate();

      // Notify success and close the popup
      alert("Profile updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleRemoveLanguage = async (languageName) => {
    try {
      await axios.delete("http://localhost:8080/user/profile/language/delete", {
        data: { languageName },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the language from the state
      setLanguages((prevLanguages) =>
        prevLanguages.filter((lang) => lang.languageName !== languageName)
      );

      // Refresh profile data from parent
      await onUpdate();

      alert(`Language "${languageName}" removed successfully.`);
    } catch (error) {
      console.error("Error removing language:", error);
      alert("Failed to remove language. Please try again.");
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
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="border rounded-lg p-2 flex-1"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              placeholder="Add new language"
            />
            <button
              onClick={() => {
                if (
                  newLanguage &&
                  !languages.some((lang) => lang.languageName === newLanguage)
                ) {
                  setLanguages([
                    ...languages,
                    { id: Date.now(), languageName: newLanguage },
                  ]);
                  setNewLanguage(""); // Clear input field
                }
              }}
              className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveChanges}
            className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePopup;
