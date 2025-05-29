
import React from "react";
import { Eye } from "lucide-react";
import { ProposalLibraryItem } from "./ProposalLibraryData";

interface ProposalLibraryCardProps {
  proposal: ProposalLibraryItem;
  onViewProposal: (proposal: ProposalLibraryItem) => void;
}

const ProposalLibraryCard: React.FC<ProposalLibraryCardProps> = ({
  proposal,
  onViewProposal,
}) => {
  console.log("Rendering ProposalLibraryCard:", proposal.title);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <div
        key={index}
        className={`w-3.5 h-3.5 ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </div>
    ));
  };

  const getFileTypeColor = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case "word":
        return "bg-blue-50 text-blue-600";
      case "powerpoint":
        return "bg-orange-50 text-orange-600";
      default:
        return "bg-blue-50 text-blue-600";
    }
  };

  return (
    <div className="w-[301px] h-[328px] rounded-[5px] border border-gray-300 bg-white shadow-sm hover:shadow-md transition-shadow">
      <img
        className="w-full h-[136px] object-cover rounded-t-[5px]"
        alt={proposal.title}
        src={proposal.imageSrc}
      />

      <div className="flex flex-col w-[273px] mx-auto mt-4 gap-4">
        <div className="flex items-center justify-between">
          <div
            className={`inline-flex items-center justify-center gap-2.5 p-2 rounded-[5px] ${getFileTypeColor(
              proposal.fileType
            )}`}
          >
            <div className="font-medium text-xs">{proposal.fileType}</div>
          </div>

          <div className="inline-flex items-center gap-1">
            {renderStars(proposal.rating)}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="font-medium text-gray-900 text-base leading-normal overflow-hidden">
              <span className="block truncate">{proposal.title}</span>
            </p>
            <p className="text-gray-500 text-xs leading-normal overflow-hidden">
              <span className="block truncate">{proposal.description}</span>
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-gray-500 text-xs">{proposal.uses} uses</div>
            <button
              onClick={() => onViewProposal(proposal)}
              className="inline-flex items-center justify-center gap-2.5 px-3.5 py-2 rounded-[5px] border border-violet-600 text-violet-600 hover:bg-violet-50 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span className="text-xs font-normal">View Proposal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalLibraryCard;
