
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proposalName?: string;
};

const EditProposalDialog: React.FC<Props> = ({ open, onOpenChange, proposalName }) => (
  <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent
      side="right"
      className="!w-[85vw] max-w-[1200px] animate-slide-in-right data-[state=closed]:animate-slide-out-right"
    >
      <SheetHeader>
        <SheetTitle>Edit Proposal</SheetTitle>
      </SheetHeader>
      <div className="py-12 text-center text-gray-400 text-lg">
        Placeholder for editing proposal "{proposalName}"
      </div>
    </SheetContent>
  </Sheet>
);

export default EditProposalDialog;
