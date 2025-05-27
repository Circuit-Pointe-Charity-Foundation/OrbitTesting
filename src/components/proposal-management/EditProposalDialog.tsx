
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

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
    <DialogContent className="max-w-[700px] w-full p-8 bg-white text-black relative rounded-lg shadow-xl flex flex-col items-center">
      {/* Close button absolute, top-right */}
      <button
        aria-label="Close"
        onClick={() => onOpenChange(false)}
        className="absolute right-4 top-4 text-gray-600 hover:text-black bg-white rounded-full p-1 transition-opacity"
        type="button"
      >
        <X className="w-5 h-5" />
      </button>
      <DialogHeader>
        <DialogTitle>Edit Proposal</DialogTitle>
      </DialogHeader>
      <div className="py-12 text-center text-gray-400 text-lg">
        Placeholder for editing proposal "{proposalName}"
      </div>
    </DialogContent>
  </Dialog>
);

export default EditProposalDialog;
