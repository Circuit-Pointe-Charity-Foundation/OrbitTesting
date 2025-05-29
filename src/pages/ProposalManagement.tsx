
import React, { useState } from "react";
import ProposalTabs from "@/components/proposal-management/ProposalTabs";
import StatCards from "@/components/proposal-management/StatCards";
import ProposalTable from "@/components/proposal-management/ProposalTable";
import CreateProposalDialog from "@/components/proposal-management/CreateProposalDialog";
import ProposalCalendarTab from "@/components/proposal-management/ProposalCalendarTab";
import PastProposalLibrary from "@/components/proposal-management/PastProposalLibrary";

const ProposalManagement: React.FC = () => {
  console.log("Rendering ProposalManagement page");
  
  // Tabs: 0=Overview, 1=Past Proposal Library, 2=Browse Templates, 3=Calendar
  const [activeTab, setActiveTab] = useState(0);
  // Move create dialog state to here
  const [showCreate, setShowCreate] = useState(false);

  console.log("Active tab:", activeTab);

  return (
    <div className="bg-[#f4f6f9] min-h-screen p-6 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <ProposalTabs activeTab={activeTab} setActiveTab={setActiveTab} onOpenCreate={() => setShowCreate(true)} />
        <div className="mt-6" />
        {activeTab === 0 && (
          <>
            <StatCards />
            {/* pass onOpenCreate if needed for future extensions */}
            <ProposalTable onOpenCreate={() => setShowCreate(true)} />
          </>
        )}
        {activeTab === 1 && (
          <PastProposalLibrary />
        )}
        {activeTab === 2 && (
          <div className="mt-20 flex items-center justify-center text-lg text-gray-400">
            Browse Templates (To be implemented)
          </div>
        )}
        {activeTab === 3 && (
          <ProposalCalendarTab />
        )}
      </div>
      <CreateProposalDialog open={showCreate} onOpenChange={setShowCreate} />
    </div>
  );
};

export default ProposalManagement;
