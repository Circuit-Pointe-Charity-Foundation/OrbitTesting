
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Bot, Sparkles, Upload, FileText, CheckCircle, Download, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AIProposalWizard: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [pastedContent, setPastedContent] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [selectedProposal, setSelectedProposal] = useState<string>("");
  const [generatedProposal, setGeneratedProposal] = useState({
    overview: "This business plan outlines a comprehensive strategy for...",
    narrative: "Lorem ipsum dolor sit amet consectetur. Placerat quam dignissim fusce praesent at stractum in vivamus magna. Quis ullamcorper tempor elit ullamcorper. Eleifend et porttitor aliquam morbi pellentesque ex. Ipsum sagittis malesuada dolor lorem molestie eleifend non elementum lorem.",
    budget: "$25,000,000",
    logframe: "Lorem ipsum dolor sit amet consectetur. Placerat quam dignissim fusce praesent at stractum in vivamus magna."
  });

  // Mock data for extracted keywords
  const extractedKeywords = [
    "Health Programs", "Community Development", "Funding Sources", "Budget Allocation", "Impact Assessment",
    "Governance Requirements", "Sustainability Goals", "Community Strategy", "Annual Reports",
    "Sponsorship Levels", "Community Outreach", "Fundraising Goals", "Stakeholder Engagement",
    "Financial Management", "Program Sustainability", "Networking Opportunities", "Grant Writing",
    "Budget Certification", "Cultural Efforts", "Training Events", "Program Sustainability"
  ];

  // Mock previous proposals data
  const previousProposals = [
    {
      id: "1",
      title: "Health Care Access Project",
      environment: "Environment",
      lastModified: "April 30, 2023",
      tags: ["Health", "Community", "Policy"]
    },
    {
      id: "2",
      title: "Health Care Access Project",
      environment: "Environment", 
      lastModified: "April 30, 2023",
      tags: ["Health", "Sustainability", "Policy"]
    },
    {
      id: "3",
      title: "Health Care Access Project",
      environment: "Environment",
      lastModified: "April 30, 2023",
      tags: ["Health", "Community", "Policy"]
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else if (step === 4) {
      setStep(5); // Success screen
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleKeywordToggle = (keyword: string) => {
    setSelectedKeywords(prev => 
      prev.includes(keyword) 
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    );
  };

  const handleProposalSelect = (proposalId: string) => {
    setSelectedProposal(proposalId);
  };

  const renderProgressSteps = () => {
    const steps = [
      { number: 1, label: "Upload or Paste Donor Call" },
      { number: 2, label: "Select Base Proposal" },
      { number: 3, label: "Proposal Generation" },
      { number: 4, label: "Review & Finalize" }
    ];

    return (
      <div className="flex items-center justify-center mb-8">
        {steps.map((stepItem, index) => (
          <div key={stepItem.number} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepItem.number
                    ? "bg-violet-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {stepItem.number}
              </div>
              <p className={`text-xs text-center max-w-[120px] ${
                step >= stepItem.number ? "text-violet-600" : "text-gray-400"
              }`}>
                {stepItem.label}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-[150px] h-px mx-4 ${
                  step > stepItem.number ? "bg-violet-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-xl font-medium text-violet-600 mb-2">Start Your Proposal</h3>
        <p className="text-gray-500">Upload your donor call document or paste the content to begin</p>
      </div>

      <div className="bg-purple-50 p-6 rounded-lg space-y-6">
        {/* Upload Document Section */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-violet-600" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-800">Upload Document</h4>
              <p className="text-sm text-gray-500">Supported formats: PDF, DOCS, TXT</p>
            </div>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
            />
            <div className="flex items-center justify-center gap-8">
              <Button
                onClick={() => document.getElementById('file-upload')?.click()}
                className="bg-violet-600 hover:bg-violet-700"
              >
                Browse Files
              </Button>
              <span className="text-gray-500">or drag and drop here</span>
            </div>
            {uploadedFile && (
              <p className="mt-2 text-sm text-green-600">File uploaded: {uploadedFile.name}</p>
            )}
          </div>
        </div>

        <div className="text-center text-violet-600 font-medium text-xl">- OR -</div>

        {/* Paste Content Section */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex flex-col items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-violet-600" />
            </div>
            <div className="text-center">
              <h4 className="text-lg font-medium text-gray-800">Paste Content</h4>
              <p className="text-sm text-gray-500">Copy and paste your donor call content</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Textarea
              placeholder="Paste your donor call content here..."
              value={pastedContent}
              onChange={(e) => setPastedContent(e.target.value)}
              className="min-h-[176px] resize-none"
              maxLength={5000}
            />
            <div className="text-right text-xs text-gray-500">
              {pastedContent.length}/5000 Characters
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-medium text-violet-600 mb-2">Select Base Proposal</h3>
        <p className="text-gray-500">Review extracted keywords and select a base proposal to continue</p>
      </div>

      {/* Extracted Keywords */}
      <div>
        <h4 className="text-lg font-medium mb-4">Extracted keywords</h4>
        <div className="flex flex-wrap gap-2">
          {extractedKeywords.map((keyword) => (
            <button
              key={keyword}
              onClick={() => handleKeywordToggle(keyword)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                selectedKeywords.includes(keyword)
                  ? "bg-violet-600 text-white border-violet-600"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {keyword}
            </button>
          ))}
        </div>
      </div>

      {/* Browse Previous Proposals */}
      <div>
        <h4 className="text-lg font-medium mb-4">Browse previous proposals</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {previousProposals.map((proposal) => (
            <Card 
              key={proposal.id} 
              className={`cursor-pointer transition-all ${
                selectedProposal === proposal.id ? "ring-2 ring-violet-600" : ""
              }`}
              onClick={() => handleProposalSelect(proposal.id)}
            >
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-gray-500 mt-1" />
                    <div className="flex-1">
                      <h5 className="font-medium text-sm">{proposal.title}</h5>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">
                          {proposal.environment}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Last modified: {proposal.lastModified}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {proposal.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button 
                    size="sm" 
                    variant={selectedProposal === proposal.id ? "default" : "outline"}
                    className="w-full"
                  >
                    {selectedProposal === proposal.id ? "Selected" : "Select"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-medium text-violet-600 mb-2">Proposal Generation</h3>
        <p className="text-gray-500">Review and edit the AI-generated proposal sections</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar with sections */}
        <div className="w-48 space-y-2">
          <div className="flex items-center gap-2 p-3 bg-gray-100 rounded">
            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
            <span className="text-sm font-medium">Overview</span>
          </div>
          <div className="flex items-center gap-2 p-3 hover:bg-gray-50 rounded cursor-pointer">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-sm">Narrative</span>
          </div>
          <div className="flex items-center gap-2 p-3 hover:bg-gray-50 rounded cursor-pointer">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm">Budget</span>
          </div>
          <div className="flex items-center gap-2 p-3 hover:bg-gray-50 rounded cursor-pointer">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm">Logframe</span>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="narrative">Narrative</TabsTrigger>
              <TabsTrigger value="budget">Budget</TabsTrigger>
              <TabsTrigger value="logframe">Logframe</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-4">
              <div className="bg-white border rounded-lg p-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700">{generatedProposal.overview}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Regenerate Section
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Manually
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="narrative" className="mt-4">
              <div className="bg-white border rounded-lg p-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700">{generatedProposal.narrative}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Regenerate Section
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Manually
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="budget" className="mt-4">
              <div className="bg-white border rounded-lg p-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700">{generatedProposal.budget}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Regenerate Section
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Manually
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="logframe" className="mt-4">
              <div className="bg-white border rounded-lg p-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700">{generatedProposal.logframe}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Regenerate Section
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Manually
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-medium text-violet-600 mb-2">Review & Finalize</h3>
        <p className="text-gray-500">Final review of your AI-generated proposal</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            AI-Generated Proposal Draft
          </CardTitle>
          <CardDescription>
            Last updated: 2 min ago • 8 pages
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Proposal Sections Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-green-700 mb-2">Proposal Overview</h4>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur. Placerat quam dignissim fusce praesent...
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-red-700 mb-2">Narrative</h4>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur. Placerat quam dignissim fusce praesent...
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-yellow-700 mb-2">Budget</h4>
              <p className="text-sm text-gray-600">$25,000,000</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-green-600 mb-2">Logframe</h4>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur. Placerat quam dignissim fusce praesent...
              </p>
            </div>
          </div>

          {/* Export Options */}
          <div className="border-t pt-6">
            <h4 className="font-medium mb-4">Export Options</h4>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-violet-600 hover:bg-violet-700">
                Export to Proposal Builder
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download as Word
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download as PDF
              </Button>
            </div>
          </div>

          {/* Document Statistics */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-medium mb-2">Document Statistics</h5>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Word Count:</span>
                <span className="ml-2 font-medium">2,640</span>
              </div>
              <div>
                <span className="text-gray-600">Modified sections:</span>
                <span className="ml-2 font-medium">1</span>
              </div>
              <div>
                <span className="text-gray-600">AI-generated sections:</span>
                <span className="ml-2 font-medium">4</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSuccessScreen = () => (
    <div className="text-center space-y-6">
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Proposal Exported Successfully!</h3>
        <p className="text-gray-600">Your AI-generated proposal has been sent to the Proposal Builder</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg inline-block">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-gray-600" />
          <span className="font-medium">Female Education Proposal</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button 
          className="w-full bg-violet-600 hover:bg-violet-700"
          onClick={() => navigate("/modules/fundraising/proposal-management")}
        >
          View in Proposal Workspace →
        </Button>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => setStep(1)}
        >
          Return to AI Proposal Wizard
        </Button>
      </div>
    </div>
  );

  const canProceed = () => {
    switch (step) {
      case 1:
        return uploadedFile || pastedContent.trim().length > 0;
      case 2:
        return selectedProposal !== "";
      case 3:
      case 4:
        return true;
      default:
        return false;
    }
  };

  if (step === 5) {
    return (
      <div className="bg-[#f4f6f9] min-h-screen p-6">
        <div className="max-w-2xl mx-auto">
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
          </div>

          {renderSuccessScreen()}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f4f6f9] min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
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
        {renderProgressSteps()}

        {/* Main Content */}
        <Card>
          <CardContent className="p-8">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={step === 1}
              >
                Previous
              </Button>
              
              {step < 4 ? (
                <Button 
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-violet-600 hover:bg-violet-700"
                >
                  {step === 3 ? "Continue Generation" : "Proceed"}
                </Button>
              ) : (
                <Button 
                  onClick={handleNext}
                  className="bg-violet-600 hover:bg-violet-700"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Save and Continue
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
