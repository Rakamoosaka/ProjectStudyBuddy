import React, { useState, useEffect } from "react";
import axios from "axios";

const AcademicTab = ({ edit }) => {
  const [strengths, setStrengths] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  const [newDiscipline, setNewDiscipline] = useState({
    id: "",
    skillLevel: "",
  });
  const [isAddDisciplineOpen, setIsAddDisciplineOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const fetchDisciplines = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/user/profile/discipline",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const disciplines = response.data;
      setStrengths(disciplines.filter((item) => item.skillLevel > 5));
      setWeaknesses(disciplines.filter((item) => item.skillLevel <= 5));
      setLoading(false);
    } catch (err) {
      console.error("Error fetching disciplines:", err);
      setError("Failed to load disciplines.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisciplines();
  }, []);

  const handleAddDiscipline = async () => {
    const { id, skillLevel } = newDiscipline;
    if (!id || !skillLevel || skillLevel < 1 || skillLevel > 10) {
      alert("Please provide a valid Discipline ID and Skill Level (1-10).");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/user/profile/discipline/add",
        { subDisciplineId: id, skillLevel },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Discipline added successfully!");
      setNewDiscipline({ id: "", skillLevel: "" });
      fetchDisciplines();
    } catch (err) {
      console.error("Error adding discipline:", err);
      alert("Failed to add discipline. Please try again.");
    }
  };

  const handleEditDiscipline = async (id) => {
    const skillLevel = prompt("Enter new skill level (1-10):");
    if (!skillLevel || skillLevel < 1 || skillLevel > 10) {
      alert("Invalid skill level. Please enter a value between 1 and 10.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/user/profile/discipline/edit?subDisciplineId=${id}`,
        { skillLevel },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Discipline updated successfully!");
      fetchDisciplines();
    } catch (err) {
      console.error("Error editing discipline:", err);
      alert("Failed to update discipline. Please try again.");
    }
  };

  const handleDeleteDiscipline = async (id) => {
    if (!window.confirm("Are you sure you want to delete this discipline?")) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:8080/user/profile/discipline/delete?subDisciplineId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Discipline deleted successfully!");
      fetchDisciplines();
    } catch (err) {
      console.error("Error deleting discipline:", err);
      alert("Failed to delete discipline. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6 w-full flex flex-col items-center">
      <div className="w-10/12 flex flex-col md:flex-row justify-between relative">
        {/* Strengths */}
        <div className="flex flex-col items-center w-full md:w-[45%] pr-2">
          <h2 className="text-xl font-bold text-[#162850] mb-4">Strengths</h2>
          <ul className="space-y-2 text-[#162850]">
            {strengths.map((item) => (
              <li key={item.subDisciplineId} className="text-base text-center">
                {item.subDisciplineName} (Skill: {item.skillLevel})
                {edit && (
                  <div className="flex justify-center gap-2 mt-1">
                    <button
                      onClick={() => handleEditDiscipline(item.subDisciplineId)}
                      className="text-sm text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteDiscipline(item.subDisciplineId)
                      }
                      className="text-sm text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="flex flex-col items-center w-full md:w-[45%] pl-2">
          <h2 className="text-xl font-bold text-[#162850] mb-4">Weaknesses</h2>
          <ul className="space-y-2 text-[#162850]">
            {weaknesses.map((item) => (
              <li key={item.subDisciplineId} className="text-base text-center">
                {item.subDisciplineName} (Skill: {item.skillLevel})
                {edit && (
                  <div className="flex justify-center gap-2 mt-1">
                    <button
                      onClick={() => handleEditDiscipline(item.subDisciplineId)}
                      className="text-sm text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteDiscipline(item.subDisciplineId)
                      }
                      className="text-sm text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Add Discipline Modal */}
      {edit && (
        <div className="w-8/12 flex flex-col items-center mt-12">
          <button
            className="px-6 py-2 bg-[#CDF5FD] text-[#162850] rounded-lg hover:bg-[#89CFF3] focus:outline-none"
            onClick={() => setIsAddDisciplineOpen(!isAddDisciplineOpen)}
          >
            {isAddDisciplineOpen ? "Close" : "Add Discipline"}
          </button>
          {isAddDisciplineOpen && (
            <div className="mt-4">
              <input
                type="text"
                className="border rounded-lg p-2 mr-2"
                placeholder="Discipline ID"
                value={newDiscipline.id}
                onChange={(e) =>
                  setNewDiscipline({ ...newDiscipline, id: e.target.value })
                }
              />
              <input
                type="number"
                className="border rounded-lg p-2 mr-2"
                placeholder="Skill Level (1-10)"
                value={newDiscipline.skillLevel}
                onChange={(e) =>
                  setNewDiscipline({
                    ...newDiscipline,
                    skillLevel: e.target.value,
                  })
                }
              />
              <button
                onClick={handleAddDiscipline}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Add
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AcademicTab;
