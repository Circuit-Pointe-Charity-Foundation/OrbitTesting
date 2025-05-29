
import React from "react";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PastProposalDetailViewProps {
  proposal: {
    title: string;
    description: string;
    fileType: string;
    uses: number;
    imageSrc: string;
    rating?: number;
  };
  onBack: () => void;
}

const PastProposalDetailView: React.FC<PastProposalDetailViewProps> = ({
  proposal,
  onBack,
}) => {
  return (
    <div className="w-full">
      {/* Header with Back button and Reuse button */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back to Library</span>
        </button>
        
        <Button className="bg-violet-600 hover:bg-violet-700 text-white px-6">
          Reuse Proposal
        </Button>
      </div>

      {/* Proposal Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{proposal.title}</h1>
        <p className="text-gray-600">{proposal.description}</p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Overview Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Overview</h2>
          
          {/* Summary Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Summary</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Ultrices amet semectus et ultrices 
              venenatis et tortor. Suscipit nibhaut facilisis posuruent velit. Duis 
              pellentesque sese ornaee augue diam ac et.
            </p>
          </div>

          {/* Objectives Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Objectives</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Ultrices amet semectus et ultrices 
              venenatis et tortor. Suscipit nibhaut facilisis posuruent velit. Duis 
              pellentesque sese ornaae augue diam ac et.
            </p>
          </div>
        </div>

        {/* Narrative Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Narrative</h2>
          
          {/* Proposal Narrative Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Proposal Narrative</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Ultrices amet semectus et ultrices 
              venenatis et tortor. Suscipit nibhaut facilisis posuruent velit. Duis 
              pellentesque sese ornaae augue diam ac et.
            </p>
          </div>
        </div>

        {/* Budget Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Budget</h2>
          
          {/* Budget Figure Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Budget Figure (Naira)</h3>
            <p className="text-2xl font-bold text-gray-900 mb-2">₦31,400,396</p>
            <p className="text-gray-600 text-sm">Total project budget</p>
          </div>
        </div>

        {/* Logframe Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Logframe</h2>
          
          {/* Outcome Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Outcome</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Ultrices amet semectus et ultrices 
              venenatis et tortor. Suscipit nibhaut facilisis posuruent velit. Duis 
              pellentesque sese ornaae augue diam ac et.
            </p>
          </div>

          {/* Indicator Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Indicator</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Ultrices amet semectus et ultrices 
              venenatis et tortor. Suscipit nibhaut facilisis posuruent velit. Duis 
              pellentesque sese ornaae augue diam ac et.
            </p>
          </div>

          {/* Assumption Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Assumption</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Ultrices amet semectus et ultrices 
              venenatis et tortor. Suscipit nibhaut facilisis posuruent velit. Duis 
              pellentesque sese ornaae augue diam ac et.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Team</h2>
          
          {/* Team Member Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Team Member</h3>
            <p className="text-gray-900 font-medium mb-2">John Doe</p>
            <p className="text-gray-600 text-sm">Project Lead</p>
          </div>

          {/* Role Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Role</h3>
            <p className="text-gray-700 text-sm leading-relaxed">Coordinator</p>
          </div>
        </div>

        {/* Attachments Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Attachment</h2>
          
          {/* Attachments Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="space-y-4">
              {/* Sample Attachment 1 */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Lorem ipsum eget adipisent</p>
                  <p className="text-gray-500 text-xs">PDF Document</p>
                </div>
              </div>

              {/* Sample Attachment 2 */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Lorem ipsum eget adipisent</p>
                  <p className="text-gray-500 text-xs">PDF Document</p>
                </div>
              </div>

              {/* Sample Attachment 3 */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Lorem ipsum eget adipisent</p>
                  <p className="text-gray-500 text-xs">PDF Document</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastProposalDetailView;
