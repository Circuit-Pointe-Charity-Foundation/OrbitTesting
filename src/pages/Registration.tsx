
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// Modules list: Only Donor Management is compulsory now
const MODULES = [
  { id: "dashboard", name: "Dashboard", compulsory: false },
  { id: "donor-management", name: "Donor Management", compulsory: true },
  { id: "opportunity-tracking", name: "Opportunity Tracking", compulsory: false },
  { id: "proposal-development", name: "Proposal Development", compulsory: false },
  { id: "proposal-library", name: "Proposal Library", compulsory: false },
  { id: "ai-proposal-wizard", name: "AI Proposal Wizard", compulsory: false },
  { id: "internal-workflow", name: "Internal Workflow", compulsory: false },
  { id: "calendar", name: "Calendar", compulsory: false },
  { id: "fundraising-analytics", name: "Fundraising Analytics", compulsory: false },
  { id: "settings", name: "Settings", compulsory: false },
];

const Registration: React.FC = () => {
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      if (!orgName || !email || !password) {
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
          "linear-gradient(rgba(38,0,80,0.84), rgba(33,1,59,0.87)), url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')",
      }}
    >
      <div className="max-w-lg w-full bg-gradient-to-br from-violet-800 via-purple-900 to-fuchsia-900/95 rounded-2xl shadow-2xl px-8 py-12 flex flex-col gap-8 items-center">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/8d57d3330a663501866598decc78666e8126d2f9?placeholderIfAbsent=true"
          alt="Orbit ERP Logo"
          className="w-20 h-20 mb-2"
        />
        <h2 className="text-3xl font-extrabold text-white mb-4 text-center font-playfair">
          Register your NGO
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-5 mt-2"
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
            <label className="block text-gray-200 font-medium mb-1" htmlFor="password">
              Password<span className="text-fuchsia-300">*</span>
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              className="w-full px-4 py-2 rounded-md border border-gray-400 bg-violet-900 text-white placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
              placeholder="Choose a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <div>
            <label className="block text-gray-200 font-medium mb-2" htmlFor="modules-list">
              Select Modules for your NGO
            </label>
            <div
              id="modules-list"
              className="bg-violet-950 bg-opacity-50 rounded-md px-4 py-5 flex flex-wrap gap-y-3 gap-x-6 items-center"
            >
              {MODULES.map((mod) => (
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
          <Button
            type="submit"
            disabled={isLoading}
            className="mt-4 bg-fuchsia-600 text-white font-semibold rounded-md py-2 hover:bg-fuchsia-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>
        <div className="mt-4 w-full flex justify-center">
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
        <div className="mt-6 w-full flex flex-col items-center">
          <span className="text-xs text-gray-400 mb-2">
            Powered by <span className="text-fuchsia-400 font-bold">Orbit</span> for NGOs
          </span>
          <span className="text-xs text-gray-300">
            Module-based ERP | Secure | Scalable
          </span>
        </div>
      </div>
    </div>
  );
};

export default Registration;
