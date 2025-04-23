
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Eye, Eye as EyeOpen, Eye as EyeClosed } from "lucide-react"; // Lucide only allows eye, so we’ll use it for toggling state

const MODULES = [
  { id: "donor-management", name: "Donor Management", compulsory: true },
  { id: "opportunity-tracking", name: "Opportunity Tracking", compulsory: false },
  { id: "proposal-development", name: "Proposal Development", compulsory: false },
  { id: "proposal-library", name: "Proposal Library", compulsory: false },
  { id: "ai-proposal-wizard", name: "AI Proposal Wizard", compulsory: false },
  { id: "internal-workflow", name: "Internal Workflow", compulsory: false },
  { id: "calendar", name: "Calendar", compulsory: false },
  { id: "fundraising-analytics", name: "Fundraising Analytics", compulsory: false },
];

const Registration: React.FC = () => {
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedModules, setSelectedModules] = useState<string[]>(["donor-management"]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckbox = (id: string, checked: boolean) => {
    if (
      MODULES.find((mod) => mod.id === id && mod.compulsory)
    ) {
      return; // can't unselect compulsory
    }
    setSelectedModules((prev) =>
      checked ? [...prev, id] : prev.filter((mid) => mid !== id)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (!orgName || !email || !password || !country || !telephone) {
        toast.error("Please fill all required fields");
        return;
      }
      // Simulate registration
      toast.success("Registration successful! Please sign in.");
      navigate("/");
    }, 1000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')",
      }}
    >
      <div className="w-full max-w-3xl bg-gradient-to-br from-violet-800 via-purple-900 to-fuchsia-900/95 rounded-2xl shadow-2xl px-8 py-10 flex flex-col gap-4 items-center my-12">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/8d57d3330a663501866598decc78666e8126d2f9?placeholderIfAbsent=true"
          alt="Orbit ERP Logo"
          className="w-20 h-20 mb-2"
        />
        <h2 className="text-3xl font-extrabold text-white mb-1 text-center font-playfair">
          Register your NGO
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mt-0"
          autoComplete="off"
        >
          <div>
            <label className="block text-gray-200 font-medium mb-1" htmlFor="orgName">
              Organization Name<span className="text-fuchsia-300">*</span>
            </label>
            <input
              id="orgName"
              type="text"
              className="w-full px-4 py-2 rounded-md border border-gray-400 bg-violet-900 text-white placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
              placeholder="Your Organization"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-200 font-medium mb-1" htmlFor="email">
              Organization Email<span className="text-fuchsia-300">*</span>
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full px-4 py-2 rounded-md border border-gray-400 bg-violet-900 text-white placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
              placeholder="contact@yourorg.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-200 font-medium mb-1" htmlFor="telephone">
              Telephone<span className="text-fuchsia-300">*</span>
            </label>
            <input
              id="telephone"
              type="tel"
              autoComplete="tel"
              className="w-full px-4 py-2 rounded-md border border-gray-400 bg-violet-900 text-white placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
              placeholder="+1 555-555-5555"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-200 font-medium mb-1" htmlFor="country">
              Country<span className="text-fuchsia-300">*</span>
            </label>
            <input
              id="country"
              type="text"
              autoComplete="country-name"
              className="w-full px-4 py-2 rounded-md border border-gray-400 bg-violet-900 text-white placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div className="md:col-span-2 relative flex flex-col">
            <label className="block text-gray-200 font-medium mb-1" htmlFor="password">
              Password<span className="text-fuchsia-300">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                className="w-full px-4 py-2 pr-10 rounded-md border border-gray-400 bg-violet-900 text-white placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
                placeholder="Choose a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute top-1.5 right-2 text-violet-300 hover:text-fuchsia-400"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
              >
                <Eye size={22} />
              </button>
            </div>
          </div>
          <div className="md:col-span-2 flex flex-col gap-1">
            <label className="block text-gray-200 font-medium mb-1" htmlFor="modules-list">
              Select Modules for your NGO
            </label>
            <div
              id="modules-list"
              className="bg-violet-950 bg-opacity-50 rounded-md px-4 py-2 flex flex-wrap gap-y-2 gap-x-4 items-center"
            >
              {MODULES.filter((mod) => mod.id !== "dashboard" && mod.id !== "settings").map((mod) => (
                <label
                  key={mod.id}
                  className={`flex items-center gap-2 text-sm text-violet-200 cursor-pointer ${mod.compulsory ? "opacity-80 font-bold" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedModules.includes(mod.id)}
                    disabled={mod.compulsory}
                    onChange={(e) =>
                      handleCheckbox(mod.id, e.target.checked)
                    }
                    className="accent-fuchsia-500 focus:ring-fuchsia-400 w-4 h-4 rounded border-violet-500"
                  />
                  {mod.name}
                  {mod.compulsory && (
                    <span className="ml-1 px-2 py-0.5 rounded-sm bg-fuchsia-800 text-xs text-fuchsia-100 font-semibold">Required</span>
                  )}
                </label>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 flex justify-center mt-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full max-w-xs bg-fuchsia-600 text-white font-semibold rounded-md py-2 hover:bg-fuchsia-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </div>
        </form>
        <div className="w-full flex justify-center mt-4">
          <span className="text-sm text-gray-200">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-fuchsia-300 hover:text-fuchsia-200 hover:underline font-semibold transition"
            >
              Sign in
            </Link>
          </span>
        </div>
        <div className="mt-4 w-full flex flex-col items-center">
          <span className="text-xs text-gray-400 mb-1">
            Powered by <span className="text-fuchsia-400 font-bold">Orbit</span> for NGOs
          </span>
        </div>
      </div>
    </div>
  );
};

export default Registration;
