import React from "react";
import womanImage from "../../assets/images/woman.png";
import blackLogo from "../../assets/images/black_logo.png";

const LeftColumnContent: React.FC = () => {
  return (
    <div className="flex items-center justify-end mr-auto p-8">
      <div className="relative w-full min-h-[400px] h-96 max-w-sm">
        {/* Violet colored rectangle background with increased visibility */}
        <div className="absolute inset-0 bg-violet-600 rounded-lg shadow-lg z-0"></div>

        {/* Stars scattered with increased visibility */}
        <div className="absolute top-10 left-10 w-4 h-4 bg-white opacity-80 rotate-45 z-10"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-white opacity-80 rotate-45 z-10"></div>
        <div className="absolute bottom-20 left-20 w-5 h-5 bg-white opacity-80 rotate-45 z-10"></div>
        <div className="absolute bottom-40 right-40 w-3 h-3 bg-white opacity-80 rotate-45 z-10"></div>

        {/* Woman image positioned at the bottom of the rectangle */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-center z-20">
          <div className="text-center w-4/5">
            <img src={womanImage} alt="" />
          </div>
        </div>

        {/* Transparent blurred rectangle with logo and text - widened for tagline */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-30 backdrop-blur-md px-8 py-4 rounded-xl z-30 w-5/6">
          <div className="flex justify-center mb-2">
            <img src={blackLogo} alt="Orbit ERP Logo" className="w-12 h-10" />
          </div>
          <h2 className="text-black text-lg font-semibold text-center">
            Orbit ERP
          </h2>
          <p className="text-black text-sm text-center mt-1">
            Your fundraising command center
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeftColumnContent;
