import React, { ReactNode } from "react";

interface ActionButtonProps {
  icon: ReactNode;
  text: string;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, text, onClick }) => {
  return (
    <button
      className="flex items-center gap-2 border bg-[#F5F7FA] p-3 rounded-[5px] border-solid border-[#D9D9D9] hover:bg-[#EAEEF5] transition-colors w-full md:w-auto"
      onClick={onClick}
    >
      {icon}
      <span className="text-sm text-[rgba(56,56,57,0.65)]">{text}</span>
    </button>
  );
};

export default ActionButton;
