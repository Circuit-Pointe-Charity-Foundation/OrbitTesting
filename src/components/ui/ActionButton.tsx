
import React, { ReactNode } from "react";

interface ActionButtonProps {
  icon: ReactNode;
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  icon, 
  text, 
  onClick,
  variant = 'secondary'
}) => {
  const baseStyles = "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors";
  const variantStyles = variant === 'primary' 
    ? "bg-violet-600 text-white hover:bg-violet-700" 
    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50";

  return (
    <button
      className={`${baseStyles} ${variantStyles}`}
      onClick={onClick}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default ActionButton;
