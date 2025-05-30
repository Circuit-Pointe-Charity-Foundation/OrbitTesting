import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import LeftColumnContent from "@/components/auth/LeftColumnContent";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

// List of countries (Nigeria default and first)
const COUNTRY_OPTIONS = [
    "Nigeria",
    "Kenya",
    "South Africa",
    "Ghana",
    "Egypt",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "India",
];

// Update MODULES to include User Management and Grants Management
const MODULES = [
    { id: "fundraising", name: "Fundraising", description: "Manage donors, track opportunities, create proposals" },
    { id: "program-management", name: "Program Management", description: "Plan and execute programs and projects" },
    { id: "procurement", name: "Procurement", description: "Manage purchases and vendor relationships" },
    { id: "inventory-management", name: "Inventory Management", description: "Track and manage organizational assets" },
    { id: "finance-control", name: "Finance & Control", description: "Manage budgets, expenses and financial reports" },
    { id: "learning-management", name: "Learning Management", description: "Training and knowledge base systems" },
    { id: "document-management", name: "Document Management", description: "Store and organize important documents" },
    { id: "hr-management", name: "Human Resource Management", description: "Staff management and HR functions" },
    { id: "user-management", name: "User Management", description: "Manage user accounts and permissions" },
    { id: "grants-management", name: "Grants Management", description: "Manage grant applications and funding" },
];

type RegistrationStep = "details" | "modules" | "confirm";

