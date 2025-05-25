
import React from "react";
import { Edit, Trash2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EditProposalDialog from "./EditProposalDialog";

type Props = {
  proposalName: string;
  editName: string | null;
  setEditName: (name: string | null) => void;
  deleteName: string | null;
  setDeleteName: (name: string | null) => void;
  onDelete: (name: string) => void;
};

const ProposalRowActions: React.FC<Props> = ({
  proposalName,
  editName,
  setEditName,
  deleteName,
  setDeleteName,
  onDelete,
}) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="hover:bg-gray-100 rounded-full p-2 focus:outline-none focus:ring">
            <MoreVertical className="w-6 h-6 text-[#8a8a91]" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="z-50 bg-white">
          <DropdownMenuItem
            onClick={() => setEditName(proposalName)}
            className="gap-2 cursor-pointer"
          >
            <Edit className="w-4 h-4 text-violet-600" />
            Edit
          </DropdownMenuItem>
          <AlertDialog open={deleteName === proposalName} onOpenChange={open => setDeleteName(open ? proposalName : null)}>
            <AlertDialogTrigger asChild>
              <button
                className="flex items-center gap-2 w-full px-2 py-1.5 text-sm hover:bg-gray-100 text-red-700"
                onClick={e => {
                  e.preventDefault();
                  setDeleteName(proposalName);
                }}
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Proposal</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you absolutely sure? This cannot be undone. This proposal will be permanently deleted from the Proposals Under Development.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setDeleteName(null)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => onDelete(proposalName)}
                >
                  Yes, Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditProposalDialog
        open={editName === proposalName}
        onOpenChange={open => setEditName(open ? proposalName : null)}
      />
    </>
  );
};

export default ProposalRowActions;
