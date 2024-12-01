import React, { useState } from "react";
import axios from "axios";

const EditDisciplinesModal = ({ isOpen, onClose, disciplines, onSave }) => {
  const [localDisciplines, setLocalDisciplines] = useState(disciplines);
  const [newDiscipline, setNewDiscipline] = useState({
    name: "",
    skillLevel: 1,
  });
  const token = localStorage.getItem("token");

  const handleSkillLevelChange = (id, skillLevel) => {
    setLocalDisciplines((prev) =>
      prev.map((discipline) =>
        discipline.id === id ? { ...discipline, skillLevel } : discipline
      )
    );
  };

  const handleAddNewDiscipline = () => {
    if (newDiscipline.name) {
      setLocalDisciplines((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: newDiscipline.name,
          skillLevel: newDiscipline.skillLevel,
        },
      ]);
      setNewDiscipline({ name: "", skillLevel: 1 });
    }
  };

  const handleSave = async () => {
    try {
      // Update existing disciplines
      await Promise.all(
        localDisciplines.map((discipline) =>
          axios.put(
            `http://localhost:8080/user/profile/discipline/edit?subDisciplineId=${discipline.id}`,
            discipline.skillLevel,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        )
      );

      // Add new discipline if applicable
      if (newDiscipline.name) {
        await axios.post(
          "http://localhost:8080/user/profile/discipline/add",
          {
            subDisciplineId: newDiscipline.id,
            skillLevel: newDiscipline.skillLevel,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      alert("Disciplines updated successfully!");
      onSave(); // Trigger parent update
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error saving disciplines:", error);
      alert("Failed to update disciplines. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Edit Disciplines</h2>
        <div className="flex flex-col gap-4">
          {localDisciplines.map((discipline) => (
            <div
              key={discipline.id}
              className="flex justify-between items-center"
            >
              <span>{discipline.name}</span>
              <input
                type="number"
                value={discipline.skillLevel}
                onChange={(e) =>
                  handleSkillLevelChange(
                    discipline.id,
                    parseInt(e.target.value, 10)
                  )
                }
                min={1}
                max={10}
                className="w-16 border rounded-lg text-center"
              />
            </div>
          ))}
          {/* Add New Discipline */}
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="New Discipline Name"
              value={newDiscipline.name}
              onChange={(e) =>
                setNewDiscipline((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full border rounded-lg p-2"
            />
            <input
              type="number"
              value={newDiscipline.skillLevel}
              onChange={(e) =>
                setNewDiscipline((prev) => ({
                  ...prev,
                  skillLevel: parseInt(e.target.value, 10),
                }))
              }
              min={1}
              max={10}
              className="w-16 border rounded-lg text-center"
            />
            <button
              onClick={handleAddNewDiscipline}
              className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
            >
              Add Discipline
            </button>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDisciplinesModal;
