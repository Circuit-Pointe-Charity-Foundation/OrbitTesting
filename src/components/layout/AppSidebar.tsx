import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  ArrowRight,
  DollarSign,
  Briefcase,
  Archive,
  ChartBar,
  Book,
  FileText,
  Users,
  ShoppingCart,
  Award,
  Calendar,
  PlusCircle,
  Kanban,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useModuleContext,
  AVAILABLE_MODULES,
  Module,
} from "@/contexts/ModuleContext";
import blackLogo from "@/assets/images/black_logo.png";

// Module navigation links configuration
const moduleNavigationLinks = {
  fundraising: [
    { icon: <ChartBar size={16} />, label: "Dashboard", to: "/dashboard" },
    {
      icon: <Users size={16} />,
      label: "Donor Management",
      to: "/donor-management",
    },
    {
      icon: <Award size={16} />,
      label: "Opportunity Tracking",
      to: "/opportunity-tracking",
    },
    {
      icon: <FileText size={16} />,
      label: "Proposal Management",
      to: "/proposal-management",
    },
    {
      icon: <ChartBar size={16} />,
      label: "Fundraising Analytics",
      to: "/fundraising-analytics",
    },
    { icon: <FileText size={16} />, label: "Settings", to: "/settings" },
  ],
  "program-management": [
    { icon: <ChartBar size={16} />, label: "Dashboard", to: "/dashboard" },
    { icon: <FileText size={16} />, label: "Feature 1", to: "/feature-1" },
    { icon: <FileText size={16} />, label: "Feature 2", to: "/feature-2" },
    { icon: <FileText size={16} />, label: "Feature 3", to: "/feature-3" },
    { icon: <FileText size={16} />, label: "Feature 4", to: "/feature-4" },
    { icon: <FileText size={16} />, label: "Feature 5", to: "/feature-5" },
  ],
  procurement: [
    { icon: <ChartBar size={16} />, label: "Dashboard", to: "/dashboard" },
    { icon: <ShoppingCart size={16} />, label: "Feature 1", to: "/feature-1" },
    { icon: <FileText size={16} />, label: "Feature 2", to: "/feature-2" },
    { icon: <FileText size={16} />, label: "Feature 3", to: "/feature-3" },
    { icon: <FileText size={16} />, label: "Feature 4", to: "/feature-4" },
    { icon: <FileText size={16} />, label: "Feature 5", to: "/feature-5" },
  ],
  inventory: [
    { icon: <ChartBar size={16} />, label: "Dashboard", to: "/dashboard" },
    { icon: <Archive size={16} />, label: "Feature 1", to: "/feature-1" },
    { icon: <Archive size={16} />, label: "Feature 2", to: "/feature-2" },
  ],
  finance: [
    { icon: <ChartBar size={16} />, label: "Dashboard", to: "/dashboard" },
    { icon: <DollarSign size={16} />, label: "Feature 1", to: "/feature-1" },
    { icon: <DollarSign size={16} />, label: "Feature 2", to: "/feature-2" },
  ],
  learning: [
    { icon: <ChartBar size={16} />, label: "Dashboard", to: "/dashboard" },
    { icon: <Book size={16} />, label: "Feature 1", to: "/feature-1" },
    { icon: <Book size={16} />, label: "Feature 2", to: "/feature-2" },
  ],
  document: [
    { icon: <ChartBar size={16} />, label: "Dashboard", to: "/dashboard" },
    { icon: <FileText size={16} />, label: "Feature 1", to: "/feature-1" },
    { icon: <FileText size={16} />, label: "Feature 2", to: "/feature-2" },
  ],
  hr: [
    { icon: <ChartBar size={16} />, label: "Dashboard", to: "/dashboard" },
    { icon: <Users size={16} />, label: "Feature 1", to: "/feature-1" },
    { icon: <Users size={16} />, label: "Feature 2", to: "/feature-2" },
  ],
  "user-management": [
    { icon: <Users size={16} />, label: "Dashboard", to: "/dashboard" },
    { icon: <FileText size={16} />, label: "User Roles", to: "/roles" },
    { icon: <FileText size={16} />, label: "User Permissions", to: "/permissions" },
  ],
  "grants-management": [
    { icon: <Award size={16} />, label: "Dashboard", to: "/dashboard" },
    { icon: <FileText size={16} />, label: "Grant Applications", to: "/applications" },
    { icon: <FileText size={16} />, label: "Grant Funding", to: "/funding" },
  ],
};

interface SidebarLinkProps {
  icon: string | React.ReactNode;
  label: string;
  to: string;
  collapsed: boolean;
  baseUrl: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  icon,
  label,
  to,
  collapsed,
  baseUrl,
}) => {
  const location = useLocation();
  const fullPath = `${baseUrl}${to}`;
  const isActive = location.pathname === fullPath;
  
  const textColor = isActive ? "text-white" : "text-gray-700";
  const hoverBg = "hover:bg-violet-600 hover:text-white";
  const activeBg = isActive ? "bg-violet-600" : "";
  const iconColorClass = isActive ? "text-white" : "text-gray-500";

  return (
    <Link
      to={fullPath}
      className={`flex items-center gap-4 py-2 px-2 rounded-md cursor-pointer transition-colors ${textColor} ${hoverBg} ${activeBg} ${
        collapsed ? "justify-center" : ""
      } group`}
      style={{ minHeight: "44px" }}
    >
      {typeof icon === "string" ? (
        <img
          src={icon}
          className="aspect-[1] object-contain w-5 shrink-0"
          alt=""
        />
      ) : (
        <div
          className={`w-5 h-5 flex items-center justify-center shrink-0 ${iconColorClass} group-hover:text-white ${isActive ? 'text-white' : ''}`}
        >
          {icon}
        </div>
      )}
      {!collapsed && (
        <div className="flex flex-col">
          <div className="whitespace-nowrap">{label}</div>
        </div>
      )}
    </Link>
  );
};

