
import React from "react";
import { Link } from "react-router-dom";

interface QuickActionProps {
  icon: string;
  label: string;
  to: string;
  isActive?: boolean;
}

const QuickAction: React.FC<QuickActionProps> = ({
  icon,
  label,
  to,
  isActive = false,
}) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-3 py-2 text-[rgba(56,56,57,1)] rounded-md hover:text-violet-600 hover:bg-violet-50 transition-colors cursor-pointer ${
        isActive ? "border-b-2 border-violet-600 text-violet-600" : ""
      }`}
    >
      <img
        src={icon}
        className="aspect-[1] object-contain w-5 shrink-0"
        alt=""
      />
      <div>{label}</div>
    </Link>
  );
};

export const QuickActions: React.FC = () => {
  return (
    <div className="w-full mt-4 mb-2">
      <div className="flex items-center gap-4 flex-wrap">
        <QuickAction 
          icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/965a4a1f3ca576e6aa56ae0709d67302d74873cd?placeholderIfAbsent=true" 
          label="New Donor" 
          to="/donor-management/new"
          isActive={false}
        />
        <QuickAction 
          icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/317b4486ebc32b2db7308b7bccd5be2891c14934?placeholderIfAbsent=true" 
          label="New Opportunity" 
          to="/opportunity-tracking/new"
          isActive={false}
        />
        <QuickAction 
          icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/e4db9bc09fc3b27f400f30eb3535efe627699f5d?placeholderIfAbsent=true" 
          label="Create Proposal" 
          to="/proposal-development/new"
          isActive={true}
        />
        <QuickAction 
          icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/c45e474da37deb864af93438f814f567fcfba3f7?placeholderIfAbsent=true" 
          label="Generate Reports" 
          to="/reports"
          isActive={false}
        />
      </div>
      <div className="border-violet-600 w-[140px] h-0.5 mt-0.5 border-solid border-2" />
    </div>
  );
};
