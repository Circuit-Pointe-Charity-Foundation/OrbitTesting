
import React from "react";
import { Card } from "@/components/ui/card";
import { Opportunity } from "@/types/opportunity";
import { StaffMember } from "../staffData";

interface OpportunitiesByStaffCardProps {
  opportunities: Opportunity[];
  staffData: StaffMember[];
  month: number;
  year: number;
  onViewAll: () => void;
}

const OpportunitiesByStaffCard: React.FC<OpportunitiesByStaffCardProps> = ({
  opportunities, staffData, month, year, onViewAll
}) => {
  // Filter out NGO Manager
  const staff = staffData.filter(s => s.title !== "NGO Manager");

  // Count completed, total assigned
  const metric = staff.map(s => {
    const assigned = opportunities.filter(o =>
      o.assignedTo === s.name &&
      (() => {
        const deadline = new Date(o.deadline);
        return deadline.getMonth() === month && deadline.getFullYear() === year;
      })()
    );
    const completed = assigned.filter(o => o.status === "Awarded" || o.status === "Declined").length;
    const total = assigned.length;
    return { ...s, completed, total };
  });

  return (
    <Card className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <span className="font-semibold">Opportunities by Staff</span>
        <button
          className="text-violet-600 text-sm underline hover:font-semibold"
          onClick={onViewAll}
        >
          View All
        </button>
      </div>
      <div className="space-y-6 flex-1">
        {metric.length === 0 && (
          <div className="text-sm text-gray-500 text-center">No staff to show.</div>
        )}
        {metric.map(s => (
          <div key={s.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium">{s.name}</span>
              <span className="text-sm font-semibold text-gray-700">{s.completed}/{s.total} completed opportunities</span>
            </div>
            <div className="w-full bg-gray-100 rounded h-2 overflow-hidden">
              <div
                className="bg-violet-500 h-2 rounded"
                style={{ width: s.total > 0 ? `${Math.round((s.completed/s.total)*100)}%` : "0%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default OpportunitiesByStaffCard;
