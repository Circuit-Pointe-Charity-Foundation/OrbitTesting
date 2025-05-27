
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proposalName?: string;
};

const EditProposalDialog: React.FC<Props> = ({
  open,
  onOpenChange,
  proposalName,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-[700px] w-full p-8 bg-white text-black relative">
      <DialogHeader>
        <DialogTitle>Edit Proposal</DialogTitle>
        <DialogClose aria-label="Close" className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogHeader>
      <div className="py-12 text-center text-gray-400 text-lg">
        Placeholder for editing proposal "{proposalName}"
      </div>
    </DialogContent>
  </Dialog>
);

export default EditProposalDialog;
