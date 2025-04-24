
import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { AppSidebar } from "./AppSidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useSidebarCollapse } from "@/hooks/use-sidebar-collapse";
import { ModuleProvider } from "@/contexts/ModuleContext";

export const MainLayout: React.FC = () => {
  const { collapsed, toggleSidebar } = useSidebarCollapse();
  const location = useLocation();

  return (
    <ModuleProvider>
      <div className="flex min-h-screen bg-[rgba(245,247,250,1)] overflow-hidden">
        <AppSidebar collapsed={collapsed} onToggle={toggleSidebar} />
        <div
          className={`flex flex-col w-full transition-all duration-300 ease-in-out ${
            collapsed ? "ml-[70px]" : "ml-[280px]"
          }`}
        >
          <Header />
          <main className="flex-1 px-6 py-4">
            <Outlet />
          </main>
        </div>
      </div>
    </ModuleProvider>
  );
};
