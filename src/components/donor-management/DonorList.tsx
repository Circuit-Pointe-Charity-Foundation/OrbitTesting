import React from "react";
import SearchBar from "../ui copy/SearchBar";
import ActionButton from "../ui copy/ActionButton";
import DonorTable from "./DonorTable";
import { PlusIcon } from "../icons/PlusIcon";
import { DocumentIcon } from "../icons/DocumentIcon";

const DonorList: React.FC = () => {
  return (
    <section className="bg-white p-6 rounded-[10px] max-md:p-4 max-sm:p-4">
      <h2 className="text-lg text-[#383839] mb-4 max-md:text-base max-sm:text-base">
        Donor List
      </h2>
      <div className="flex justify-between items-center mb-6 max-md:flex-col max-md:gap-4 max-sm:flex-col max-sm:gap-3">
        <SearchBar placeholder="Search for donors" />
        <div className="flex gap-4 max-md:flex-col max-md:gap-2 max-sm:flex-col max-sm:gap-2">
          <ActionButton icon={<PlusIcon />} text="New Donor" />
          <ActionButton icon={<DocumentIcon />} text="Create New Focus Areas" />
        </div>
      </div>
      <DonorTable />
    </section>
  );
};

export default DonorList;
