import React from 'react';
import MainBoardSVG from '../assets/svg/MainBoardSVG';
import svgsvg from '../assets/svg/svgsvg.svg';

const MainBanner = () => {
  return (
    <div
      className="w-11/12 sm:w-10/12 md:w-8/12 h-60 sm:h-80 md:h-96 lg:h-[30rem] flex justify-center items-center mt-8 sm:mt-12 md:mt-14 mx-auto relative"
      style={{
        backgroundImage: `url(${svgsvg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex flex-col items-center relative">
        <div className="absolute -top-4 sm:-top-6 left-0 text-[#162751] text-xs sm:text-sm md:text-base lg:text-lg font-medium font-joan">
          Empowering learning through connection
        </div>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#162751] font-instrumentSans"
          style={{ textShadow: 'black 1px 1px 3px' }}
        >
          STUDY BUDDY
        </h1>
        <div className="absolute -bottom-4 sm:-bottom-6 right-0 text-[#162751] text-xs sm:text-sm md:text-base lg:text-lg font-medium font-joan">
          Study together, grow together
        </div>
      </div>
    </div>
  );
};

export default MainBanner;

