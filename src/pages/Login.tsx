
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

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
    <div className="flex h-screen w-full">
      {/* Left column - Image section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-violet-700 overflow-hidden">
        <img 
          src="https://tapped.lovable.dev/UxuvYwyPNx26sMeSGvit42/da12dca0-3f0b-4a76-9310-64549bea1f6c/login-bg.png" 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <img 
            src="https://tapped.lovable.dev/UxuvYwyPNx26sMeSGvit42/da12dca0-3f0b-4a76-9310-64549bea1f6c/login-person.png" 
            alt="Person with laptop" 
            className="max-w-md w-full z-10"
          />
          <img 
            src="https://tapped.lovable.dev/UxuvYwyPNx26sMeSGvit42/da12dca0-3f0b-4a76-9310-64549bea1f6c/login-star.png" 
            alt="Star decoration" 
            className="absolute top-1/4 left-1/4 w-16 h-16 z-0 animate-pulse"
          />
          <img 
            src="https://tapped.lovable.dev/UxuvYwyPNx26sMeSGvit42/da12dca0-3f0b-4a76-9310-64549bea1f6c/login-sparkle.png" 
            alt="Sparkle decoration" 
            className="absolute bottom-1/3 right-1/4 w-12 h-12 z-0 animate-pulse"
          />
        </div>
      </div>

      {/* Right column - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6">
        <div className="max-w-md w-full">
          {/* Logo - Only visible on mobile */}
          <div className="flex justify-center mb-8 lg:hidden">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/8d57d3330a663501866598decc78666e8126d2f9?placeholderIfAbsent=true"
              alt="Orbit ERP Logo"
              className="w-16 h-16"
            />
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
            <p className="text-gray-500">Sign in to continue to your account</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Email Address
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
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-violet-600 hover:text-violet-700 font-medium"
            >
              Sign Up
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
