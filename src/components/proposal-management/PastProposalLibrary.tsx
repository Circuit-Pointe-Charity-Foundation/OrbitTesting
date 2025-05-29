
import React, { useState, useMemo } from "react";
import { Filter } from "lucide-react";
import SearchBar from "@/components/ui/SearchBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ProposalLibraryCard from "./ProposalLibraryCard";
import { sampleProposals, ProposalLibraryItem } from "./ProposalLibraryData";

const PastProposalLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [fileTypeFilter, setFileTypeFilter] = useState<string>("all");

  const fileTypes = useMemo(() => {
    const types = Array.from(new Set(sampleProposals.map(p => p.fileType)));
    return types;
  }, []);

  const filteredProposals = useMemo(() => {
    return sampleProposals.filter((proposal) => {
      const matchesSearch = 
        proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFileType = fileTypeFilter === "all" || proposal.fileType === fileTypeFilter;
      
      return matchesSearch && matchesFileType;
    });
  }, [searchTerm, fileTypeFilter]);

  const handleViewProposal = (proposal: ProposalLibraryItem) => {
    console.log("View proposal:", proposal);
    // TODO: Implement view proposal functionality
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFileTypeFilter("all");
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-[10px] shadow-lg p-10">
      {/* Header with Search and Filter */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Past Proposal Library</h2>
        
        <div className="flex items-center gap-4">
          <SearchBar
            placeholder="Search proposals..."
            onSearch={setSearchTerm}
          />
          
          <Select value={fileTypeFilter} onValueChange={setFileTypeFilter}>
            <SelectTrigger className="w-[140px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="File Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {fileTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {(searchTerm || fileTypeFilter !== "all") && (
            <Button variant="outline" onClick={clearFilters} className="text-sm">
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Showing {filteredProposals.length} of {sampleProposals.length} proposals
        </p>
      </div>

      {/* Proposals Grid */}
      {filteredProposals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 justify-items-center">
          {filteredProposals.map((proposal) => (
            <ProposalLibraryCard
              key={proposal.id}
              proposal={proposal}
              onViewProposal={handleViewProposal}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-gray-400 text-center">
            <p className="text-lg mb-2">No proposals found</p>
            <p className="text-sm">Try adjusting your search or filter criteria</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PastProposalLibrary;
