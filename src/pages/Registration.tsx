import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// List of countries (Nigeria default and first)
const COUNTRY_OPTIONS = [
<<<<<<< HEAD
  "Nigeria",
  "Kenya",
  "South Africa",
  "Ghana",
  "Egypt",
  "United States",
  "United Kingdom",
  "Canada",
  "India",
  "China",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Brazil",
  "Australia",
  "Japan",
=======
  "Nigeria", "Kenya", "South Africa", "Ghana", "Egypt", "United States", "United Kingdom", "Canada", "India", "China", "Germany", "France", "Italy", "Spain", "Brazil", "Australia", "Japan"
>>>>>>> 0c31a23cd474ac4854cb36500d61deebc80c37d2
];

const MODULES = [
  { id: "donor-management", name: "Donor Management", compulsory: true },
  {
    id: "opportunity-tracking",
    name: "Opportunity Tracking",
    compulsory: false,
  },
  {
    id: "proposal-development",
    name: "Proposal Development",
    compulsory: false,
  },
  { id: "proposal-library", name: "Proposal Library", compulsory: false },
  { id: "ai-proposal-wizard", name: "AI Proposal Wizard", compulsory: false },
  { id: "internal-workflow", name: "Internal Workflow", compulsory: false },
  { id: "calendar", name: "Calendar", compulsory: false },
  {
    id: "fundraising-analytics",
    name: "Fundraising Analytics",
    compulsory: false,
  },
];

