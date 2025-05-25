
import React, { useState } from "react";
import { proposals as initialProposals, reviewers } from "./ProposalData";
import { Search, Edit, Trash2, MoreVertical } from "lucide-react";
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

const ProposalTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [proposals, setProposals] = useState(initialProposals);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);

  // For reviewer dropdown state per proposal
  const handleReviewerChange = (idx: number, reviewer: string) => {
    const updated = proposals.map((p, i) =>
      i === idx ? { ...p, reviewer } : p
    );
    setProposals(updated);
  };

  const filtered = !search
    ? proposals
    : proposals.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );

  // Filtered index to absolute proposals index
  const getAbsoluteIdx = (filteredIdx: number) => {
    const searched = !search
      ? proposals
      : proposals.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        );
    const name = searched[filteredIdx].name;
    return proposals.findIndex((p) => p.name === name);
  };

  return (
    <div className="bg-white mt-12 pt-8 pb-4 px-6 rounded-[5px] shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-lg font-medium text-[#383839] mb-3 md:mb-0">
          Proposals Under Development
        </div>
        <div className="flex gap-4">
          {/* Search */}
          <div className="flex items-center gap-2 bg-[#f4f6f9] border border-gray-200 rounded px-3 py-2">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              placeholder="Search proposal"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm"
            />
          </div>
          {/* Filter */}
          <button className="flex items-center gap-2 border border-gray-200 rounded px-4 py-2 bg-white hover:bg-gray-50 text-[15px] text-[#383839a6] font-medium">
            <span className="sr-only">Filter</span>
            <svg className="w-5 h-5" fill="none" stroke="#7c3aed" strokeWidth={2} viewBox="0 0 20 20"><path d="M3 3h14M5 7h10M7 11h6M9 15h2" /></svg>
            Filter
          </button>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto mt-7">
        <table className="min-w-full whitespace-nowrap">
          <thead>
            <tr className="text-[#a172f2] text-base">
              <th className="font-medium text-left py-2 pr-2">Proposal Name</th>
              <th className="font-medium text-left py-2 pr-2">Due Date</th>
              <th className="font-medium text-left py-2 pr-2">Team Members</th>
              <th className="font-medium text-left py-2 pr-2">Reviewer</th>
              <th className="font-medium text-left py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, idx) => (
              <tr key={idx} className="border-b last:border-0 text-[#383839] text-sm relative">
                <td className="py-3 pr-2">{row.name}</td>
                <td className="py-3 pr-2">{row.dueDate}</td>
                <td className="py-3 pr-2">
                  <div className="flex items-center gap-0.5">
                    {row.team.map((m, ix) =>
                      m.img ? (
                        <img
                          key={ix}
                          src={m.img}
                          alt={m.label}
                          className="w-6 h-6 rounded-full border-2 border-white -ml-2 first:ml-0 last:mr-1 object-cover"
                        />
                      ) : (
                        <div
                          key={ix}
                          className={`${m.bg} text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full border-2 border-white -ml-2 first:ml-0 last:mr-1`}
                        >
                          {m.label}
                        </div>
                      )
                    )}
                    <span className="text-gray-300 ml-1 font-bold text-lg leading-none">+</span>
                  </div>
                </td>
                {/* Reviewer Dropdown */}
                <td className="py-3 pr-2">
                  <select
                    value={row.reviewer}
                    onChange={e =>
                      handleReviewerChange(getAbsoluteIdx(idx), e.target.value)
                    }
                    className="px-2 py-1 border rounded text-sm bg-gray-50"
                  >
                    {reviewers.map((rev, ridx) => (
                      <option value={rev} key={ridx}>
                        {rev}
                      </option>
                    ))}
                  </select>
                </td>
                {/* Action Dropdown */}
                <td className="py-3 pr-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="hover:bg-gray-100 rounded-full p-2 focus:outline-none focus:ring">
                        <MoreVertical className="w-6 h-6 text-[#8a8a91]" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="z-50 bg-white">
                      <DropdownMenuItem
                        onSelect={() => setEditIdx(getAbsoluteIdx(idx))}
                        className="gap-2 cursor-pointer"
                      >
                        <Edit className="w-4 h-4 text-violet-600" />
                        Edit
                      </DropdownMenuItem>
                      <AlertDialog open={deleteIdx === getAbsoluteIdx(idx)} onOpenChange={open => setDeleteIdx(open ? getAbsoluteIdx(idx) : null)}>
                        <AlertDialogTrigger asChild>
                          <button
                            className="flex items-center gap-2 w-full px-2 py-1.5 text-sm hover:bg-gray-100 text-red-700"
                            onClick={e => {
                              e.preventDefault();
                              setDeleteIdx(getAbsoluteIdx(idx));
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
                            <AlertDialogCancel onClick={() => setDeleteIdx(null)}>
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600 hover:bg-red-700"
                              onClick={() => {
                                setProposals(prev =>
                                  prev.filter((_, i) => i !== getAbsoluteIdx(idx))
                                );
                                setDeleteIdx(null);
                              }}
                            >
                              Yes, Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {/* Edit Dialog */}
                  <EditProposalDialog
                    open={editIdx === getAbsoluteIdx(idx)}
                    onOpenChange={open => setEditIdx(open ? getAbsoluteIdx(idx) : null)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-gray-400">No proposals found.</div>
        )}
      </div>
    </div>
  );
};

export default ProposalTable;
