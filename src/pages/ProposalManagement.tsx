
import React, { useState } from "react";
import ProposalTabs from "@/components/proposal-management/ProposalTabs";
import StatCards from "@/components/proposal-management/StatCards";
import ProposalTable from "@/components/proposal-management/ProposalTable";

const ProposalManagement: React.FC = () => {
  // Tabs: 0=Overview, 1=Past Proposal Library, 2=Browse Templates, 3=Calendar
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="bg-[#f4f6f9] min-h-screen p-6 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <ProposalTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-6" />
        {activeTab === 0 && (
          <>
            <StatCards />
            <ProposalTable />
          </>
        )}
        {activeTab === 1 && (
          <div className="mt-20 flex items-center justify-center text-lg text-gray-400">
            Past Proposal Library (To be implemented)
          </div>
        )}
        {activeTab === 2 && (
          <div className="mt-20 flex items-center justify-center text-lg text-gray-400">
            Browse Templates (To be implemented)
          </div>
        )}
        {activeTab === 3 && (
          <div className="mt-20 flex items-center justify-center text-lg text-gray-400">
            Calendar (To be implemented)
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalManagement;
