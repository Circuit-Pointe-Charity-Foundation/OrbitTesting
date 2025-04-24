
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarLinkProps {
  icon: string;
  label: string;
  to: string;
  isActive?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  icon,
  label,
  to,
  isActive = false,
}) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-4 justify-center mt-10 rounded-[5px] ${
        isActive ? "text-white font-bold" : "text-[rgba(202,179,255,1)]"
      }`}
    >
      <img
        src={icon}
        className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto"
        alt=""
      />
      <div className="self-stretch flex flex-col items-stretch justify-center my-auto rounded-[5px]">
        <div>{label}</div>
        <div
          className={`border min-h-px w-0 ${
            isActive ? "border-white" : "border-[rgba(202,179,255,1)]"
          } border-solid`}
        />
      </div>
    </Link>
  );
};

export const Sidebar: React.FC<{
  collapsed: boolean;
  onToggle: () => void;
}> = ({ collapsed, onToggle }) => {
  const location = useLocation();

  const modules = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/828eaaedadd88007410b86b2eb04ca0bf0a298ba?placeholderIfAbsent=true",
      label: "Fundraising",
      path: "/modules/fundraising"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/614b6853984dcae9c03cb57b4b3b4030230a0642?placeholderIfAbsent=true",
      label: "Program Management",
      path: "/modules/program-management"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/1549fd0f0a5dfb5a80ce4567068bbc87f72ccfda?placeholderIfAbsent=true",
      label: "Procurement",
      path: "/modules/procurement"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/614b6853984dcae9c03cb57b4b3b4030230a0642?placeholderIfAbsent=true",
      label: "Inventory Management",
      path: "/modules/inventory"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/23cba190c061e1a18edf5c5a381a6ac364437936?placeholderIfAbsent=true",
      label: "Finance & Control",
      path: "/modules/finance"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/010c49009b64343fc260ff2073febfeb3376217b?placeholderIfAbsent=true",
      label: "Learning Management",
      path: "/modules/learning"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/4bf6d47149419ce63561ecb9bc9f8e248c23ed04?placeholderIfAbsent=true",
      label: "Document Management",
      path: "/modules/document"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/8d222f0838818acf1732ad8f2844ef1bd21d12da?placeholderIfAbsent=true",
      label: "Human Resource",
      path: "/modules/hr"
    }
  ];

  return (
    <div
      className={`bg-violet-600 fixed h-full z-10 flex-col font-medium overflow-hidden transition-all duration-300 ease-in-out ${
        collapsed ? "w-[70px]" : "w-[22%] max-w-[280px]"
      }`}
    >
      <div className="flex items-center justify-between px-6 pt-[31px]">
        <div className="flex items-center gap-2 text-lg text-white">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/8d57d3330a663501866598decc78666e8126d2f9?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-[50px] shrink-0 my-auto"
            alt="Orbit Logo"
          />
          {!collapsed && <div className="self-stretch my-auto">Orbit ERP</div>}
        </div>
        <button
          onClick={onToggle}
          className="text-white hover:bg-violet-700 rounded-full p-1 transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <div className="flex flex-col text-base text-[rgba(202,179,255,1)] mt-10">
        {modules.map((module) => (
          <SidebarLink
            key={module.path}
            icon={module.icon}
            label={module.label}
            to={module.path}
            isActive={location.pathname === module.path}
          />
        ))}
      </div>
    </div>
  );
};
