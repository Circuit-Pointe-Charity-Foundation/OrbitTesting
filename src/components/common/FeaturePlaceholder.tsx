
import React from "react";

interface FeaturePlaceholderProps {
  moduleName: string;
  featureName: string;
}

const FeaturePlaceholder: React.FC<FeaturePlaceholderProps> = ({ 
  moduleName, 
  featureName 
}) => {
  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-3xl text-center">
        <h1 className="text-2xl font-bold text-violet-800 mb-4">{featureName}</h1>
        <div className="bg-violet-100 p-8 rounded-lg mb-4">
          <p className="text-violet-900 mb-2">
            This feature is currently under development for the <strong>{moduleName}</strong> module.
          </p>
          <p className="text-gray-600">
            Check back later for updates on this feature.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturePlaceholder;
