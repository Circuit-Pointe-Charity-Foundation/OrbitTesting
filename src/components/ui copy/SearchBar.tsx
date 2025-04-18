import React from "react";
import { SearchIcon } from "../icons/SearchIcon";

interface SearchBarProps {
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder }) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex items-center gap-2 border bg-[#F5F7FA] p-3 rounded-[5px] border-solid border-[#D9D9D9] w-full md:w-auto">
      <SearchIcon />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearch}
        className="bg-transparent border-none outline-none text-[15px] text-[#8BA3CB] placeholder-[#8BA3CB] w-full"
      />
    </div>
  );
};

export default SearchBar;
