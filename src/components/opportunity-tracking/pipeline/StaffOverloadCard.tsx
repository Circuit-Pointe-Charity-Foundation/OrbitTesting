
import React from "react";
import { Card } from "@/components/ui/card";
import { Opportunity } from "@/types/opportunity";
import { StaffMember } from "../staffData";

interface StaffOverloadCardProps {
  opportunities: Opportunity[];
  staffData: StaffMember[];
  month: number;
  year: number;
}

const StaffOverloadCard: React.FC<StaffOverloadCardProps> = ({
  opportunities, staffData, month, year
}) => {
  // Filter out NGO Manager
  const staff = staffData.filter(s => s.title !== "NGO Manager");

  const overload = staff.map(s => {
    const outstanding = opportunities.filter(o =>
      o.assignedTo === s.name &&
      (o.status === "To Review" || o.status === "In Progress" || o.status === "Submitted") &&
      (() => {
        const deadline = new Date(o.deadline);
        return deadline.getMonth() === month && deadline.getFullYear() === year;
      })()
    ).length;
    return { ...s, outstanding };
  });

  return (
    <Card className="p-6 h-full flex flex-col">
      <div className="font-semibold mb-4">Staff Overloaded</div>
      <div className="space-y-4 flex-1">
        {overload.length === 0 && (
          <div className="text-sm text-gray-500 text-center">No staff to show.</div>
        )}
        {overload.map(s => (
          <div key={s.name} className="flex items-center justify-between">
            <div>
              <span className="font-medium">{s.name}</span>
              <span className="ml-2 text-xs text-gray-500">({s.title})</span>
            </div>
            <div className="font-bold">{s.outstanding}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default StaffOverloadCard;
