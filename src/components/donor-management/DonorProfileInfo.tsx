
import React from "react";

interface DonorProfileInfoProps {
  donor: {
    email?: string;
    phone?: string;
    fundingPeriod?: {
      start: string;
      end: string;
    };
    interestTags: string[];
  }
}

const tagColors: Record<string, string> = {
  "Health": "#F9D2D2",
  "Education": "#D2E4F9",
  "Environment": "#D2F9E4",
  "Gender": "#F9D2E4"
};

const DonorProfileInfo: React.FC<DonorProfileInfoProps> = ({ donor }) => (
  <div>
    <h3 className="font-bold mb-4">Profile Info</h3>
    <div className="space-y-3 overflow-x-hidden">
      <div className="grid grid-cols-2 gap-2">
        <p className="text-gray-500">Email:</p>
        <p className="overflow-hidden text-ellipsis">{donor.email}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <p className="text-gray-500">Phone:</p>
        <p>{donor.phone}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <p className="text-gray-500">Funding Period:</p>
        <p>{donor.fundingPeriod?.start} - {donor.fundingPeriod?.end}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <p className="text-gray-500">Interest Tags:</p>
        <div className="flex flex-wrap gap-1">
          {donor.interestTags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-md bg-gray-100"
              style={{ backgroundColor: tagColors[tag] || "#E4D2F9" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default DonorProfileInfo;