const Registration: React.FC = () => {
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedModules, setSelectedModules] = useState<string[]>([
    "donor-management",
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"form" | "confirm">("form");
  const navigate = useNavigate();

  const handleCheckbox = (id: string, checked: boolean) => {
    if (id === "donor-management") return; // always compulsory, can't be unchecked
    setSelectedModules((prev) =>
      checked ? [...prev, id] : prev.filter((mid) => mid !== id)
    );
  };

  const handleFormNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName || !email || !password || !country || !telephone) {
      toast.error("Please fill all required fields");
      return;
    }
    setStep("confirm");
  };

  const handleRegister = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Registration successful! Please sign in.");
      navigate("/");
    }, 1000);
  };

  // Only non-dashboard, non-settings modules shown as options
  const selectOptions = MODULES.filter(
    (mod) =>
      mod.id !== "dashboard" &&
      mod.id !== "settings" &&
      mod.id !== "donor-management"
  );

  // For module confirmation display (always include Donor Management)
  const selectedModuleNames = MODULES.filter((mod) =>
    selectedModules.includes(mod.id)
  ).map((mod) => mod.name);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat py-8"
      style={{
        backgroundImage:
          "linear-gradient(rgba(34,32,52,0.85), rgba(34,32,52,0.96)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      <div className="w-full max-w-lg bg-violet-950/95 rounded-xl shadow-2xl px-5 py-7 my-10 flex flex-col items-center">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/8d57d3330a663501866598decc78666e8126d2f9?placeholderIfAbsent=true"
          alt="Orbit ERP Logo"
          className="w-20 h-20 mb-2"
        />
        <h2 className="text-2xl font-extrabold text-white font-playfair mb-7 text-center">
          Register your NGO
        </h2>
        {step === "form" ? (
          <form
            onSubmit={handleFormNext}
            className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-2"
            autoComplete="off"
          >
            <div>
              <label
                className="block text-gray-200 font-medium mb-1"
                htmlFor="orgName"
              >
                Organization Name<span className="text-fuchsia-300">*</span>
              </label>
              <input
                id="orgName"
                type="text"
                className="w-full px-2 py-1.5 rounded-md border border-gray-400 bg-violet-900 text-white placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
                placeholder="Your Organization"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-200 font-medium mb-1"
                htmlFor="email"
              >
                Organization Email<span className="text-fuchsia-300">*</span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="w-full px-2 py-1.5 rounded-md border border-gray-400 bg-violet-900 text-white placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
                placeholder="contact@yourorg.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-200 font-medium mb-1"
                htmlFor="telephone"
              >
                Telephone<span className="text-fuchsia-300">*</span>
              </label>
              <input
                id="telephone"
                type="tel"
                autoComplete="tel"
                className="w-full px-2 py-1.5 rounded-md border border-gray-400 bg-violet-900 text-white placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
                placeholder="+1 555-555-5555"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-200 font-medium mb-1"
                htmlFor="country"
              >
                Country<span className="text-fuchsia-300">*</span>
              </label>
<<<<<<< HEAD
              <Select value={country} onValueChange={(val) => setCountry(val)}>
=======
              <Select
                value={country}
                onValueChange={(val) => setCountry(val)}
              >
>>>>>>> 0c31a23cd474ac4854cb36500d61deebc80c37d2
                <SelectTrigger className="w-full px-2 py-1.5 rounded-md border border-gray-400 bg-violet-900 text-white placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRY_OPTIONS.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2 flex flex-col">
              <label
                className="block text-gray-200 font-medium mb-1"
                htmlFor="password"
              >
                Password<span className="text-fuchsia-300">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  className="w-full px-2 py-1.5 pr-10 rounded-md border border-gray-400 bg-violet-900 text-white placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
                  placeholder="Choose a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute top-2 right-3 text-violet-300 hover:text-fuchsia-400"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
<<<<<<< HEAD
                  style={{ top: "0.5rem", right: "0.5rem" }}
=======
                  style={{ top: '0.5rem', right: '0.5rem' }}
>>>>>>> 0c31a23cd474ac4854cb36500d61deebc80c37d2
                >
                  <Eye size={18} />
                </button>
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col gap-1">
              <label
                className="block text-gray-200 font-medium mb-1"
                htmlFor="modules-list"
              >
                Select Modules
              </label>
              <div
                id="modules-list"
                className="bg-violet-950 bg-opacity-50 rounded-md px-3 py-1 flex flex-wrap gap-y-2 gap-x-3 items-center"
              >
                <span className="text-violet-200 text-sm flex items-center gap-2 font-bold">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="accent-fuchsia-500 w-4 h-4 rounded border-violet-500"
                  />
                  Donor Management
                  <span className="ml-1 px-2 py-0.5 rounded-sm bg-fuchsia-800 text-xs text-fuchsia-100 font-semibold">
                    Required
                  </span>
                </span>
                {selectOptions.map((mod) => (
                  <label
                    key={mod.id}
                    className="flex items-center gap-2 text-sm text-violet-200 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedModules.includes(mod.id)}
                      onChange={(e) => handleCheckbox(mod.id, e.target.checked)}
                      className="accent-fuchsia-500 w-4 h-4 rounded border-violet-500"
                    />
                    {mod.name}
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
                Next
              </Button>
            </div>
          </form>
        ) : (
          // Confirmation Step
          <div className="w-full flex flex-col items-center mt-2">
            <h3 className="text-lg text-white font-bold mb-5">
              Confirm Registration Details
            </h3>
            <div className="bg-violet-950/70 rounded-lg p-5 w-full max-w-md flex flex-col gap-3 mb-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-violet-200">
                  Organization Name
                </span>
                <span className="text-base text-white font-semibold">
                  {orgName}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-violet-200">Email</span>
                <span className="text-base text-white font-semibold">
                  {email}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-violet-200">Telephone</span>
                <span className="text-base text-white font-semibold">
                  {telephone}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-violet-200">Country</span>
                <span className="text-base text-white font-semibold">
                  {country}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-violet-200">
                  Selected Modules
                </span>
                <ul className="list-disc ml-5 text-white text-sm">
                  {selectedModuleNames.map((name) => (
                    <li key={name} className="mb-1">
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex gap-2 w-full max-w-xs">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setStep("form")}
                className="w-1/2"
              >
                Edit
              </Button>
              <Button
                type="button"
                onClick={handleRegister}
                className="w-1/2 bg-fuchsia-600 text-white hover:bg-fuchsia-700"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Confirm & Register"}
              </Button>
            </div>
          </div>
        )}
        <div className="w-full flex justify-center mt-6">
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
        <div className="mt-5 w-full flex flex-col items-center">
          <span className="text-xs text-gray-400 mb-1">
            Powered by <span className="text-fuchsia-400 font-bold">Orbit</span>{" "}
            for NGOs
          </span>
        </div>
      </div>
    </div>
  );
};

export default Registration;
