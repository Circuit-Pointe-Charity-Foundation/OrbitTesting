
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EyeIcon, EyeOffIcon, UserPlus, ArrowLeft, Check } from "lucide-react";

const COUNTRIES = [
  "Nigeria", "Kenya", "South Africa", "Ghana", "Egypt",
  "United States", "United Kingdom", "Canada", "Australia", "India"
];

const MODULES = [
  { id: "fundraising", name: "Fundraising", description: "Manage donors and funding opportunities" },
  { id: "program-management", name: "Program Management", description: "Plan and execute programs" },
  { id: "procurement", name: "Procurement", description: "Manage purchases and vendors" },
  { id: "inventory", name: "Inventory Management", description: "Track organizational assets" },
  { id: "finance", name: "Finance & Control", description: "Manage budgets and finances" },
  { id: "learning", name: "Learning Management", description: "Training and knowledge systems" },
  { id: "document", name: "Document Management", description: "Store and organize documents" },
  { id: "hr", name: "Human Resources", description: "Staff management and HR functions" },
  { id: "user-management", name: "User Management", description: "Manage user accounts" },
  { id: "grants-management", name: "Grants Management", description: "Manage grant applications" },
];

type Step = "organization" | "modules" | "confirmation";

const NewRegistration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>("organization");
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedModules, setSelectedModules] = useState<string[]>(["fundraising"]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleModuleToggle = (moduleId: string, checked: boolean) => {
    setSelectedModules(prev =>
      checked ? [...prev, moduleId] : prev.filter(id => id !== moduleId)
    );
  };

  const validateStep1 = () => {
    if (!orgName || !email || !phone || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === "organization" && validateStep1()) {
      setCurrentStep("modules");
    } else if (currentStep === "modules") {
      if (selectedModules.length === 0) {
        toast.error("Please select at least one module");
        return;
      }
      setCurrentStep("confirmation");
    }
  };

  const handleBack = () => {
    if (currentStep === "modules") {
      setCurrentStep("organization");
    } else if (currentStep === "confirmation") {
      setCurrentStep("modules");
    }
  };

  const handleRegister = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Registration successful! Please sign in.");
      navigate("/new-login");
    }, 1500);
  };

  const getStepContent = () => {
    switch (currentStep) {
      case "organization":
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Organization Details</h2>
              <p className="text-gray-600">Tell us about your organization</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="orgName" className="text-sm font-medium text-gray-700">
                  Organization Name
                </Label>
                <Input
                  id="orgName"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="Your organization name"
                  className="mt-1 h-12"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@yourorg.org"
                  className="mt-1 h-12"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234 801 234 5678"
                  className="mt-1 h-12"
                />
              </div>

              <div>
                <Label htmlFor="country" className="text-sm font-medium text-gray-700">
                  Country
                </Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="mt-1 h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((countryOption) => (
                      <SelectItem key={countryOption} value={countryOption}>
                        {countryOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm Password
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showConfirmPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "modules":
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Modules</h2>
              <p className="text-gray-600">Choose the modules your organization needs</p>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {MODULES.map((module) => (
                <div key={module.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    id={module.id}
                    checked={selectedModules.includes(module.id)}
                    onCheckedChange={(checked) => handleModuleToggle(module.id, checked === true)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor={module.id} className="font-medium text-gray-900 cursor-pointer">
                      {module.name}
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "confirmation":
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm Registration</h2>
              <p className="text-gray-600">Please review your information</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Organization Information</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-600">Name:</span> <span className="font-medium">{orgName}</span></div>
                  <div><span className="text-gray-600">Email:</span> <span className="font-medium">{email}</span></div>
                  <div><span className="text-gray-600">Phone:</span> <span className="font-medium">{phone}</span></div>
                  <div><span className="text-gray-600">Country:</span> <span className="font-medium">{country}</span></div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Selected Modules</h3>
                <div className="space-y-1">
                  {MODULES.filter(m => selectedModules.includes(m.id)).map(module => (
                    <div key={module.id} className="text-sm font-medium text-gray-900">
                      • {module.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-violet-600 rounded-full flex items-center justify-center mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-600">Join Orbit ERP today</p>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === "organization" ? "bg-violet-600 text-white" : 
                currentStep === "modules" || currentStep === "confirmation" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
              }`}>
                1
              </div>
              <div className={`w-16 h-1 ${
                currentStep === "modules" || currentStep === "confirmation" ? "bg-green-500" : "bg-gray-200"
              }`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === "modules" ? "bg-violet-600 text-white" : 
                currentStep === "confirmation" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
              }`}>
                2
              </div>
              <div className={`w-16 h-1 ${
                currentStep === "confirmation" ? "bg-green-500" : "bg-gray-200"
              }`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === "confirmation" ? "bg-violet-600 text-white" : "bg-gray-200 text-gray-600"
              }`}>
                3
              </div>
            </div>
          </div>

          {getStepContent()}

          <div className="flex gap-4 mt-8">
            {currentStep !== "organization" && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1 h-12"
                disabled={isLoading}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            {currentStep !== "confirmation" ? (
              <Button
                onClick={handleNext}
                className="flex-1 h-12 bg-violet-600 hover:bg-violet-700"
              >
                Continue
              </Button>
            ) : (
              <Button
                onClick={handleRegister}
                className="flex-1 h-12 bg-violet-600 hover:bg-violet-700"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            )}
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/new-login" className="text-violet-600 hover:text-violet-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              © 2025 Orbit ERP. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRegistration;
