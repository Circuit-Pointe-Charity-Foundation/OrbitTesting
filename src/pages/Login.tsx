
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
    <div className="flex h-screen w-full bg-white">
      {/* Left Column - Custom Image */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden px-10 lg:px-16 xl:px-24">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="relative w-full h-[80%] max-w-sm">
            {/* Violet colored rectangle background */}
            <div className="absolute inset-0 bg-violet-600 rounded-lg shadow-lg"></div>
            
            {/* Stars scattered */}
            <div className="absolute top-10 left-10 w-3 h-3 bg-white opacity-70 rotate-45"></div>
            <div className="absolute top-20 right-20 w-2 h-2 bg-white opacity-70 rotate-45"></div>
            <div className="absolute bottom-20 left-20 w-4 h-4 bg-white opacity-70 rotate-45"></div>
            <div className="absolute bottom-40 right-40 w-2 h-2 bg-white opacity-70 rotate-45"></div>
            
            {/* Placeholder for African woman with tablet (would be replaced with actual image) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                {/* This is where the actual image would go */}
                <div className="bg-violet-700 p-4 rounded-lg mb-2">
                  {/* Placeholder for illustrative purposes */}
                  <p className="text-sm text-center">Image: African woman in smart attire holding a tablet and stylus</p>
                </div>
              </div>
            </div>
            
            {/* Transparent blurred rectangle with logo and text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm p-6 rounded-lg w-4/5">
                <div className="flex justify-center mb-4">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/8d57d3330a663501866598decc78666e8126d2f9?placeholderIfAbsent=true"
                    alt="Orbit ERP Logo"
                    className="w-12 h-12"
                  />
                </div>
                <h2 className="text-white text-xl font-bold text-center">Orbit ERP</h2>
                <p className="text-white text-sm text-center mt-2">Your fundraising command center</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-8 bg-white md:px-10 lg:px-16 xl:px-24">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/8d57d3330a663501866598decc78666e8126d2f9?placeholderIfAbsent=true"
              alt="Orbit ERP Logo"
              className="w-16 h-16"
            />
          </div>
          
          {/* Welcome message */}
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
              <Hand className="h-7 w-7 text-yellow-500 animate-pulse" />
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
                className="w-full px-4 py-2 h-10 rounded-lg border border-gray-300 focus:border-violet-500 focus:ring focus:ring-violet-200 bg-gray-50"
              />
            </div>

            <div className="space-y-1.5">
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
                  className="w-full px-4 py-2 h-10 rounded-lg border border-gray-300 focus:border-violet-500 focus:ring focus:ring-violet-200 bg-gray-50"
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
              className="w-full h-10 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg py-2 text-base transition-colors"
            >
              {isLoading ? "Signing In..." : "Sign In"}
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
            <div className="mb-4">© 2023 Orbit ERP. All rights reserved.</div>
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
