import React, { useState } from "react";
import SearchBar from "../ui/SearchBar";
import ActionButton from "../ui/ActionButton";
import DonorTable from "./DonorTable";
import { PlusIcon } from "../icons/PlusIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import AddDonorDialog from "./AddDonorDialog";
import FocusAreaDialog from "./FocusAreaDialog";
import { donorData } from "@/data/donorData";

const DonorList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addDonorOpen, setAddDonorOpen] = useState(false);
  const [focusAreaOpen, setFocusAreaOpen] = useState(false);

  // Filter donors based on search term
  const filteredDonors = donorData.filter(
    (donor) =>
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.interestTags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <>
      <section className="bg-white p-6 rounded-[10px] max-md:p-4 max-sm:p-4">
        <h2 className="text-lg font-bold text-[#383839] mb-4 max-md:text-base max-sm:text-base">
          Donor List
        </h2>
        <div className="flex justify-between items-center mb-6 max-md:flex-col max-md:gap-4 max-sm:flex-col max-sm:gap-3">
          <SearchBar placeholder="Search for donors" onSearch={handleSearch} />
          <div className="flex gap-4 max-md:flex-col max-md:gap-2 max-sm:flex-col max-sm:gap-2">
            <ActionButton
              icon={<PlusIcon />}
              text="New Donor"
              onClick={() => setAddDonorOpen(true)}
            />
            <ActionButton
              icon={<DocumentIcon />}
              text="Create New Focus Areas"
              onClick={() => setFocusAreaOpen(true)}
            />
          </div>
        </div>
        <DonorTable donors={filteredDonors} />
      </section>

      <AddDonorDialog open={addDonorOpen} onOpenChange={setAddDonorOpen} />

      <FocusAreaDialog open={focusAreaOpen} onOpenChange={setFocusAreaOpen} />
    </>
  );
};

export default DonorList;
