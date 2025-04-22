
import React from "react";
import FundingCycles from "@/components/donor-management/FundingCycles";
import DonorList from "@/components/donor-management/DonorList";

const DonorManagement: React.FC = () => {
  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <FundingCycles />
      <DonorList />
    </div>
  );
};

export default DonorManagement;
