
import React from "react";

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
        
        {/* Placeholder for African woman with tablet (would be replaced with actual image) */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-white text-center w-4/5">
            {/* This is where the actual image would go */}
            <div className="bg-violet-700 p-6 rounded-lg mb-2 border border-violet-400">
              {/* Placeholder for illustrative purposes */}
              <p className="text-sm text-white font-medium text-center">Image: African woman in smart attire holding a tablet and stylus</p>
            </div>
          </div>
        </div>
        
        {/* Transparent blurred rectangle with logo and text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-30 backdrop-blur-md px-6 py-4 rounded-xl">
          <div className="flex justify-center mb-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/8d57d3330a663501866598decc78666e8126d2f9?placeholderIfAbsent=true"
              alt="Orbit ERP Logo"
              className="w-10 h-10"
            />
          </div>
          <h2 className="text-white text-lg font-semibold text-center">
            Orbit ERP
          </h2>
          <p className="text-white text-sm text-center mt-1">
            Your fundraising command center
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeftColumnContent;
