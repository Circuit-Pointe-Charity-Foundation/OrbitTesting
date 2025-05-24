
import React from "react";
import { Card } from "@/components/ui/card";
import { Opportunity } from "@/types/opportunity";
import { StaffMember } from "../staffData";
import { AlertCircle } from "lucide-react";

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

  // Calculate per staff: total assigned, completed, overloads
  const overloads = staff
    .map(s => {
      const assigned = opportunities.filter(o =>
        o.assignedTo === s.name &&
        (() => {
          const deadline = new Date(o.deadline);
          return deadline.getMonth() === month && deadline.getFullYear() === year;
        })()
      );
      const completed = assigned.filter(o => o.status === "Awarded" || o.status === "Declined").length;
      const outstanding = assigned.length - completed;
      return { ...s, outstanding };
    })
    .filter(s => s.outstanding > 0); // Only show staff with overload >0

  return (
    <Card className="p-6 h-full flex flex-col">
      <div className="font-semibold mb-4">Staff Overloaded</div>
      <div className="space-y-4 flex-1">
        {overloads.length === 0 && (
          <div className="text-sm text-gray-500 text-center">No overloaded staff for this period.</div>
        )}
        {overloads.map(s => (
          <div key={s.name} className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <AlertCircle className="text-red-500 w-4 h-4 mr-1" />
              <span className="font-medium">{s.name}</span>
              <span className="ml-1 text-xs text-gray-500">({s.title})</span>
            </div>
            <div className="font-bold text-red-600">{s.outstanding}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default StaffOverloadCard;
