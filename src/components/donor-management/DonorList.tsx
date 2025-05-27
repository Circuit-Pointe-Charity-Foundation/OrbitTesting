
import React, { useState } from "react";
import SearchBar from "../ui/SearchBar";
import ActionButton from "../ui/ActionButton";
import DonorTable from "./DonorTable";
import { UserPlus, FileText } from "lucide-react";
import AddDonorDialog from "./AddDonorDialog";
import FocusAreaDialog from "./FocusAreaDialog";
import { donorData } from "@/data/donorData";

const DonorList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addDonorOpen, setAddDonorOpen] = useState(false);
  const [focusAreaOpen, setFocusAreaOpen] = useState(false);

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
      {/* Black-and-white themed panel */}
      <section className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-black mb-6">Donor List</h2>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <SearchBar placeholder="Search donors by name, contact, or tags" onSearch={handleSearch} />
          <div className="flex flex-col sm:flex-row gap-3">
            <ActionButton
              icon={<UserPlus className="h-4 w-4" />}
              text="New Donor"
              variant="primary"
              onClick={() => setAddDonorOpen(true)}
              className="bg-black text-white hover:bg-gray-900 border-none"
            />
            <ActionButton
              icon={<FileText className="h-4 w-4" />}
              text="Create Focus Areas"
              onClick={() => setFocusAreaOpen(true)}
              className="bg-white text-black border border-black hover:bg-gray-50"
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
