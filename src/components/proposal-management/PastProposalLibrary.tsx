
import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProposalLibraryCard from "./ProposalLibraryCard";

interface Proposal {
  title: string;
  description: string;
  fileType: string;
  uses: number;
  imageSrc: string;
  rating?: number;
}

const sampleProposals: Proposal[] = [
  {
    title: "Empower Change: A Fundraising Proposal",
    description: "Hey there! Have you ever thought about exploring new horizons together?",
    fileType: "Word",
    uses: 742,
    imageSrc: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
    rating: 5,
  },
  {
    title: "Together We Rise: Community Support Initiative",
    description: "Imagine the possibilities if we teamed up on this project!",
    fileType: "PowerPoint",
    uses: 1256,
    imageSrc: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
    rating: 5,
  },
  {
    title: "Seeds of Hope: A Green Fundraising Campaign",
    description: "What if we joined forces to create something truly amazing?",
    fileType: "Word",
    uses: 934,
    imageSrc: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    rating: 5,
  },
  {
    title: "Building Futures: Education Fundraising Proposal",
    description: "Let's brainstorm some exciting ideas that could transform our community.",
    fileType: "Word",
    uses: 389,
    imageSrc: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
    rating: 5,
  },
  {
    title: "Hearts United: A Charitable Giving Proposal",
    description: "How about we collaborate and bring innovative solutions to life?",
    fileType: "PowerPoint",
    uses: 1024,
    imageSrc: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
    rating: 5,
  },
  {
    title: "Voices for Change: Advocacy Fundraising Proposal",
    description: "I have a vision that I think we could turn into reality together.",
    fileType: "Word",
    uses: 562,
    imageSrc: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    rating: 5,
  },
];

const PastProposalLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [fileTypeFilter, setFileTypeFilter] = useState("all");

  const filteredProposals = sampleProposals.filter((proposal) => {
    const matchesSearch = 
      proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFileType = 
      fileTypeFilter === "all" || proposal.fileType === fileTypeFilter;
    
    return matchesSearch && matchesFileType;
  });

  const uniqueFileTypes = Array.from(new Set(sampleProposals.map(p => p.fileType)));

  return (
    <div className="w-full">
      {/* Header with Search and Filter */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Past Proposal Library</h2>
        
        <div className="flex items-center gap-4">
          {/* Filter Dropdown */}
          <Select value={fileTypeFilter} onValueChange={setFileTypeFilter}>
            <SelectTrigger className="w-[140px] bg-white border-gray-200">
              <Filter className="h-4 w-4 mr-2 text-gray-400" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {uniqueFileTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Search Bar */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search proposals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
            />
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredProposals.length} of {sampleProposals.length} proposals
        </p>
      </div>

      {/* Proposal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProposals.map((proposal, index) => (
          <ProposalLibraryCard
            key={index}
            proposal={proposal}
          />
        ))}
      </div>

      {/* No Results Message */}
      {filteredProposals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No proposals found matching your criteria.</p>
          <p className="text-sm text-gray-400 mt-2">Try adjusting your search or filter options.</p>
        </div>
      )}
    </div>
  );
};

export default PastProposalLibrary;
