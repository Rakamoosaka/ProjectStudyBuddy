import React from "react";
import { Link } from "react-router-dom";

const AfterBanner = () => {
  return (
    <div className="w-full flex justify-center items-center mt-32 mb-10 mx-auto">
      <div className="bg-[#162850] text-[#B3D1FF] rounded-lg shadow-lg p-10 md:p-16 lg:p-20 max-w-4xl text-center">
        <h2 className="text- md:text-3xl lg:text-4xl mb-4 font-joan">
          Find your perfect study partner and collaborate on research projects
        </h2>
        <p className="text-sm md:text-base mb-8 font-joan">
          Join a platform that connects learners with peers, educators, and
          industry experts.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/signup">
            <button className="bg-[#274B6D] hover:bg-[#305b84] text-[#C3DAE2] font-normal py-2 px-6 rounded-full shadow-md transition-all font-josefinSans">
              Get started
            </button>
          </Link>
          <Link to="/aboutus">
            <button className="bg-[#526F8A] hover:bg-[#5e7f9e] text-[#C3DAE2] font-normal py-2 px-6 rounded-full shadow-md transition-all font-josefinSans">
              Learn more
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AfterBanner;
