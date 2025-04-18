import React from "react";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon";

interface DonorProps {
  donor: {
    id: string;
    name: string;
    contact: string;
    lastDonation: string;
    interestTags: string;
  };
}

const DonorTableRow: React.FC<DonorProps> = ({ donor }) => {
  const handleEdit = () => {
    console.log(`Edit donor with ID: ${donor.id}`);
  };

  const handleDelete = () => {
    console.log(`Delete donor with ID: ${donor.id}`);
  };

  return (
    <div className="flex justify-between px-0 py-3 border-b-[#E9E9E9] border-b border-solid max-md:flex-col max-md:items-start max-sm:flex-col max-sm:items-start">
      <div className="text-base text-[#232323] max-md:text-sm max-sm:text-sm">
        {donor.id}.
      </div>
      <div className="text-base text-[#232323] max-md:text-sm max-sm:text-sm">
        {donor.name}
      </div>
      <div className="text-base text-[#232323] max-md:text-sm max-sm:text-sm">
        {donor.contact}
      </div>
      <div className="text-base text-[#232323] max-md:text-sm max-sm:text-sm">
        {donor.lastDonation}
      </div>
      <div className="text-base text-[#232323] max-md:text-sm max-sm:text-sm">
        {donor.interestTags}
      </div>
      <div className="text-base text-[#232323] max-md:text-sm max-sm:text-sm flex gap-2">
        <button onClick={handleEdit} aria-label="Edit donor">
          <EditIcon />
        </button>
        <button onClick={handleDelete} aria-label="Delete donor">
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default DonorTableRow;
