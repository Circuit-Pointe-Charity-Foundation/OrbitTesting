import React from "react";
import DonorTableRow from "./DonorTableRow";

const DonorTable: React.FC = () => {
  const donors = [
    {
      id: "01",
      name: "Lorem Ipsum",
      contact: "LoremIpsum@gmail.com",
      lastDonation: "Jan. 26th",
      interestTags: "Education",
    },
    {
      id: "02",
      name: "Lorem Ipsum",
      contact: "LoremIpsum@gmail.com",
      lastDonation: "Jan. 26th",
      interestTags: "Education",
    },
    {
      id: "03",
      name: "Lorem Ipsum",
      contact: "LoremIpsum@gmail.com",
      lastDonation: "Jan. 26th",
      interestTags: "Education",
    },
    {
      id: "04",
      name: "Lorem Ipsum",
      contact: "LoremIpsum@gmail.com",
      lastDonation: "Jan. 26th",
      interestTags: "Education",
    },
    {
      id: "05",
      name: "Lorem Ipsum",
      contact: "LoremIpsum@gmail.com",
      lastDonation: "Jan. 26th",
      interestTags: "Education",
    },
  ];

  return (
    <div className="table w-full">
      <div className="flex justify-between px-0 py-3 border-b-[#E9E9E9] border-b border-solid max-md:flex-col max-md:items-start max-sm:flex-col max-sm:items-start">
        <div className="text-base text-[#A273F2] max-md:text-sm max-sm:text-sm">
          SL No
        </div>
        <div className="text-base text-[#A273F2] max-md:text-sm max-sm:text-sm">
          Donor Name
        </div>
        <div className="text-base text-[#A273F2] max-md:text-sm max-sm:text-sm">
          Contact Info
        </div>
        <div className="text-base text-[#A273F2] max-md:text-sm max-sm:text-sm">
          Last Donation
        </div>
        <div className="text-base text-[#A273F2] max-md:text-sm max-sm:text-sm">
          Interest Tags
        </div>
        <div className="text-base text-[#A273F2] max-md:text-sm max-sm:text-sm">
          Action
        </div>
      </div>
      {donors.map((donor) => (
        <DonorTableRow key={donor.id} donor={donor} />
      ))}
    </div>
  );
};

export default DonorTable;
