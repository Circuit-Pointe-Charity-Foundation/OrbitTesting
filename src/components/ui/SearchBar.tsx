
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder: string;
  onSearch?: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  }, [searchTerm, onSearch]);

  return (
    <div className="flex items-center gap-2 w-full md:w-[320px] bg-white border border-gray-200 rounded-md px-3 py-2 shadow-sm transition-colors focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500">
      <Search className="h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-500 border-0 outline-none focus:ring-0"
      />
    </div>
  );
};

export default SearchBar;
