
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import LeftColumnContent from "@/components/auth/LeftColumnContent";
import LoginFormContent from "@/components/auth/LoginFormContent";
import RegistrationFormContent from "@/components/auth/RegistrationFormContent";
import ConfirmationContent from "@/components/auth/ConfirmationContent";

// List of application modules (needed for confirmation page)
const MODULES = [
  { id: "fundraising", name: "Fundraising", description: "Manage donors, track opportunities, create proposals" },
  { id: "program-management", name: "Program Management", description: "Plan and execute programs and projects" },
  { id: "procurement", name: "Procurement", description: "Manage purchases and vendor relationships" },
  { id: "inventory-management", name: "Inventory Management", description: "Track and manage organizational assets" },
  { id: "finance-control", name: "Finance & Control", description: "Manage budgets, expenses and financial reports" },
  { id: "learning-management", name: "Learning Management", description: "Training and knowledge base systems" },
  { id: "document-management", name: "Document Management", description: "Store and organize important documents" },
  { id: "hr-management", name: "Human Resource Management", description: "Staff management and HR functions" },
];

type AuthView = "login" | "register" | "confirmation";

type RegistrationData = {
  orgName: string;
  email: string;
  telephone: string;
  country: string;
  password: string;
  selectedModules: string[];
};

interface AuthPageProps {
  initialView?: AuthView;
}

const AuthPage: React.FC<AuthPageProps> = ({ initialView = "login" }) => {
  const [currentView, setCurrentView] = useState<AuthView>(initialView);
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const mounted = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Set the initial view based on the current route when the component mounts
  useEffect(() => {
    const path = location.pathname;
    if (path === "/register") {
      setCurrentView("register");
    } else {
      setCurrentView("login");
    }
    
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, [location.pathname]);

  // Handle successful login
  const handleLoginSuccess = () => {
    if (mounted.current) {
      navigate("/modules/fundraising/dashboard");
    }
  };

  // Switch between authentication views
  const switchToLogin = () => setCurrentView("login");
  const switchToRegister = () => setCurrentView("register");
  
  // Handle registration continue button
  const handleRegistrationContinue = (formData: RegistrationData) => {
    setRegistrationData(formData);
    setCurrentView("confirmation");
  };

  // Handle back button from confirmation
  const handleConfirmationBack = () => {
    setCurrentView("register");
  };

  // Handle final registration confirmation
  const handleRegistrationConfirm = () => {
    toast.success("Registration successful! Please sign in.");
    setCurrentView("login");
    navigate("/", { replace: true });
  };

  // Render the correct form based on the current view
  const renderAuthContent = () => {
    switch (currentView) {
      case "login":
        return (
          <LoginFormContent 
            onLoginSuccess={handleLoginSuccess} 
            onRegisterClick={switchToRegister}
          />
        );
      case "register":
        return (
          <RegistrationFormContent 
            onContinue={handleRegistrationContinue}
            onLoginClick={switchToLogin}
          />
        );
      case "confirmation":
        return registrationData ? (
          <ConfirmationContent
            formData={registrationData}
            modulesList={MODULES}
            onBack={handleConfirmationBack}
            onConfirm={handleRegistrationConfirm}
            onLoginClick={switchToLogin}
          />
        ) : null;
    }
  };

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* Left Column - Image and Content - Reduced the px-8 to px-4 and added gap-0 */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center">
        <div className="max-w-md w-full">
          <LeftColumnContent />
        </div>
      </div>

      {/* Right Column - Dynamic Auth Form - Reduced the px-8 to px-4 and justify-start to justify-center */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        {renderAuthContent()}
      </div>
    </div>
  );
};

export default AuthPage;
