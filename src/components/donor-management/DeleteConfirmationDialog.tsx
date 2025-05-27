
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DeleteConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  donorId: string;
  donorName: string;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  onOpenChange,
  donorId,
  donorName,
}) => {
  const { toast } = useToast();

  const handleDelete = () => {
    toast({
      title: "Donor deleted",
      description: `${donorName} has been removed from the system`,
    });
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white text-black relative max-w-md p-8 rounded-lg shadow-xl flex flex-col items-center">
        {/* Close button absolutely positioned in top-right */}
        <button
          aria-label="Close"
          onClick={() => onOpenChange(false)}
          className="absolute right-3 top-3 text-gray-600 hover:text-black bg-white rounded-full p-1 transition-opacity"
          type="button"
        >
          <X className="w-5 h-5" />
        </button>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold text-center">
            Are you sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-700 text-center mt-2">
            This will permanently delete {donorName} (ID: {donorId}) and all associated
            data from the system. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center gap-2 mt-6">
          <AlertDialogCancel aria-label="Close" className="min-w-[100px]">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white min-w-[120px]"
          >
            Yes, delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationDialog;
