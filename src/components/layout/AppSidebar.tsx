
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Menu, ArrowRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useModuleContext, AVAILABLE_MODULES, Module } from "@/contexts/ModuleContext";

// Module navigation links configuration
const moduleNavigationLinks: Record<string, {icon: string, label: string, to: string}[]> = {
  "fundraising": [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/828eaaedadd88007410b86b2eb04ca0bf0a298ba?placeholderIfAbsent=true",
      label: "Dashboard",
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
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/8d222f0838818acf1732ad8f2844ef1bd12?placeholderIfAbsent=true",
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
  ],
  "program-management": [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/828eaaedadd88007410b86b2eb04ca0bf0a298ba?placeholderIfAbsent=true",
      label: "Dashboard",
      to: "/dashboard",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/614b6853984dcae9c03cb57b4b3b4030230a0642?placeholderIfAbsent=true",
      label: "Feature 1",
      to: "/feature-1",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/1549fd0f0a5dfb5a80ce4567068bbc87f72ccfda?placeholderIfAbsent=true",
      label: "Feature 2",
      to: "/feature-2",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/23cba190c061e1a18edf5c5a381a6ac364437936?placeholderIfAbsent=true",
      label: "Feature 3",
      to: "/feature-3",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/010c49009b64343fc260ff2073febfeb3376217b?placeholderIfAbsent=true",
      label: "Feature 4",
      to: "/feature-4",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/4bf6d47149419ce63561ecb9bc9f8e248c23ed04?placeholderIfAbsent=true",
      label: "Feature 5",
      to: "/feature-5",
    },
  ],
  "procurement": [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/828eaaedadd88007410b86b2eb04ca0bf0a298ba?placeholderIfAbsent=true",
      label: "Dashboard",
      to: "/dashboard",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/614b6853984dcae9c03cb57b4b3b4030230a0642?placeholderIfAbsent=true",
      label: "Feature 1",
      to: "/feature-1",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/1549fd0f0a5dfb5a80ce4567068bbc87f72ccfda?placeholderIfAbsent=true",
      label: "Feature 2",
      to: "/feature-2",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/23cba190c061e1a18edf5c5a381a6ac364437936?placeholderIfAbsent=true",
      label: "Feature 3",
      to: "/feature-3",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/010c49009b64343fc260ff2073febfeb3376217b?placeholderIfAbsent=true",
      label: "Feature 4",
      to: "/feature-4",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/4bf6d47149419ce63561ecb9bc9f8e248c23ed04?placeholderIfAbsent=true",
      label: "Feature 5",
      to: "/feature-5",
    },
  ],
  "inventory": [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/828eaaedadd88007410b86b2eb04ca0bf0a298ba?placeholderIfAbsent=true",
      label: "Dashboard",
      to: "/dashboard",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/614b6853984dcae9c03cb57b4b3b4030230a0642?placeholderIfAbsent=true",
      label: "Feature 1",
      to: "/feature-1",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/1549fd0f0a5dfb5a80ce4567068bbc87f72ccfda?placeholderIfAbsent=true",
      label: "Feature 2",
      to: "/feature-2",
    },
  ],
  "finance": [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/828eaaedadd88007410b86b2eb04ca0bf0a298ba?placeholderIfAbsent=true",
      label: "Dashboard",
      to: "/dashboard",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/614b6853984dcae9c03cb57b4b3b4030230a0642?placeholderIfAbsent=true",
      label: "Feature 1",
      to: "/feature-1",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/1549fd0f0a5dfb5a80ce4567068bbc87f72ccfda?placeholderIfAbsent=true",
      label: "Feature 2",
      to: "/feature-2",
    },
  ],
  "learning": [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/828eaaedadd88007410b86b2eb04ca0bf0a298ba?placeholderIfAbsent=true",
      label: "Dashboard",
      to: "/dashboard",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/614b6853984dcae9c03cb57b4b3b4030230a0642?placeholderIfAbsent=true",
      label: "Feature 1",
      to: "/feature-1",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/1549fd0f0a5dfb5a80ce4567068bbc87f72ccfda?placeholderIfAbsent=true",
      label: "Feature 2",
      to: "/feature-2",
    },
  ],
  "document": [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/828eaaedadd88007410b86b2eb04ca0bf0a298ba?placeholderIfAbsent=true",
      label: "Dashboard",
      to: "/dashboard",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/614b6853984dcae9c03cb57b4b3b4030230a0642?placeholderIfAbsent=true",
      label: "Feature 1",
      to: "/feature-1",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/1549fd0f0a5dfb5a80ce4567068bbc87f72ccfda?placeholderIfAbsent=true",
      label: "Feature 2",
      to: "/feature-2",
    },
  ],
  "hr": [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/828eaaedadd88007410b86b2eb04ca0bf0a298ba?placeholderIfAbsent=true",
      label: "Dashboard",
      to: "/dashboard",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/614b6853984dcae9c03cb57b4b3b4030230a0642?placeholderIfAbsent=true",
      label: "Feature 1",
      to: "/feature-1",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/1549fd0f0a5dfb5a80ce4567068bbc87f72ccfda?placeholderIfAbsent=true",
      label: "Feature 2",
      to: "/feature-2",
    },
  ],
};

// Link component for sidebar navigation
interface SidebarLinkProps {
  icon: string;
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

  return (
    <Link
      to={fullPath}
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

export const AppSidebar: React.FC<{
  collapsed: boolean;
  onToggle: () => void;
}> = ({ collapsed, onToggle }) => {
  const [showModuleSwitcher, setShowModuleSwitcher] = useState(false);
  const { activeModule, setActiveModule, subscribedModules } = useModuleContext();
  const links = moduleNavigationLinks[activeModule.id] || [];
  
  const toggleModuleSwitcher = () => {
    setShowModuleSwitcher(!showModuleSwitcher);
  };

  const handleModuleChange = (module: Module) => {
    setActiveModule(module);
    setShowModuleSwitcher(false);
  };

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
      
      {/* Current Module Title */}
      {!collapsed && (
        <div className="mt-4 px-6 text-white font-bold text-lg">
          {activeModule.name}
        </div>
      )}
      
      <div className={`mt-4 flex-1 overflow-y-auto hide-scrollbar ${showModuleSwitcher ? 'hidden' : 'block'}`} style={{ maxHeight: "calc(100vh - 220px)" }}>
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
      <div className={`absolute bottom-0 left-0 right-0 border-t border-violet-500 py-2 ${collapsed ? 'px-2' : 'px-4'}`}>
        <button
          onClick={toggleModuleSwitcher}
          className={`w-full rounded-md py-3 flex items-center transition-colors ${
            collapsed ? 'justify-center' : 'justify-between px-4'
          } text-white hover:bg-violet-700`}
        >
          <Menu size={20} />
          {!collapsed && (
            <>
              <span>Switch Module</span>
              <ArrowRight size={16} className={showModuleSwitcher ? 'rotate-90' : ''} />
            </>
          )}
        </button>
        
        {/* Module List */}
        {showModuleSwitcher && (
          <ScrollArea className={`mt-2 p-2 bg-violet-700 rounded-md max-h-[300px] ${collapsed ? 'absolute bottom-16 left-0 w-[220px]' : ''}`}>
            {subscribedModules.map((module) => (
              <button
                key={module.id}
                onClick={() => handleModuleChange(module)}
                className={`w-full text-left p-2 rounded-md mb-1 ${
                  activeModule.id === module.id ? 'bg-violet-800 text-white' : 'text-violet-200 hover:bg-violet-800/50'
                }`}
              >
                {module.name}
              </button>
            ))}
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default AppSidebar;