const AppSidebar: React.FC<{
  collapsed: boolean;
  onToggle: () => void;
}> = ({ collapsed, onToggle }) => {
  const [showModuleSwitcher, setShowModuleSwitcher] = useState(false);
  const { activeModule, setActiveModule, subscribedModules } =
    useModuleContext();
  const links = moduleNavigationLinks[activeModule.id] || [];
  const navigate = useNavigate();

  const toggleModuleSwitcher = () => {
    setShowModuleSwitcher(!showModuleSwitcher);
  };

  const getModuleIcon = (moduleId: string) => {
    const iconColorClass = "text-gray-500";
    switch (moduleId) {
      case "fundraising":
        return <DollarSign size={20} className={iconColorClass} />;
      case "program-management":
        return <Briefcase size={20} className={iconColorClass} />;
      case "procurement":
        return <ShoppingCart size={20} className={iconColorClass} />;
      case "inventory":
        return <Archive size={20} className={iconColorClass} />;
      case "finance":
        return <ChartBar size={20} className={iconColorClass} />;
      case "learning":
        return <Book size={20} className={iconColorClass} />;
      case "document":
        return <FileText size={20} className={iconColorClass} />;
      case "hr":
        return <Users size={20} className={iconColorClass} />;
      case "user-management":
        return <Users size={20} className={iconColorClass} />;
      case "grants-management":
        return <Award size={20} className={iconColorClass} />;
      default:
        return <DollarSign size={20} className={iconColorClass} />;
    }
  };

  const handleModuleChange = (module: Module) => {
    setActiveModule(module);
    navigate(`/modules/${module.id}/dashboard`);
    setShowModuleSwitcher(false);
  };

  return (
    <div
      className={`fixed h-full z-10 flex-col font-medium overflow-hidden transition-all duration-300 ease-in-out shadow-md bg-white ${
        collapsed ? "w-[70px]" : "w-[22%] max-w-[280px]"
      }`}
    >
      <div className="flex items-center justify-between px-6 pt-[31px]">
        {!collapsed && (
          <div className="flex items-center gap-2 text-lg text-gray-800">
            <img
              src={blackLogo}
              className="aspect-[1] object-contain w-[30px] shrink-0 my-auto"
              alt="Orbit Logo"
            />
            <div className="self-stretch my-auto">Orbit ERP</div>
          </div>
        )}
        <button
          onClick={onToggle}
          className={`rounded-full p-1 transition-colors text-gray-500 hover:bg-gray-100 ${
            collapsed ? "mx-auto" : ""
          }`}
        >
          {collapsed ? (
            <ChevronRight size={20} className="text-gray-500" />
          ) : (
            <ChevronLeft size={20} />
          )}
        </button>
      </div>

      {/* Current Module Title */}
      {!collapsed && (
        <div className="mt-4 px-6 text-gray-800 font-bold text-lg">
          {activeModule.name}
        </div>
      )}

      <div
        className={`mt-4 flex-1 overflow-y-auto hide-scrollbar ${
          showModuleSwitcher ? "hidden" : "block"
        }`}
        style={{ maxHeight: "calc(100vh - 220px)" }}
      >
        <div className={`flex flex-col py-1 px-2 gap-0`}>
          {links.map((link, index) => (
            <SidebarLink
              key={index}
              icon={link.icon}
              label={link.label}
              to={link.to}
              collapsed={collapsed}
              baseUrl={`/modules/${activeModule.id}`}
            />
          ))}
        </div>
      </div>

      {/* Module Switcher */}
      <div
        className={`absolute bottom-0 left-0 right-0 border-t border-gray-200 py-2 ${
          collapsed ? "px-2" : "px-4"
        }`}
      >
        <button
          onClick={toggleModuleSwitcher}
          className={`w-full rounded-md py-3 flex items-center transition-colors text-gray-700 hover:bg-gray-100 ${
            collapsed ? "justify-center" : "justify-between px-4"
          }`}
        >
          <Menu size={20} className="text-gray-500" />
          {!collapsed && (
            <>
              <span>Switch Module</span>
              <ArrowRight
                size={16}
                className={
                  showModuleSwitcher
                    ? "rotate-90 text-gray-500"
                    : "text-gray-500"
                }
              />
            </>
          )}
        </button>

        {showModuleSwitcher && (
          <ScrollArea
            className={`mt-2 p-2 rounded-md shadow-inner bg-gray-100 ${
              collapsed
                ? "absolute bottom-16 left-0 w-[220px]"
                : ""
            }`}
            style={{ maxHeight: "400px" }}
          >
            {subscribedModules.map((module) => (
              <button
                key={module.id}
                onClick={() => handleModuleChange(module)}
                className={`w-full text-left p-2 rounded-md mb-1 flex items-center gap-2 text-gray-700 hover:bg-gray-200 ${
                  activeModule.id === module.id
                    ? "bg-gray-200 font-semibold"
                    : ""
                }`}
              >
                {getModuleIcon(module.id)}
                {!collapsed && <span>{module.name}</span>}
              </button>
            ))}
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default AppSidebar;
