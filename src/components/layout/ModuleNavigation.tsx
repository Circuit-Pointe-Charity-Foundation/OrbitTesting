import React from "react";
import { useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const modules = [
  { 
    name: "Fundraising", 
    path: "/modules/fundraising",
    description: "Manage donors, track opportunities, create proposals" 
  },
  { 
    name: "Program Management", 
    path: "/modules/program-management",
    description: "Plan and execute programs and projects" 
  },
  { 
    name: "Procurement", 
    path: "/modules/procurement",
    description: "Manage purchases and vendor relationships" 
  },
  { 
    name: "Inventory Management", 
    path: "/modules/inventory",
    description: "Track and manage organizational assets" 
  },
  { 
    name: "Finance & Control", 
    path: "/modules/finance",
    description: "Manage budgets, expenses and financial reports" 
  },
  { 
    name: "Learning Management", 
    path: "/modules/learning",
    description: "Training and knowledge base systems" 
  },
  { 
    name: "Document Management", 
    path: "/modules/document",
    description: "Store and organize important documents" 
  },
  { 
    name: "HR Management", 
    path: "/modules/hr",
    description: "Staff management and HR functions" 
  },
  { 
    name: "User Management", 
    path: "/modules/user-management",
    description: "Manage user accounts and permissions"
  },
  { 
    name: "Grants Management", 
    path: "/modules/grants-management",
    description: "Manage grant applications and funding" 
  },
];

export const ModuleNavigation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white px-4 py-2 border-b">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-violet-50 text-violet-900">
              Switch Module
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {modules.map((module) => (
                  <li key={module.path} className="row-span-1">
                    <NavigationMenuLink asChild>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(module.path);
                        }}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">
                          {module.name}
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {module.description}
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
