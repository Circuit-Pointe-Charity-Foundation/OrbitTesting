
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Opportunity } from "@/types/opportunity";
import { StaffMember } from "../staffData";

interface OpportunitiesByStaffDialogProps {
  isOpen: boolean;
  onClose: () => void;
  opportunities: Opportunity[];
  staffData: StaffMember[];
  month: number;
  year: number;
}

const OpportunitiesByStaffDialog: React.FC<OpportunitiesByStaffDialogProps> = ({
  isOpen,
  onClose,
  opportunities,
  staffData,
  month,
  year,
}) => {
  // Staff metric (all staff)
  const metric = staffData.map((s) => {
    const completed = opportunities.filter(
      (o) =>
        o.assignedTo === s.name &&
        (o.status === "Awarded" || o.status === "Declined") &&
        (() => {
          const deadline = new Date(o.deadline);
          return (
            deadline.getMonth() === month && deadline.getFullYear() === year
          );
        })()
    ).length;
    const total = opportunities.filter(
      (o) =>
        o.assignedTo === s.name &&
        (() => {
          const deadline = new Date(o.deadline);
          return (
            deadline.getMonth() === month && deadline.getFullYear() === year
          );
        })()
    ).length;
    return { ...s, completed, total };
  });

  return (
    <Dialog open={isOpen} onOpenChange={v => { if (!v) onClose(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Opportunities by Staff</DialogTitle>
        </DialogHeader>
        <div className="mb-2 flex gap-2 items-center">
          <div className="text-sm font-medium">Month/Year:</div>
          <span className="bg-gray-100 rounded px-2 py-1 text-xs">
            {new Date(year, month, 1).toLocaleString("default", { month: "long" })} {year}
          </span>
        </div>
        <div className="space-y-3 max-h-72 overflow-y-auto">
          {metric.map((s) => (
            <div key={s.name} className="flex items-center justify-between">
              <div>
                <span className="font-medium">{s.name}</span>
                <span className="ml-2 text-xs text-gray-500">({s.title})</span>
              </div>
              <div className="w-32 bg-gray-100 rounded h-3 mx-2 overflow-hidden">
                <div
                  className="bg-violet-500 h-3"
                  style={{
                    width:
                      s.total > 0
                        ? `${Math.min((s.completed / s.total) * 100, 100)}%`
                        : "0%",
                  }}
                />
              </div>
              <div className="text-sm font-semibold">{s.completed}/{s.total}</div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              alert("Download not implemented in demo");
            }}
            className="mt-2"
          >
            Download Report (PDF)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OpportunitiesByStaffDialog;
