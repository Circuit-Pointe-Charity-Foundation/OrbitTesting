
import React from "react";

const LeftColumnContent: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-[90%] max-w-md h-[90%] rounded-2xl overflow-hidden shadow-xl bg-violet-600">
        {/* Stars as subtle background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-3 h-3 bg-white opacity-10 rotate-45 rounded-full"></div>
          <div className="absolute top-20 right-20 w-2 h-2 bg-white opacity-10 rotate-45 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-4 h-4 bg-white opacity-10 rotate-45 rounded-full"></div>
          <div className="absolute bottom-40 right-40 w-2 h-2 bg-white opacity-10 rotate-45 rounded-full"></div>
        </div>

        {/* African woman image */}
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F1c76b562a1a146688b16ac6584a89363%2Fbdebb7bd314843c8991c5868f70ac4fd"
          alt="African woman with tablet"
          className="w-full h-full object-cover"
        />

        {/* Frosted glass overlay */}
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
