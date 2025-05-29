
import React from "react";
import { RotateCcw } from "lucide-react";
import ProposalDetailHeader from "./ProposalDetailHeader";
import ProposalOverviewCard from "./ProposalOverviewCard";
import ProposalLogframeCard from "./ProposalLogframeCard";
import ProposalNarrativeCard from "./ProposalNarrativeCard";
import ProposalBudgetCard from "./ProposalBudgetCard";
import ProposalTeamCard from "./ProposalTeamCard";
import ProposalAttachmentsCard from "./ProposalAttachmentsCard";

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
  const handleReuseProposal = () => {
    console.log("Reusing proposal:", proposal.title);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      <ProposalDetailHeader
        onBack={onBack}
        onReuse={handleReuseProposal}
        title={proposal.title}
        description={proposal.description}
        buttonText="Reuse Proposal"
        buttonIcon={<RotateCcw className="h-4 w-4 mr-2" />}
      />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <ProposalOverviewCard />
          <ProposalLogframeCard />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <ProposalNarrativeCard narrativeTitle="Proposal Narrative" />
          <ProposalBudgetCard budgetDescription="Total project budget" />
          <ProposalTeamCard />
        </div>
      </div>

      {/* Attachments Card */}
      <ProposalAttachmentsCard />
    </div>
  );
};

export default PastProposalDetailView;
