import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import LeftColumnContent from "@/components/auth/LeftColumnContent";

const Login: React.FC = () => {
  const mounted = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Set mounted ref when component mounts
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const handleLoginSuccess = () => {
    if (mounted.current) {
      navigate("/modules/fundraising/dashboard");
    }
  };

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* Left Column - Custom Image */}
      <div className="hidden md:flex md:w-1/2 items-center justify-end px-8">
        <div className="max-w-md w-full">
          <LeftColumnContent />
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-start px-8">
        <div className="max-w-sm w-full">
          <LoginForm
            key={location.pathname}
            onLoginSuccess={handleLoginSuccess}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
