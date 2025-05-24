
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Opportunity } from "@/types/opportunity";
import { StaffMember } from "../staffData";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface OpportunitiesByStaffDialogProps {
  isOpen: boolean;
  onClose: () => void;
  opportunities: Opportunity[];
  staffData: StaffMember[];
  month: number;
  year: number;
  setMonth: (n: number) => void;
  setYear: (n: number) => void;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const OpportunitiesByStaffDialog: React.FC<OpportunitiesByStaffDialogProps> = ({
  isOpen,
  onClose,
  opportunities,
  staffData,
  month,
  year,
  setMonth,
  setYear
}) => {
  // Staff metric (all staff)
  const metric = staffData.map((s) => {
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

  const handleMonthChange = (inc: number) => {
    let m = month + inc;
    let y = year;
    if (m > 11) { m = 0; y++; }
    else if (m < 0) { m = 11; y--; }
    setMonth(m);
    setYear(y);
  };

  return (
    <Dialog open={isOpen} onOpenChange={v => { if (!v) onClose(); }}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Opportunities by Staff</DialogTitle>
        </DialogHeader>
        {/* Month/Year Controls */}
        <div className="mb-3 flex gap-2 items-center">
          <div className="text-sm font-medium">Month/Year:</div>
          <button onClick={() => handleMonthChange(-1)} className="hover:bg-accent p-1 rounded">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="bg-gray-100 rounded px-2 py-1 text-xs">
            {MONTHS[month]} {year}
          </span>
          <button onClick={() => handleMonthChange(1)} className="hover:bg-accent p-1 rounded">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-5 max-h-72 overflow-y-auto">
          {metric.map((s) => (
            <div key={s.name} className="w-full">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{s.name}</span>
                <span className="text-sm font-semibold text-gray-700">{s.completed}/{s.total} completed opportunities</span>
              </div>
              <div className="w-full bg-gray-100 rounded h-2 overflow-hidden">
                <div
                  className="bg-violet-500 h-2 rounded"
                  style={{
                    width: s.total > 0 ? `${Math.round((s.completed / s.total) * 100)}%` : "0%",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="pt-4">
          <Button
            variant="outline"
            onClick={() => {
              alert("Download not implemented in demo");
            }}
            className="mt-2"
          >
            Download Report (PDF)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpportunitiesByStaffDialog;
