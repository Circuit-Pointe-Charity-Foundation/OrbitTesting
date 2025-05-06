
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon, Hand } from "lucide-react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const mounted = useRef(false);
  const navigate = useNavigate();

  // Reset state when component mounts or when location changes
  useEffect(() => {
    mounted.current = true;
    
    setEmail("");
    setPassword("");
    setIsLoading(false);
    
    return () => {
      mounted.current = false;
    };
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication process
    setTimeout(() => {
      if (!mounted.current) return;
      
      setIsLoading(false);
      if (email && password) {
        toast.success("Login successful!");
        // Redirect to the modules/fundraising page
        navigate("/modules/fundraising/dashboard");
      } else {
        toast.error("Please enter both email and password");
      }
    }, 800);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      {/* Login content */}
      <div className="flex justify-center items-center flex-1 px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/8d57d3330a663501866598decc78666e8126d2f9?placeholderIfAbsent=true"
              alt="Orbit ERP Logo"
              className="w-16 h-16"
            />
          </div>
          
          {/* Welcome message */}
          <div className="mb-8">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
              <Hand className="h-7 w-7 text-yellow-500 animate-pulse" />
            </div>
            <p className="text-gray-500 mt-1">Sign in to continue to your account</p>
          </div>

          {/* Login form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
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
                className="w-full px-4 py-2 h-12 rounded-lg border border-gray-300 focus:border-violet-500 focus:ring focus:ring-violet-200"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                  Password
                </label>
                <a href="#" className="text-sm text-violet-600 hover:text-violet-500 font-medium">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 h-12 rounded-lg border border-gray-300 focus:border-violet-500 focus:ring focus:ring-violet-200"
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
              className="w-full h-12 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg py-2 text-base transition-colors"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <p className="mt-8 text-center text-gray-500">
            New NGO?{" "}
            <Link
              to="/register"
              className="text-violet-600 hover:text-violet-700 font-medium"
            >
              Create an account
            </Link>
          </p>

          <div className="mt-16 text-center text-xs text-gray-400">
            <div className="mb-1">© 2023 Orbit ERP. All rights reserved.</div>
            <div className="flex justify-center space-x-4">
              <a href="#" className="hover:text-violet-600">Privacy Policy</a>
              <a href="#" className="hover:text-violet-600">Terms of Service</a>
              <a href="#" className="hover:text-violet-600">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