const Registration: React.FC = () => {
    const [orgName, setOrgName] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [country, setCountry] = useState("Nigeria");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [selectedModules, setSelectedModules] = useState<string[]>(["fundraising"]); // Default select fundraising
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<RegistrationStep>("details");
    const navigate = useNavigate();

    const handleModuleToggle = (moduleId: string, checked: boolean) => {
        setSelectedModules(prev =>
            checked
                ? [...prev, moduleId]
                : prev.filter(id => id !== moduleId)
        );
    };

    const goToModules = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation for the first step
        if (!orgName || !email || !telephone || !password) {
            toast.error("Please fill all organization details");
            return;
        }
        setStep("modules");
    };

    const goToConfirm = () => {
        if (selectedModules.length === 0) {
            toast.error("Please select at least one module");
            return;
        }
        setStep("confirm");
    };

    const goBack = () => {
        if (step === "modules") {
            setStep("details");
        } else if (step === "confirm") {
            setStep("modules");
        }
    };

    const handleRegister = () => {
        setIsLoading(true);

        // Simulate registration process
        setTimeout(() => {
            setIsLoading(false);
            toast.success("Registration successful! Please sign in.");
            navigate("/");
        }, 1000);
    };

    return (
        <div className="flex h-screen w-full bg-white overflow-hidden">
            {/* Left Column - Same as Login page */}
            <div className="hidden md:flex md:w-1/2 items-center justify-end px-8">
                <div className="max-w-md w-full">
                    <LeftColumnContent />
                </div>
            </div>

            {/* Right Column - Registration Form */}
            <div className="w-full md:w-1/2 flex items-center justify-start px-8">
                <div className="max-w-sm w-full">

                    {step === "details" && (
                        <>
                            {/* Welcome message */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2">
                                    <h1 className="text-3xl font-bold text-gray-900">Hello there</h1>
                                    <span className="h-6 w-6 text-yellow-500 animate-pulse">👋</span>
                                </div>
                                <p className="text-gray-500 mt-1">Register your NGO</p>
                            </div>

                            {/* Organization Details Form */}
                            <form className="space-y-5" onSubmit={goToModules}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="orgName" className="block text-sm font-medium text-gray-700">
                                            Organization Name<span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="orgName"
                                            value={orgName}
                                            onChange={(e) => setOrgName(e.target.value)}
                                            placeholder="Your organization"
                                            className="w-full px-4 py-2 h-10 rounded-sm border border-gray-300 bg-gray-50"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Organization Email<span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="contact@yourorg.org"
                                            className="w-full px-4 py-2 h-10 rounded-sm border border-gray-300 bg-gray-50"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                                            Telephone<span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="telephone"
                                            type="tel"
                                            value={telephone}
                                            onChange={(e) => setTelephone(e.target.value)}
                                            placeholder="+2348012345678"
                                            className="w-full px-4 py-2 h-10 rounded-sm border border-gray-300 bg-gray-50"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                            Country<span className="text-red-500">*</span>
                                        </Label>
                                        <Select value={country} onValueChange={setCountry}>
                                            <SelectTrigger className="w-full h-10 rounded-sm border border-gray-300 bg-gray-50">
                                                <SelectValue placeholder="Select country" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {COUNTRY_OPTIONS.map((country) => (
                                                    <SelectItem key={country} value={country}>
                                                        {country}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Password - full width */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password<span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Create a strong password"
                                            className="w-full px-4 py-2 h-10 rounded-sm border border-gray-300 bg-gray-50 pr-10"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {showPassword ? (
                                                <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <EyeIcon className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Continue Button */}
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-10 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-sm py-2 text-base transition-colors"
                                >
                                    Continue to Modules
                                </Button>

                                {/* Login Link */}
                                <p className="mt-6 text-center text-gray-500">
                                    Already have an account?{" "}
                                    <Link
                                        to="/"
                                        className="text-violet-600 hover:text-violet-700 font-medium"
                                    >
                                        Sign in
                                    </Link>
                                </p>
                            </form>
                        </>
                    )}

                    {step === "modules" && (
                        <>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Select Modules
                            </h2>
                            <div className="overflow-y-auto max-h-[calc(100vh-220px)] pr-2 mb-6">
                                <div className="space-y-3">
                                    <Label className="block text-sm font-medium text-gray-700">
                                        Choose the modules your organization needs:
                                    </Label>
                                    <div className="grid grid-cols-1 gap-3 p-3 bg-gray-50 rounded-md border border-gray-200">
                                        {MODULES.map((module) => (
                                            <div key={module.id} className="flex items-start gap-2" title={module.description}>
                                              <Checkbox
                                                id={module.id}
                                                checked={selectedModules.includes(module.id)}
                                                onCheckedChange={(checked) =>
                                                  handleModuleToggle(module.id, checked === true)
                                                }
                                                className="mt-1 flex-shrink-0"
                                              />
                                              <Label htmlFor={module.id} className="text-sm cursor-pointer leading-tight">
                                                {module.name}
                                              </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button variant="outline" onClick={goBack} className="w-1/2">
                                    Back
                                </Button>
                                <Button onClick={goToConfirm} className="w-1/2 bg-violet-600 hover:bg-violet-700 text-white">
                                    Continue to Confirm
                                </Button>
                            </div>
                        </>
                    )}

                    {step === "confirm" && (
                        <div className="overflow-y-auto max-h-[calc(100vh-220px)] pr-2">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Confirm Registration Details
                            </h2>

                            <div className="bg-gray-50 p-5 rounded-md border border-gray-200 mb-6">
                                <dl className="space-y-4">
                                    <div>
                                        <dt className="text-sm text-gray-500">Organization Name</dt>
                                        <dd className="font-medium text-gray-900">{orgName}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm text-gray-500">Email</dt>
                                        <dd className="font-medium text-gray-900">{email}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm text-gray-500">Telephone</dt>
                                        <dd className="font-medium text-gray-900">{telephone}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm text-gray-500">Country</dt>
                                        <dd className="font-medium text-gray-900">{country}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm text-gray-500">Selected Modules</dt>
                                        <dd>
                                            <ul className="list-disc pl-5 mt-1">
                                                {MODULES.filter(m => selectedModules.includes(m.id)).map(module => (
                                                    <li key={module.id} className="font-medium text-gray-900">
                                                        {module.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="flex gap-4">
                                <Button variant="outline" onClick={goBack} className="w-1/2" disabled={isLoading}>
                                    Back
                                </Button>
                                <Button
                                    onClick={handleRegister}
                                    className="w-1/2 bg-violet-600 hover:bg-violet-700 text-white"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Registering..." : "Confirm & Register"}
                                </Button>
                            </div>

                            {/* Login Link */}
                            <p className="mt-6 text-center text-gray-500">
                                Already have an account?{" "}
                                <Link
                                    to="/"
                                    className="text-violet-600 hover:text-violet-700 font-medium"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="mt-12 text-center text-xs text-gray-400">
                        <div className="mb-4">© 2025 Orbit ERP. All rights reserved.</div>
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

export default Registration;
