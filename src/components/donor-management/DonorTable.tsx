
import React from "react";
import DonorTableRow from "./DonorTableRow";
import { Donor } from "@/types/donor";

interface DonorTableProps {
  donors: Donor[];
}

const DonorTable: React.FC<DonorTableProps> = ({ donors }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#E9E9E9]">
            <th className="py-3 px-4 text-left text-base text-[#A273F2] font-medium">SL No</th>
            <th className="py-3 px-4 text-left text-base text-[#A273F2] font-medium">Donor Name</th>
            <th className="py-3 px-4 text-left text-base text-[#A273F2] font-medium">Contact Info</th>
            <th className="py-3 px-4 text-left text-base text-[#A273F2] font-medium">Last Donation</th>
            <th className="py-3 px-4 text-left text-base text-[#A273F2] font-medium">Interest Tags</th>
            <th className="py-3 px-4 text-left text-base text-[#A273F2] font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((donor) => (
            <DonorTableRow key={donor.id} donor={donor} />
          ))}
        </tbody>
      </table>
      
      {donors.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No donors found matching your search criteria.
        </div>
      )}
    </div>
  );
};

export default DonorTable;
