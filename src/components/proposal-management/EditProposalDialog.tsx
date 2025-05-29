
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
    <DialogContent className="max-w-[700px] w-[90vw] max-h-[90vh] p-8 bg-white text-black relative rounded-lg shadow-xl flex flex-col items-center fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
      {/* Close button absolute, top-right */}
      <button
        aria-label="Close"
        onClick={() => onOpenChange(false)}
        className="absolute right-4 top-4 text-gray-600 hover:text-black bg-white rounded-full p-1 transition-opacity z-10"
        type="button"
      >
        <X className="w-5 h-5" />
      </button>
      <DialogHeader className="w-full text-center">
        <DialogTitle className="text-xl font-semibold">Edit Proposal</DialogTitle>
      </DialogHeader>
      <div className="py-12 text-center text-gray-400 text-lg w-full">
        Placeholder for editing proposal "{proposalName}"
      </div>
    </DialogContent>
  </Dialog>
);

export default EditProposalDialog;
