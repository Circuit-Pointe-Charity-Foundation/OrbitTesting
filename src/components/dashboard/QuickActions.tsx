
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddDonorDialog from "@/components/donor-management/AddDonorDialog";
import AddOpportunityDialog from "@/components/opportunity-tracking/AddOpportunityDialog";
import CreateProposalDialog from "@/components/proposal-management/CreateProposalDialog";
import { mockOpportunities } from "@/types/opportunity";

interface QuickActionProps {
  icon: string;
  label: string;
  to?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({
  icon,
  label,
  to,
  isActive = false,
  onClick,
}) => {
  const content = (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors cursor-pointer ${
        isActive
          ? "text-violet-600 border-violet-600 bg-white"
          : "text-[#383839a6] border-transparent hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      <img
        src={icon}
        className="aspect-[1] object-contain w-5 shrink-0"
        alt=""
      />
      <div className="whitespace-nowrap text-sm">{label}</div>
    </div>
  );

  if (to && !onClick) {
    return <Link to={to}>{content}</Link>;
  }

  return content;
};

export const QuickActions: React.FC = () => {
  const [addDonorOpen, setAddDonorOpen] = useState(false);
  const [addOpportunityOpen, setAddOpportunityOpen] = useState(false);
  const [createProposalOpen, setCreateProposalOpen] = useState(false);

  // Create dummy donors for the opportunity dialog
  const donorsForDropdown = mockOpportunities
    .map((opp) => ({ id: opp.donorId, name: opp.donorName }))
    .filter((donor, idx, self) => idx === self.findIndex((d) => d.id === donor.id));

  const handleAddOpportunity = (opportunity: any) => {
    console.log("Opportunity added:", opportunity);
  };

  return (
    <>
      <div className="w-full mt-4 mb-2 px-4">
        <div className="flex items-center gap-2 flex-wrap">
          <QuickAction
            icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/965a4a1f3ca576e6aa56ae0709d67302d74873cd?placeholderIfAbsent=true"
            label="New Donor"
            onClick={() => setAddDonorOpen(true)}
          />
          <QuickAction
            icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/317b4486ebc32b2db7308b7bccd5be2891c14934?placeholderIfAbsent=true"
            label="New Opportunity"
            onClick={() => setAddOpportunityOpen(true)}
          />
          <QuickAction
            icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/e4db9bc09fc3b27f400f30eb3535efe627699f5d?placeholderIfAbsent=true"
            label="Create Proposal"
            onClick={() => setCreateProposalOpen(true)}
            isActive={true}
          />
          <QuickAction
            icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/c45e474da37deb864af93438f814f567fcfba3f7?placeholderIfAbsent=true"
            label="Generate Reports"
            to="/reports"
          />
        </div>
        <div className="bg-violet-100 h-px w-full mt-2" />
      </div>

      <AddDonorDialog 
        open={addDonorOpen} 
        onOpenChange={setAddDonorOpen}
        onSuccess={() => {
          console.log("Donor added successfully");
        }}
      />

      <AddOpportunityDialog
        isOpen={addOpportunityOpen}
        onClose={() => setAddOpportunityOpen(false)}
        onAddOpportunity={handleAddOpportunity}
        donors={donorsForDropdown}
      />

      <CreateProposalDialog
        open={createProposalOpen}
        onOpenChange={setCreateProposalOpen}
      />
    </>
  );
};
