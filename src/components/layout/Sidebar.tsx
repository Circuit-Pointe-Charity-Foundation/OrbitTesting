
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarLinkProps {
  icon: string;
  label: string;
  to: string;
  collapsed: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  icon,
  label,
  to,
  collapsed,
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-4 py-2 px-2 rounded-md cursor-pointer hover:text-white transition-colors ${
        isActive
          ? "text-white font-bold bg-violet-700"
          : "text-[rgba(202,179,255,1)] hover:bg-violet-700/50"
      } ${collapsed ? "justify-center" : ""}`}
      style={{ minHeight: '44px' }}
    >
      <img
        src={icon}
        className="aspect-[1] object-contain w-5 shrink-0"
        alt=""
      />
      {!collapsed && (
        <div className="flex flex-col">
          <div className="whitespace-nowrap">{label}</div>
        </div>
      )}
    </Link>
  );
};

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const sidebarLinks = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/828eaaedadd88007410b86b2eb04ca0bf0a298ba?placeholderIfAbsent=true",
      label: "Dashboards",
      to: "/dashboard",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/614b6853984dcae9c03cb57b4b3b4030230a0642?placeholderIfAbsent=true",
      label: "Donor Management",
      to: "/donor-management",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/1549fd0f0a5dfb5a80ce4567068bbc87f72ccfda?placeholderIfAbsent=true",
      label: "Opportunity Tracking",
      to: "/opportunity-tracking",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/614b6853984dcae9c03cb57b4b3b4030230a0642?placeholderIfAbsent=true",
      label: "Proposal Development",
      to: "/proposal-development",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/23cba190c061e1a18edf5c5a381a6ac364437936?placeholderIfAbsent=true",
      label: "Proposal Library",
      to: "/proposal-library",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/010c49009b64343fc260ff2073febfeb3376217b?placeholderIfAbsent=true",
      label: "AI Proposal Wizard",
      to: "/ai-proposal-wizard",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/4bf6d47149419ce63561ecb9bc9f8e248c23ed04?placeholderIfAbsent=true",
      label: "Internal Workflow & Review",
      to: "/internal-workflow",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/8d222f0838818acf1732ad8f2844ef1bd21d12da?placeholderIfAbsent=true",
      label: "Calendar & Reminders",
      to: "/calendar",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/464233521b077e39fdef00fa474dcfa61c710069?placeholderIfAbsent=true",
      label: "Fundraising Analytics",
      to: "/fundraising-analytics",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/003933b9929b300ebc0692dc33f2bc17afc04f7a?placeholderIfAbsent=true",
      label: "Settings",
      to: "/settings",
    },
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
      <div
        className={`mt-4 flex-1 overflow-y-auto hide-scrollbar`}
        style={{ maxHeight: "calc(100vh - 100px)" }} // ensures scroll if needed
      >
        <div className={`flex flex-col py-1 px-2 gap-0`}>
          {sidebarLinks.map((link, index) => (
            <SidebarLink
              key={index}
              icon={link.icon}
              label={link.label}
              to={link.to}
              collapsed={collapsed}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
