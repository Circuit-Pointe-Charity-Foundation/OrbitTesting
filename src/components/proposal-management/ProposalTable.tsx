import React, { useState, useCallback } from "react";
import { proposals as initialProposals, reviewers } from "./ProposalData";
import { Search } from "lucide-react";
import ProposalRowActions from "./ProposalRowActions";

const ProposalTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [proposals, setProposals] = useState(initialProposals);
  const [editName, setEditName] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState<string | null>(null);

  const handleReviewerChange = useCallback(
    (proposalName: string, reviewer: string) => {
      setProposals((prev) =>
        prev.map((p) => (p.name === proposalName ? { ...p, reviewer } : p))
      );
    },
    []
  );

  const handleDelete = useCallback((proposalName: string) => {
    setProposals((prev) => prev.filter((p) => p.name !== proposalName));
    setDeleteName(null); // Reset delete state after deletion
  }, []);

  const filtered = !search
    ? proposals
    : proposals.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );

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
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm"
            />
          </div>
          {/* Filter */}
          <button className="flex items-center gap-2 border border-gray-200 rounded px-4 py-2 bg-white hover:bg-gray-50 text-[15px] text-[#383839a6] font-medium">
            <span className="sr-only">Filter</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="#7c3aed"
              strokeWidth={2}
              viewBox="0 0 20 20"
            >
              <path d="M3 3h14M5 7h10M7 11h6M9 15h2" />
            </svg>
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
            {filtered.map((row) => (
              <tr
                key={row.name}
                className="border-b last:border-0 text-[#383839] text-sm relative"
              >
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
                    <span className="text-gray-300 ml-1 font-bold text-lg leading-none">
                      +
                    </span>
                  </div>
                </td>
                {/* Reviewer Dropdown */}
                <td className="py-3 pr-2">
                  <select
                    value={row.reviewer}
                    onChange={(e) =>
                      handleReviewerChange(row.name, e.target.value)
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
                  <ProposalRowActions
                    proposalName={row.name}
                    editName={editName}
                    setEditName={setEditName}
                    deleteName={deleteName}
                    setDeleteName={setDeleteName}
                    onDelete={handleDelete}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-gray-400">
            No proposals found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalTable;
