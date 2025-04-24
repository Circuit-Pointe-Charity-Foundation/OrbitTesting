
import React from "react";
import Header from "@/components/donor-management/Header";
import { DonorTable } from "@/components/donor-management/DonorTable";

const DonorManagement: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      <Header />
      <DonorTable />
    </div>
  );
};

export default DonorManagement;
