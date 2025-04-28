
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Menu, ArrowRight, DollarSign, Briefcase, Archive, ChartBar, Book, FileText, Users, ShoppingCart } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useModuleContext, AVAILABLE_MODULES, Module } from "@/contexts/ModuleContext";

// Module navigation links configuration
const moduleNavigationLinks: Record<string, {icon: string | React.ReactNode, label: string, to: string}[]> = {
  "fundraising": [
    {
      icon: <DollarSign size={16} />,
      label: "Dashboard",
      to: "/dashboard",
    },
    {
      icon: <Users size={16} />,
      label: "Donor Management",
      to: "/donor-management",
    },
    {
      icon: <ChartBar size={16} />,
      label: "Opportunity Tracking",
      to: "/opportunity-tracking",
    },
    {
      icon: <FileText size={16} />,
      label: "Proposal Development",
      to: "/proposal-development",
    },
    {
      icon: <Book size={16} />,
      label: "Proposal Library",
      to: "/proposal-library",
    },
    {
      icon: <DollarSign size={16} />,
      label: "AI Proposal Wizard",
      to: "/ai-proposal-wizard",
    },
    {
      icon: <FileText size={16} />,
      label: "Internal Workflow & Review",
      to: "/internal-workflow",
    },
    {
      icon: <ChartBar size={16} />,
      label: "Calendar & Reminders",
      to: "/calendar",
    },
    {
      icon: <ChartBar size={16} />,
      label: "Fundraising Analytics",
      to: "/fundraising-analytics",
    },
    {
      icon: <Users size={16} />,
      label: "Settings",
      to: "/settings",
    },
  ],
  "program-management": [
    {
      icon: <ChartBar size={16} />,
      label: "Dashboard",
      to: "/dashboard",
    },
    {
      icon: <FileText size={16} />,
      label: "Feature 1",
      to: "/feature-1",
    },
    {
      icon: <FileText size={16} />,
      label: "Feature 2",
      to: "/feature-2",
    },
    {
      icon: <FileText size={16} />,
      label: "Feature 3",
      to: "/feature-3",
    },
    {
      icon: <FileText size={16} />,
      label: "Feature 4",
      to: "/feature-4",
    },
    {
      icon: <FileText size={16} />,
      label: "Feature 5",
      to: "/feature-5",
    },
  ],
  "procurement": [
    {
      icon: <ChartBar size={16} />,
      label: "Dashboard",
      to: "/dashboard",
    },
    {
      icon: <ShoppingCart size={16} />,
      label: "Feature 1",
      to: "/feature-1",
    },
    {
      icon: <FileText size={16} />,
      label: "Feature 2",
      to: "/feature-2",
    },
    {
      icon: <FileText size={16} />,
      label: "Feature 3",
      to: "/feature-3",
    },
    {
      icon: <FileText size={16} />,
      label: "Feature 4",
      to: "/feature-4",
    },
    {
      icon: <FileText size={16} />,
      label: "Feature 5",
      to: "/feature-5",
    },
  ],
  "inventory": [
    {
      icon: <ChartBar size={16} />,
      label: "Dashboard",
      to: "/dashboard",
    },
    {
      icon: <Archive size={16} />,
      label: "Feature 1",
      to: "/feature-1",
    },
    {
      icon: <Archive size={16} />,
      label: "Feature 2",
      to: "/feature-2",
    },
  ],
  "finance": [
    {
      icon: <ChartBar size={16} />,
      label: "Dashboard",
      to: "/dashboard",
    },
    {
      icon: <DollarSign size={16} />,
      label: "Feature 1",
      to: "/feature-1",
    },
    {
      icon: <DollarSign size={16} />,
      label: "Feature 2",
      to: "/feature-2",
    },
  ],
  "learning": [
    {
      icon: <ChartBar size={16} />,
      label: "Dashboard",
      to: "/dashboard",
    },
    {
      icon: <Book size={16} />,
      label: "Feature 1",
      to: "/feature-1",
    },
    {
      icon: <Book size={16} />,
      label: "Feature 2",
      to: "/feature-2",
    },
  ],
  "document": [
    {
      icon: <ChartBar size={16} />,
      label: "Dashboard",
      to: "/dashboard",
    },
    {
      icon: <FileText size={16} />,
      label: "Feature 1",
      to: "/feature-1",
    },
    {
      icon: <FileText size={16} />,
      label: "Feature 2",
      to: "/feature-2",
    },
  ],
  "hr": [
    {
      icon: <ChartBar size={16} />,
      label: "Dashboard",
      to: "/dashboard",
    },
    {
      icon: <Users size={16} />,
      label: "Feature 1",
      to: "/feature-1",
    },
    {
      icon: <Users size={16} />,
      label: "Feature 2",
      to: "/feature-2",
    },
  ],
};

// Link component for sidebar navigation
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
      {typeof icon === 'string' ? (
        <img
          src={icon}
          className="aspect-[1] object-contain w-5 shrink-0"
          alt=""
        />
      ) : (
        <div className="w-5 h-5 flex items-center justify-center shrink-0 text-current">
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

// Now let's refactor the AppSidebar component to be more focused
const AppSidebar: React.FC<{
  collapsed: boolean;
  onToggle: () => void;
}> = ({ collapsed, onToggle }) => {
  const [showModuleSwitcher, setShowModuleSwitcher] = useState(false);
  const { activeModule, setActiveModule, subscribedModules } = useModuleContext();
  const links = moduleNavigationLinks[activeModule.id] || [];
  
  const toggleModuleSwitcher = () => {
    setShowModuleSwitcher(!showModuleSwitcher);
  };

  const getModuleIcon = (moduleId: string) => {
    switch (moduleId) {
      case 'fundraising':
        return <DollarSign size={20} />;
      case 'program-management':
        return <Briefcase size={20} />;
      case 'procurement':
        return <ShoppingCart size={20} />;
      case 'inventory':
        return <Archive size={20} />;
      case 'finance':
        return <ChartBar size={20} />;
      case 'learning':
        return <Book size={20} />;
      case 'document':
        return <FileText size={20} />;
      case 'hr':
        return <Users size={20} />;
      default:
        return <DollarSign size={20} />;
    }
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
          <ScrollArea className={`mt-2 p-2 bg-violet-700 rounded-md ${collapsed ? 'absolute bottom-16 left-0 w-[220px]' : ''}`} style={{ maxHeight: "300px" }}>
            {subscribedModules.map((module) => (
              <button
                key={module.id}
                onClick={() => handleModuleChange(module)}
                className={`w-full text-left p-2 rounded-md mb-1 flex items-center gap-2 ${
                  activeModule.id === module.id ? 'bg-violet-800 text-white' : 'text-violet-200 hover:bg-violet-800/50'
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
