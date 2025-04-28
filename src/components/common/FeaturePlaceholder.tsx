
import React from "react";

interface FeaturePlaceholderProps {
  moduleName: string;
  featureName: string;
  description?: string;
}

const FeaturePlaceholder: React.FC<FeaturePlaceholderProps> = ({ 
  moduleName, 
  featureName,
  description 
}) => {
  const defaultDescription = `This feature is currently under development for the ${moduleName} module.`;
  
  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-3xl text-center">
        <h1 className="text-2xl font-bold text-violet-800 mb-4">{featureName}</h1>
        <div className="bg-violet-100 p-8 rounded-lg mb-4">
          <p className="text-violet-900 mb-2">
            {description || defaultDescription}
          </p>
          <p className="text-gray-600">
            Check back later for updates on this feature.
          </p>
        </div>
        
        {/* Placeholder illustration */}
        <div className="py-8 flex justify-center">
          <div className="w-32 h-32 rounded-full bg-violet-200 flex items-center justify-center">
            <div className="text-violet-500 font-bold text-xl">
              {moduleName.substring(0, 1).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturePlaceholder;
