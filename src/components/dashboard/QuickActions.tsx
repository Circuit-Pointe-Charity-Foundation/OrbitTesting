
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
      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors cursor-pointer ${
        isActive
          ? "bg-violet-600/10 text-violet-600 font-medium border-b-2 border-violet-600"
          : "..."
      }`}
    >
      <img
        src={icon}
        className="aspect-[1] object-contain w-5 shrink-0"
        alt=""
      />
      <div className="whitespace-nowrap text-sm">{label}</div>
    </Link>
  );
};

export const QuickActions: React.FC = () => {
  return (
    <div className="w-full mt-4 mb-2 px-4">
      <div className="flex items-center gap-2 flex-wrap">
        <QuickAction
          icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/965a4a1f3ca576e6aa56ae0709d67302d74873cd?placeholderIfAbsent=true"
          label="New Donor"
          to="/donor-management/new"
        />
        <QuickAction
          icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/317b4486ebc32b2db7308b7bccd5be2891c14934?placeholderIfAbsent=true"
          label="New Opportunity"
          to="/opportunity-tracking/new"
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
        />
      </div>
      <div className="bg-violet-100 h-px w-full mt-2" />
    </div>
  );
};
