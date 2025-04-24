
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Reset form state whenever component mounts or route changes
  const resetForm = useCallback(() => {
    setEmail("");
    setPassword("");
    setIsLoading(false);
  }, []);

  useEffect(() => {
    resetForm();
    // Cleanup function to reset state when component unmounts
    return () => resetForm();
  }, [resetForm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication process
    setTimeout(() => {
      setIsLoading(false);
      if (email && password) {
        toast.success("Login successful!");
        navigate("/modules/fundraising");
      } else {
        toast.error("Please enter both email and password");
      }
    }, 800);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')",
      }}
    >
      <div className="max-w-md w-full rounded-xl shadow-xl bg-gradient-to-br from-violet-700 via-violet-800 to-purple-900/95 p-8 flex flex-col items-center">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/8d57d3330a663501866598decc78666e8126d2f9?placeholderIfAbsent=true"
          alt="Orbit ERP Logo"
          className="w-24 h-24 mb-4"
        />
        <h1 className="text-3xl font-extrabold text-white mb-6 text-center">
          Orbit ERP
        </h1>
        <p className="text-gray-300 mb-7 text-center text-base">
          One platform for all your NGO operations.
        </p>
        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-gray-200 font-medium mb-1"
              htmlFor="email"
            >
              Organization Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full px-4 py-2 rounded-md border border-gray-400 bg-violet-900 text-white placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
              placeholder="you@yourorg.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-gray-200 font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="w-full px-4 py-2 rounded-md border border-gray-400 bg-violet-900 text-white placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="mt-2 bg-violet-600 text-white font-semibold rounded-md py-2 hover:bg-violet-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
        <div className="w-full flex justify-center mt-6">
          <Link
            to="/register"
            className="text-violet-300 hover:underline text-sm font-semibold transition-colors"
          >
            New NGO? <span className="text-violet-400 font-bold">Sign Up</span>
          </Link>
        </div>
        <div className="mt-6 w-full flex flex-col items-center">
          <span className="text-xs text-gray-400 mb-2">
            Powered by <span className="text-violet-600 font-bold">Orbit</span> for NGOs
          </span>
          <span className="text-xs text-gray-300">
            Module-based ERP | Secure | Scalable
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
