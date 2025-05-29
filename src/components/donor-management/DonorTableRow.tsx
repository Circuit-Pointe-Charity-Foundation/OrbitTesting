
import React, { useState } from "react";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { Donor } from "@/types/donor";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import DonorDetailDialog from "./DonorDetailDialog";
import EditDonorDialog from "./EditDonorDialog";

interface DonorTableRowProps {
  donor: Donor;
  serialNumber: number;
}

const DonorTableRow: React.FC<DonorTableRowProps> = ({ donor, serialNumber }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleViewDetails = () => {
    setDetailDialogOpen(true);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditDialogOpen(true);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteDialogOpen(true);
  };

  return (
    <>
      <tr
        className="border-b border-[#E9E9E9] hover:bg-gray-50 cursor-pointer"
        onClick={handleViewDetails}
      >
        <td className="py-3 px-4 text-[#232323] table-cell">{serialNumber}.</td>
        <td className="py-3 px-4 text-[#232323] table-cell">{donor.name}</td>
        <td className="py-3 px-4 text-[#232323] table-cell">
          {donor.email || donor.contact}
        </td>
        <td className="py-3 px-4 text-[#232323] table-cell">
          {donor.lastDonation}
        </td>
        <td className="py-3 px-4 text-[#232323] table-cell">
          <div className="flex flex-wrap gap-1">
            {donor.interestTags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 badge-text rounded-sm"
                style={{
                  backgroundColor:
                    tag === "Health"
                      ? "#F9D2D2"
                      : tag === "Education"
                      ? "#D2E4F9"
                      : tag === "Environment"
                      ? "#D2F9E4"
                      : tag === "Gender"
                      ? "#F9D2E4"
                      : "#E4D2F9",
                }}
              >
                {tag}
              </span>
            ))}
            {donor.interestTags.length > 2 && (
              <span className="px-2 py-1 badge-text">
                +{donor.interestTags.length - 2}
              </span>
            )}
          </div>
        </td>
        <td className="py-3 px-4 table-cell">
          <div className="flex gap-2">
            <button onClick={handleEdit} aria-label="Edit donor">
              <EditIcon />
            </button>
            <button onClick={handleDelete} aria-label="Delete donor">
              <DeleteIcon />
            </button>
          </div>
        </td>
      </tr>

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        donorId={donor.id}
        donorName={donor.name}
      />

      <DonorDetailDialog
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        donorId={donor.id}
      />

      <EditDonorDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        donorId={donor.id}
      />
    </>
  );
};

export default DonorTableRow;
