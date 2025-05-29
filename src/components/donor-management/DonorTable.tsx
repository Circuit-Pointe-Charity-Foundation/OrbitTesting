
import React from "react";
import DonorTableRow from "./DonorTableRow";
import { Donor } from "@/types/donor";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface DonorTableProps {
  donors: Donor[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const DonorTable: React.FC<DonorTableProps> = ({ 
  donors, 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E9E9E9]">
              <th className="py-3 px-4 text-left table-header text-black">SL No</th>
              <th className="py-3 px-4 text-left table-header text-black">Donor Name</th>
              <th className="py-3 px-4 text-left table-header text-black">Contact Info</th>
              <th className="py-3 px-4 text-left table-header text-black">Last Donation</th>
              <th className="py-3 px-4 text-left table-header text-black">Interest Tags</th>
              <th className="py-3 px-4 text-left table-header text-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor, index) => (
              <DonorTableRow 
                key={donor.id} 
                donor={donor} 
                serialNumber={(currentPage - 1) * 10 + index + 1}
              />
            ))}
          </tbody>
        </table>
        {donors.length === 0 && (
          <div className="text-center py-8 text-gray-500 body-text">
            No donors found matching your search criteria.
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => onPageChange(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default DonorTable;
