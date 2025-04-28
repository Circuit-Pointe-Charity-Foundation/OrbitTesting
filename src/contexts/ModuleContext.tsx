import React, { createContext, useContext, useState, useEffect } from "react";

export type Module = {
  id: string;
  name: string;
  path: string;
  description: string;
};

// List of all available modules
export const AVAILABLE_MODULES: Module[] = [
  { 
    id: "fundraising", 
    name: "Fundraising", 
    path: "/modules/fundraising", 
    description: "Manage donors, track opportunities, create proposals" 
  },
  { 
    id: "program-management", 
    name: "Program Management", 
    path: "/modules/program-management", 
    description: "Plan and execute programs and projects" 
  },
  { 
    id: "procurement", 
    name: "Procurement", 
    path: "/modules/procurement", 
    description: "Manage purchases and vendor relationships" 
  },
  { 
    id: "inventory", 
    name: "Inventory Management", 
    path: "/modules/inventory", 
    description: "Track and manage organizational assets" 
  },
  { 
    id: "finance", 
    name: "Finance & Control", 
    path: "/modules/finance", 
    description: "Manage budgets, expenses and financial reports" 
  },
  { 
    id: "learning", 
    name: "Learning Management", 
    path: "/modules/learning", 
    description: "Training and knowledge base systems" 
  },
  { 
    id: "document", 
    name: "Document Management", 
    path: "/modules/document", 
    description: "Store and organize important documents" 
  },
  { 
    id: "hr", 
    name: "HR Management", 
    path: "/modules/hr", 
    description: "Staff management and HR functions" 
  },
];

type ModuleContextType = {
  activeModule: Module;
  subscribedModules: Module[];
  setActiveModule: (module: Module) => void;
  setSubscribedModules: (modules: Module[]) => void;
};

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

export const useModuleContext = () => {
  const context = useContext(ModuleContext);
  if (context === undefined) {
    throw new Error("useModuleContext must be used within a ModuleProvider");
  }
  return context;
};

export const ModuleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with all modules for now; later this would come from user preferences
  const [subscribedModules, setSubscribedModules] = useState<Module[]>(AVAILABLE_MODULES);
  
  // Default to first module (Fundraising)
  const [activeModule, setActiveModule] = useState<Module>(AVAILABLE_MODULES[0]);
  
  // Load from localStorage on initial render
  useEffect(() => {
    const storedActiveModuleId = localStorage.getItem("activeModuleId");
    if (storedActiveModuleId) {
      const foundModule = AVAILABLE_MODULES.find(m => m.id === storedActiveModuleId);
      if (foundModule) {
        setActiveModule(foundModule);
      }
    }
    
    // In a real app, we'd fetch user's subscribed modules from API
    // For now, we'll use all available modules
  }, []);
  
  // Save active module to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("activeModuleId", activeModule.id);
  }, [activeModule]);
  
  return (
    <ModuleContext.Provider value={{ 
      activeModule, 
      setActiveModule, 
      subscribedModules, 
      setSubscribedModules 
    }}>
      {children}
    </ModuleContext.Provider>
  );
};
