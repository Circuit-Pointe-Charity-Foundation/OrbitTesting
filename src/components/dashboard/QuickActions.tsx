
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddDonorDialog from "@/components/donor-management/AddDonorDialog";
import AddOpportunityDialog from "@/components/opportunity-tracking/AddOpportunityDialog";
import CreateProposalDialog from "@/components/proposal-management/CreateProposalDialog";
import { mockOpportunities } from "@/types/opportunity";
import { Plus, FileText, PieChart, BarChart3 } from "lucide-react";

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  to?: string;
  onClick?: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({
  icon,
  label,
  to,
  onClick,
}) => {
  const content = (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors cursor-pointer shadow-sm hover:shadow-md"
      onClick={onClick}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-md bg-violet-100 text-violet-600">
        {icon}
      </div>
      <div className="font-medium text-gray-900 text-sm">{label}</div>
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
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <QuickAction
            icon={<Plus className="w-4 h-4" />}
            label="New Donor"
            onClick={() => setAddDonorOpen(true)}
          />
          <QuickAction
            icon={<Plus className="w-4 h-4" />}
            label="New Opportunity"
            onClick={() => setAddOpportunityOpen(true)}
          />
          <QuickAction
            icon={<FileText className="w-4 h-4" />}
            label="Create Proposal"
            onClick={() => setCreateProposalOpen(true)}
          />
          <QuickAction
            icon={<BarChart3 className="w-4 h-4" />}
            label="Generate Reports"
            to="/reports"
          />
        </div>
        <div className="bg-violet-100 h-px w-full mt-4" />
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
