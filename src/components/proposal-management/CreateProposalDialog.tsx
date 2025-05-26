
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CreateProposalDialog: React.FC<Props> = ({ open, onOpenChange }) => (
  <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent
      side="right"
      className="!w-[70vw] max-w-[70vw] animate-slide-in-right data-[state=closed]:animate-slide-out-right"
    >
      <SheetHeader>
        <SheetTitle>Create New Proposal</SheetTitle>
      </SheetHeader>
      <div className="py-12 text-center text-gray-400 text-lg">
        Placeholder for proposal creation form/wireframe.
      </div>
    </SheetContent>
  </Sheet>
);

export default CreateProposalDialog;
