import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import ForgotPasswordDialog from "./ForgotPasswordDialog";

interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication process
    setTimeout(() => {
      setIsLoading(false);
      if (email && password) {
        toast.success("Login successful!");
        onLoginSuccess();
      } else {
        toast.error("Please enter both email and password");
      }
    }, 800);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-sm ml-auto">
      
      {/* Welcome message */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
          <span className="h-6 w-6 text-yellow-500 animate-pulse">👋</span>
        </div>
        <p className="text-gray-500 mt-1">Sign in to continue to your account</p>
      </div>

      {/* Login form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">
            Organization Email
          </label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 h-10 rounded-sm border border-gray-300 bg-gray-50"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <button 
              type="button"
              onClick={() => setForgotPasswordOpen(true)} 
              className="text-sm text-violet-600 hover:text-violet-500 font-medium"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 h-10 rounded-sm border border-gray-300 bg-gray-50"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-10 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-sm py-2 text-base transition-colors"
        >
          {isLoading ? "Login In.." : "Login"}
        </Button>
      </form>

      <p className="mt-6 text-center text-gray-500">
        New NGO?{" "}
        <Link
          to="/register"
          className="text-violet-600 hover:text-violet-700 font-medium"
        >
          Create an account
        </Link>
      </p>

      <div className="mt-12 text-center text-xs text-gray-400">
        <div className="mb-4">© 2025 Orbit ERP. All rights reserved.</div>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:text-violet-600">Privacy Policy</a>
          <a href="#" className="hover:text-violet-600">Terms of Service</a>
          <a href="#" className="hover:text-violet-600">Contact Us</a>
        </div>
      </div>

      {/* Forgot Password Dialog */}
      <ForgotPasswordDialog
        open={forgotPasswordOpen}
        onOpenChange={setForgotPasswordOpen}
      />
    </div>
  );
};

export default LoginForm;
