import React from "react";

const ProjectsTab = () => {
  const projects = [
    {
      title: "Biology abstract",
      image: "https://via.placeholder.com/200x150", // Replace with actual project image URL
    },
    {
      title: "History summary",
      image: "https://via.placeholder.com/200x150", // Replace with actual project image URL
    },
    {
      title: "CSS105",
      image: "https://via.placeholder.com/200x150", // Replace with actual project image URL
    },
    {
      title: "Mathematics",
      image: "https://via.placeholder.com/200x150", // Replace with actual project image URL
    },
  ];

  const handleNewProject = () => {
    console.log("New project clicked!");
    // Add logic for creating a new project
  };

  return (
    <div className="p-6 w-full flex flex-col items-center">
      {/* Projects Section */}
      <div className="w-6/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* New Project Button */}
        <div
          className="flex flex-col items-center justify-center "
          onClick={handleNewProject}
        >
          <div className="flex items-center justify-center bg-[#274B6D] text-white rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition-shadow h-[120px] w-full">
            <span className="text-7xl mb-2 text-[#C2DAE1] font-medium">+</span>
          </div>
          <p className="mt-2 font-josefinSans text-[#071D2D] mr-auto text-base text-center">
            New project
          </p>
        </div>

        {/* Project Cards */}
        {projects.map((project, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <img
              src={project.image}
              alt={project.title}
              className="flex items-center justify-center bg-[#274B6D] text-white rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition-shadow h-[120px] w-full"
            />
            <p className="mt-2  font-josefinSans text-[#071D2D] mr-auto text-base text-center">
              {project.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsTab;
