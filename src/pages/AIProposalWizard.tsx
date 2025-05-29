
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Bot, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AIProposalWizard: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectDescription: "",
    fundingAmount: "",
    targetAudience: "",
    proposalType: "",
    organizationInfo: "",
    timeline: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleGenerateProposal = () => {
    // TODO: Implement AI proposal generation
    console.log("Generating proposal with data:", formData);
    // For now, just show a success message or navigate back
    alert("AI Proposal generation will be implemented soon!");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="project-description">Project Description</Label>
              <Textarea
                id="project-description"
                placeholder="Describe your project, its goals, and impact..."
                value={formData.projectDescription}
                onChange={(e) => handleInputChange("projectDescription", e.target.value)}
                className="mt-2 min-h-32"
              />
            </div>
            <div>
              <Label htmlFor="funding-amount">Requested Funding Amount</Label>
              <Input
                id="funding-amount"
                placeholder="e.g., $50,000"
                value={formData.fundingAmount}
                onChange={(e) => handleInputChange("fundingAmount", e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="target-audience">Target Audience/Beneficiaries</Label>
              <Input
                id="target-audience"
                placeholder="Who will benefit from this project?"
                value={formData.targetAudience}
                onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="proposal-type">Proposal Type</Label>
              <Select
                value={formData.proposalType}
                onValueChange={(value) => handleInputChange("proposalType", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select proposal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grant">Grant Proposal</SelectItem>
                  <SelectItem value="foundation">Foundation Proposal</SelectItem>
                  <SelectItem value="corporate">Corporate Sponsorship</SelectItem>
                  <SelectItem value="government">Government Funding</SelectItem>
                  <SelectItem value="individual">Individual Donor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="organization-info">Organization Information</Label>
              <Textarea
                id="organization-info"
                placeholder="Brief description of your organization, mission, and track record..."
                value={formData.organizationInfo}
                onChange={(e) => handleInputChange("organizationInfo", e.target.value)}
                className="mt-2 min-h-32"
              />
            </div>
            <div>
              <Label htmlFor="timeline">Project Timeline</Label>
              <Input
                id="timeline"
                placeholder="e.g., 12 months, January 2024 - December 2024"
                value={formData.timeline}
                onChange={(e) => handleInputChange("timeline", e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-purple-600" />
              <h3 className="text-xl font-semibold mb-2">Ready to Generate Your Proposal</h3>
              <p className="text-gray-600 mb-6">
                Our AI will create a comprehensive proposal based on the information you provided.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-3">Summary of Your Input:</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Project:</span> {formData.projectDescription.substring(0, 100)}...</p>
                <p><span className="font-medium">Funding:</span> {formData.fundingAmount}</p>
                <p><span className="font-medium">Type:</span> {formData.proposalType}</p>
                <p><span className="font-medium">Timeline:</span> {formData.timeline}</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-[#f4f6f9] min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/modules/fundraising/proposal-management")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Proposal Management
          </Button>
          
          <div className="flex items-center gap-3 mb-2">
            <Bot className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold">AI Proposal Wizard</h1>
          </div>
          <p className="text-gray-600">
            Let our AI help you create a compelling proposal in just a few steps.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div
                  className={`w-16 h-1 mx-2 ${
                    step > stepNumber ? "bg-purple-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>
              Step {step}: {step === 1 ? "Project Details" : step === 2 ? "Additional Information" : "Review & Generate"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Tell us about your project and funding needs"}
              {step === 2 && "Provide context about your organization and proposal type"}
              {step === 3 && "Review your information and generate the proposal"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStep()}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={step === 1}
              >
                Previous
              </Button>
              
              {step < 3 ? (
                <Button onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button onClick={handleGenerateProposal} className="bg-purple-600 hover:bg-purple-700">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Proposal
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIProposalWizard;
