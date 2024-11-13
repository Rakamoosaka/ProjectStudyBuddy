import React from 'react'

const AfterAboutSection = () => {
  return (
    <div className="w-full md:w-10/12 lg:w-9/12 flex justify-center items-center mt-32 mb-10 mx-auto">
      <div className="bg-[#162850] text-[#B3D1FF] rounded-lg shadow-lg p-10 md:p-16 lg:p-20 max-w-4xl w-full text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl mb-4 font-joan">
          Finally ready to start?
        </h2>
        <div className="flex justify-center space-x-4">
          <button className="bg-[#274B6D] hover:bg-[#305b84] text-[#C3DAE2] font-normal py-2 px-6 rounded-full shadow-md transition-all font-josefinSans">
            Find a study partner
          </button>
          <button className="bg-[#526F8A] hover:bg-[#5e7f9e] text-[#C3DAE2] font-normal py-2 px-6 rounded-full shadow-md transition-all font-josefinSans">
            Make a profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default AfterAboutSection;
