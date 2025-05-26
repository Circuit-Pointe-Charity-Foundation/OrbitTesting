
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
    <DialogContent className="max-w-[700px] w-full p-8">
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
