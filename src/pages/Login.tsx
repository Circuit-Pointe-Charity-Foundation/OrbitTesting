
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import LeftColumnContent from "@/components/auth/LeftColumnContent";

const Login: React.FC = () => {
  const mounted = useRef(false);
  const navigate = useNavigate();

  // Set mounted ref when component mounts
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, [navigate]);

  const handleLoginSuccess = () => {
    if (mounted.current) {
      // Redirect to the modules/fundraising page
      navigate("/modules/fundraising/dashboard");
    }
  };

  return (
    <div className="flex h-screen w-full bg-white">
      {/* Left Column - Custom Image - Now pushed to the right */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden px-10 lg:px-16 xl:px-24 justify-end">
        <LeftColumnContent />
      </div>

      {/* Right Column - Login Form - Now pushed to the left */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start px-6 py-8 bg-white md:px-10 lg:px-16 xl:px-24">
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
};

export default Login;
