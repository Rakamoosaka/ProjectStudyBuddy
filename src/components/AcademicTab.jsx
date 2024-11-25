import React from "react";

const AcademicTab = ({ edit }) => {
  const strengths = [
    { subject: "Discrete math", status: "can mentor" },
    { subject: "Calculus", status: "can mentor" },
    { subject: "Programming", status: "can help" },
  ];

  const weaknesses = [
    { subject: "Turkish", status: "needs mentor" },
    { subject: "UI/UX design", status: "needs mentor" },
    { subject: "Social law", status: "need help" },
  ];

  return (
    <div className="p-6 w-full flex flex-col items-center">
      {/* Strengths and Weaknesses Section */}
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

        {/* Vertical Divider */}
        <div className="hidden md:block w-[1px] bg-gray-300 absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2"></div>

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

      {/* Add Subjects Button */}
      {edit && (
        <div className="w-8/12 flex justify-end mt-12">
          <button
            className="px-6 py-2 bg-[#CDF5FD] text-[#162850] rounded-lg hover:bg-[#89CFF3] focus:outline-none"
            onClick={() => console.log("Edit button clicked!")}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default AcademicTab;
