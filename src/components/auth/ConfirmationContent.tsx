
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface ConfirmationContentProps {
  formData: {
    orgName: string;
    email: string;
    telephone: string;
    country: string;
    password: string;
    selectedModules: string[];
  };
  modulesList: { id: string; name: string; description: string }[];
  onBack: () => void;
  onConfirm: () => void;
  onLoginClick: () => void;
}

const ConfirmationContent: React.FC<ConfirmationContentProps> = ({
  formData,
  modulesList,
  onBack,
  onConfirm,
  onLoginClick
}) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleConfirm = () => {
    setIsLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      onConfirm();
    }, 1000);
  };
  
  return (
    <div className="max-w-sm w-full">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/8d57d3330a663501866598decc78666e8126d2f9?placeholderIfAbsent=true"
          alt="Orbit ERP Logo"
          className="w-16 h-16"
        />
      </div>
      
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Confirm Registration Details
      </h2>

      <div className="bg-gray-50 p-5 rounded-md border border-gray-200 mb-6">
        <dl className="space-y-4">
          <div>
            <dt className="text-sm text-gray-500">Organization Name</dt>
            <dd className="font-medium text-gray-900">{formData.orgName}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Email</dt>
            <dd className="font-medium text-gray-900">{formData.email}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Telephone</dt>
            <dd className="font-medium text-gray-900">{formData.telephone}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Country</dt>
            <dd className="font-medium text-gray-900">{formData.country}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Selected Modules</dt>
            <dd>
              <ul className="list-disc pl-5 mt-1">
                {modulesList
                  .filter(m => formData.selectedModules.includes(m.id))
                  .map(module => (
                    <li key={module.id} className="font-medium text-gray-900">
                      {module.name}
                    </li>
                  ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>

      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="w-1/2"
          disabled={isLoading}
        >
          Back
        </Button>
        <Button
          onClick={handleConfirm}
          className="w-1/2 bg-violet-600 hover:bg-violet-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Confirm & Register"}
        </Button>
      </div>

      {/* Login Link */}
      <p className="mt-6 text-center text-gray-500">
        Already have an account?{" "}
        <button
          onClick={onLoginClick}
          className="text-violet-600 hover:text-violet-700 font-medium"
        >
          Sign in
        </button>
      </p>

      {/* Footer */}
      <div className="mt-12 text-center text-xs text-gray-400">
        <div className="mb-4">© 2025 Orbit ERP. All rights reserved.</div>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:text-violet-600">Privacy Policy</a>
          <a href="#" className="hover:text-violet-600">Terms of Service</a>
          <a href="#" className="hover:text-violet-600">Contact Us</a>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationContent;
