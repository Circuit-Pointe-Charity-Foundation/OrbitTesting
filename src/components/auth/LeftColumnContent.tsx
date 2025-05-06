
import React from "react";

const LeftColumnContent: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-8 w-full">
      <div className="relative w-full h-[80%] max-w-sm">
        {/* Violet colored rectangle background */}
        <div className="absolute inset-0 bg-violet-600 rounded-lg shadow-lg"></div>
        
        {/* Stars scattered */}
        <div className="absolute top-10 left-10 w-3 h-3 bg-white opacity-70 rotate-45"></div>
        <div className="absolute top-20 right-20 w-2 h-2 bg-white opacity-70 rotate-45"></div>
        <div className="absolute bottom-20 left-20 w-4 h-4 bg-white opacity-70 rotate-45"></div>
        <div className="absolute bottom-40 right-40 w-2 h-2 bg-white opacity-70 rotate-45"></div>
        
        {/* Placeholder for African woman with tablet (would be replaced with actual image) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            {/* This is where the actual image would go */}
            <div className="bg-violet-700 p-4 rounded-lg mb-2">
              {/* Placeholder for illustrative purposes */}
              <p className="text-sm text-center">Image: African woman in smart attire holding a tablet and stylus</p>
            </div>
          </div>
        </div>
        
        {/* Transparent blurred rectangle with logo and text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm p-6 rounded-lg w-4/5">
            <div className="flex justify-center mb-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/8d57d3330a663501866598decc78666e8126d2f9?placeholderIfAbsent=true"
                alt="Orbit ERP Logo"
                className="w-12 h-12"
              />
            </div>
            <h2 className="text-white text-xl font-bold text-center">Orbit ERP</h2>
            <p className="text-white text-sm text-center mt-2">Your fundraising command center</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftColumnContent;
