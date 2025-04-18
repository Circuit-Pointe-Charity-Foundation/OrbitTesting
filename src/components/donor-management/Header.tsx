import React from "react";
import { NotificationIcon } from "../icons/NotificationIcon";
import { DropdownIcon } from "../icons/DropdownIcon";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center mb-6 max-md:flex-col max-md:items-start max-sm:flex-col max-sm:items-start">
      <h1 className="text-2xl text-[#383839]">Donor Management</h1>
      <div className="flex items-center gap-4 max-md:mt-4 max-sm:mt-4">
        <button
          aria-label="Notifications"
          className="flex items-center justify-center"
        >
          <NotificationIcon />
        </button>
        <div className="flex items-center gap-1.5">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc98dc174ecc71fffbbe1fe204ba731266648a82?placeholderIfAbsent=true" alt="Profile" className="w-14 h-14 rounded-[50%]" />
          <button
            aria-label="Profile dropdown"
            className="flex items-center justify-center"
          >
            <DropdownIcon />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
