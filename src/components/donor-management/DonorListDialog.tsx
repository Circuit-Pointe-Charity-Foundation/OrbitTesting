
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SearchBar from "../ui/SearchBar";
import DonorTable from "./DonorTable";
import { donorData } from "@/data/donorData";

interface DonorListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DonorListDialog: React.FC<DonorListDialogProps> = ({ open, onOpenChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredDonors = donorData.filter(
    (donor) =>
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.interestTags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredDonors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDonors = filteredDonors.slice(startIndex, endIndex);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-black">All Donors</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <SearchBar 
            placeholder="Search donors by name, contact, or tags" 
            onSearch={handleSearch} 
          />
          
          <DonorTable 
            donors={currentDonors} 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonorListDialog;
