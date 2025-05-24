
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

  // Count completed for staff (Awarded or Declined in period)
  const metric = staff.map(s => {
    const completed = opportunities.filter(o =>
      o.assignedTo === s.name &&
      (o.status === "Awarded" || o.status === "Declined") &&
      (() => {
        const deadline = new Date(o.deadline);
        return deadline.getMonth() === month && deadline.getFullYear() === year;
      })()
    ).length;
    return { ...s, completed };
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
      <div className="space-y-4 flex-1">
        {metric.length === 0 && (
          <div className="text-sm text-gray-500 text-center">No staff to show.</div>
        )}
        {metric.map(s => (
          <div key={s.name} className="flex items-center justify-between">
            <div>
              <span className="font-medium">{s.name}</span>
              <span className="ml-2 text-xs text-gray-500">({s.title})</span>
            </div>
            <div className="w-28 bg-gray-100 rounded h-3 mx-2 overflow-hidden">
              <div
                className="bg-violet-500 h-3"
                style={{ width: `${s.completed * 34}%` }}
              />
            </div>
            <div className="font-semibold text-sm">{s.completed}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default OpportunitiesByStaffCard;
