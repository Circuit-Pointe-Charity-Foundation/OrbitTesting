import React, { useState } from "react";
import { ArrowLeft, FileText, Download, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const teamMembers = [
  { id: "1", name: "John Doe", role: "Project Lead" },
  { id: "2", name: "Sarah Johnson", role: "Research Coordinator" },
  { id: "3", name: "Michael Chen", role: "Budget Analyst" },
  { id: "4", name: "Emily Rodriguez", role: "Communications Manager" },
];

const attachments = [
  { id: "1", name: "Project Overview Document", type: "PDF Document" },
  { id: "2", name: "Budget Breakdown Analysis", type: "Excel Spreadsheet" },
  { id: "3", name: "Research Methodology", type: "Word Document" },
  { id: "4", name: "Timeline and Milestones", type: "PDF Document" },
];

const PastProposalDetailView: React.FC<PastProposalDetailViewProps> = ({
  proposal,
  onBack,
}) => {
  const [selectedTeamMember, setSelectedTeamMember] = useState<string>("1"); // Default to first team member
  const [selectedAttachments, setSelectedAttachments] = useState<string[]>([]);

  const handleAttachmentSelect = (attachmentId: string) => {
    setSelectedAttachments((prev) =>
      prev.includes(attachmentId)
        ? prev.filter((id) => id !== attachmentId)
        : [...prev, attachmentId]
    );
  };

  const handleDownloadSelected = () => {
    console.log("Downloading selected attachments:", selectedAttachments);
    // Download logic would go here
  };

  const handleDownloadAll = () => {
    console.log("Downloading all attachments");
    // Download all logic would go here
  };

  const selectedMember = teamMembers.find(
    (member) => member.id === selectedTeamMember
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header with Back button and Reuse button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back to Library</span>
        </button>

        <Button className="bg-black hover:bg-gray-800 text-white px-6">
          <Repeat className="h-4 w-4 mr-2" />
          Reuse Proposal
        </Button>
      </div>

      {/* Proposal Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {proposal.title}
        </h1>
        <p className="text-gray-600">{proposal.description}</p>
      </div>

      {/* Content Grid - More compact layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Overview Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Overview</h2>
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Summary</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Ultrices amet semectus
                et ultrices venenatis et tortor. Suscipit nibhaut facilisis
                posuruent velit.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Objectives</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Ultrices amet semectus
                et ultrices venenatis et tortor. Suscipit nibhaut facilisis
                posuruent velit.
              </p>
            </div>
          </div>

          {/* Logframe Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Logframe</h2>
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Outcome</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Ultrices amet semectus
                et ultrices.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Indicator</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Ultrices amet semectus
                et ultrices.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Assumption</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Ultrices amet semectus
                et ultrices.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Narrative Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Narrative</h2>
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Proposal Narrative</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Ultrices amet semectus
                et ultrices venenatis et tortor. Suscipit nibhaut facilisis
                posuruent velit.
              </p>
            </div>
          </div>

          {/* Budget Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Budget</h2>
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">
                Budget Figure (Naira)
              </h3>
              <p className="text-xl font-bold text-gray-900">₦31,400,396</p>
              <p className="text-gray-600 text-sm">Total project budget</p>
            </div>
          </div>

          {/* Team Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Team</h2>
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Team Member</h3>
              <Select
                value={selectedTeamMember}
                onValueChange={setSelectedTeamMember}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a team member" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-3 p-3 bg-gray-50 rounded-md">
                <p className="font-medium text-gray-900">
                  {selectedMember?.name}
                </p>
                <p className="text-gray-600 text-sm">{selectedMember?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attachments Card */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Attachments</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {attachments.map((attachment) => (
            <div
              key={attachment.id}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                selectedAttachments.includes(attachment.id)
                  ? "bg-violet-50 border-2 border-violet-200"
                  : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
              }`}
              onClick={() => handleAttachmentSelect(attachment.id)}
            >
              <FileText className="h-6 w-6 text-blue-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900 text-sm truncate">
                  {attachment.name}
                </p>
                <p className="text-gray-500 text-xs">{attachment.type}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Download buttons moved below attachments */}
        <div className="flex gap-2 pt-4">
          {selectedAttachments.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadSelected}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Selected ({selectedAttachments.length})
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleDownloadAll}>
            <Download className="h-4 w-4 mr-2" />
            Download All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PastProposalDetailView;
