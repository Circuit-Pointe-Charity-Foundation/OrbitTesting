
import React, { useState } from "react";
import ActionButton from "../ui/ActionButton";
import DonorTable from "./DonorTable";
import { UserPlus, FileText } from "lucide-react";
import AddDonorDialog from "./AddDonorDialog";
import FocusAreaDialog from "./FocusAreaDialog";
import DonorListDialog from "./DonorListDialog";
import { donorData } from "@/data/donorData";

const DonorList: React.FC = () => {
  const [addDonorOpen, setAddDonorOpen] = useState(false);
  const [focusAreaOpen, setFocusAreaOpen] = useState(false);
  const [donorListDialogOpen, setDonorListDialogOpen] = useState(false);

  // Show only first 5 donors
  const displayedDonors = donorData.slice(0, 5);

  return (
    <>
      {/* Black-and-white themed panel */}
      <section className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-black">Donor List</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <ActionButton
              icon={<FileText className="h-4 w-4" />}
              text="Create Focus Areas"
              onClick={() => setFocusAreaOpen(true)}
              className="bg-white text-black border border-black hover:bg-gray-50"
            />
            <ActionButton
              icon={<UserPlus className="h-4 w-4" />}
              text="New Donor"
              onClick={() => setAddDonorOpen(true)}
              className="bg-black text-white hover:bg-gray-900 border-none"
            />
          </div>
        </div>
        
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
                </tr>
              </thead>
              <tbody>
                {displayedDonors.map((donor, index) => (
                  <tr key={donor.id} className="border-b border-[#E9E9E9] hover:bg-gray-50">
                    <td className="py-3 px-4 text-[#232323] table-cell">{index + 1}.</td>
                    <td className="py-3 px-4 text-[#232323] table-cell">{donor.name}</td>
                    <td className="py-3 px-4 text-[#232323] table-cell">
                      {donor.email || donor.contact}
                    </td>
                    <td className="py-3 px-4 text-[#232323] table-cell">
                      {donor.lastDonation}
                    </td>
                    <td className="py-3 px-4 text-[#232323] table-cell">
                      <div className="flex flex-wrap gap-1">
                        {donor.interestTags.slice(0, 2).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={() => setDonorListDialogOpen(true)}
              className="text-black hover:text-gray-600 font-medium underline"
            >
              View All
            </button>
          </div>
        </div>
      </section>

      <AddDonorDialog open={addDonorOpen} onOpenChange={setAddDonorOpen} />
      <FocusAreaDialog open={focusAreaOpen} onOpenChange={setFocusAreaOpen} />
      <DonorListDialog open={donorListDialogOpen} onOpenChange={setDonorListDialogOpen} />
    </>
  );
};

export default DonorList;
