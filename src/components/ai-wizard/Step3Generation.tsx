
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Edit } from "lucide-react";

interface GeneratedProposal {
  overview: string;
  narrative: string;
  budget: string;
  logframe: string;
}

interface Step3GenerationProps {
  generatedProposal: GeneratedProposal;
}

const Step3Generation: React.FC<Step3GenerationProps> = ({ generatedProposal }) => {
  return (
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
};

export default Step3Generation;
