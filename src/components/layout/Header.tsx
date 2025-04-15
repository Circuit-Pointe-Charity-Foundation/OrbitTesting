import React, { useState, useRef, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <div className="bg-white w-full flex items-center justify-between px-6 py-4 shadow-sm">
      <div className="text-[rgba(56,56,57,1)] text-sm font-medium">
        Good Afternoon, <span className="font-bold">Chioma Ike</span>
      </div>
      <div className="flex items-center gap-[30px]">
        <button className="relative hover:opacity-80 transition-opacity">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/bc5bd96ad79b000e67855a7c4cd427f5c23e0132?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-[40px]"
            alt="Notifications"
          />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1.5 outline-none">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/72798c9f03b636536e1534c9b38dd6c314d301c0?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-10 rounded-full"
              alt="User Avatar"
            />
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5 text-sm font-medium">Chioma Ike</div>
            <div className="px-2 pb-2 text-xs text-gray-500">
              chioma@orbitngos.org
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-500">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
