import React, { useState, useEffect } from "react";
import axios from "axios";
import EditDisciplinesModal from "./EditDisciplinesModal";

const AcademicTab = ({ edit }) => {
  const [strengths, setStrengths] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  const [allDisciplines, setAllDisciplines] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/profile/discipline", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const disciplines = response.data;
        setAllDisciplines(disciplines);

        const strengthsData = disciplines.filter(
          (item) => item.skillLevel >= 7 // Strengths threshold
        );
        const weaknessesData = disciplines.filter(
          (item) => item.skillLevel <= 3 // Weaknesses threshold
        );

        setStrengths(
          strengthsData.map((item) => ({
            subject: item.subDisciplineName,
            status: "can mentor",
          }))
        );
        setWeaknesses(
          weaknessesData.map((item) => ({
            subject: item.subDisciplineName,
            status: "needs mentor",
          }))
        );
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load disciplines.");
        console.error(error);
        setLoading(false);
      });
  }, [token]);

  const handleSave = () => {
    // Refresh disciplines after save
    axios
      .get("http://localhost:8080/user/profile/discipline", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAllDisciplines(response.data);
      })
      .catch((error) => {
        console.error("Error refreshing disciplines:", error);
      });
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
            {strengths.map((item, index) => (
              <li key={index} className="text-base text-center">
                {item.subject}{" "}
                <span className="text-sm text-gray-500">[{item.status}]</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="flex flex-col items-center w-full md:w-[45%] pl-2">
          <h2 className="text-xl font-bold text-[#162850] mb-4">Weaknesses</h2>
          <ul className="space-y-2 text-[#162850]">
            {weaknesses.map((item, index) => (
              <li key={index} className="text-base text-center">
                {item.subject}{" "}
                <span className="text-sm text-gray-500">[{item.status}]</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {edit && (
        <div className="w-8/12 flex justify-end mt-12">
          <button
            className="px-6 py-2 bg-[#CDF5FD] text-[#162850] rounded-lg hover:bg-[#89CFF3] focus:outline-none"
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit
          </button>
        </div>
      )}

      {/* Edit Disciplines Modal */}
      <EditDisciplinesModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        disciplines={allDisciplines}
        onSave={handleSave}
      />
    </div>
  );
};

export default AcademicTab;
