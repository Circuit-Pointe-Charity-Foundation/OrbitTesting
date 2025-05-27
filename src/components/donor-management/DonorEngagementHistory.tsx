
import React from "react";
import { Button } from "@/components/ui/button";

interface DonorEngagementHistoryProps {
  engagementHistory: { date: string; message: string }[];
  onAddEngagement: () => void;
}

const DonorEngagementHistory: React.FC<DonorEngagementHistoryProps> = ({
  engagementHistory,
  onAddEngagement,
}) => (
  <div>
    <h3 className="font-bold mb-4">Engagement History</h3>
    <div className="space-y-4">
      {engagementHistory.map((entry, index) => (
        <div key={index} className="flex gap-2">
          <div className="min-w-[1px] bg-[#A273F2] mr-2" />
          <div>
            <p className="text-sm font-medium">{entry.date}</p>
            <p className="text-sm text-gray-600">{entry.message}</p>
          </div>
        </div>
      ))}
      <Button
        onClick={onAddEngagement}
        className="bg-[#A273F2] hover:bg-[#8b5cf6] mt-2"
      >
        Add Engagement Entry
      </Button>
    </div>
  </div>
);

export default DonorEngagementHistory;
