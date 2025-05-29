
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Download } from "lucide-react";

const Step4Review: React.FC = () => {
  return (
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
};

export default Step4Review;
