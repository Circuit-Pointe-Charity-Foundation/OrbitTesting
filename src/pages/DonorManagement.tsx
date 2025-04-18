import React from "react";
import FundingCycles from "@/components/donor-management/FundingCycles";
import DonorList from "@/components/donor-management/DonorList";

const DonorManagement: React.FC = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap"
      />
      <div className="max-w-[1120px] w-full bg-[#F5F7FA] mx-auto my-0 p-8 max-md:max-w-[991px] max-md:p-6 max-sm:max-w-screen-sm max-sm:p-4">
        <FundingCycles />
        <DonorList />
      </div>
    </>
  );
};

export default DonorManagement;
