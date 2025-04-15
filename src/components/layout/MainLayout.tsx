
import React, { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export const MainLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[rgba(245,247,250,1)] overflow-hidden">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div 
        className={`flex flex-col w-full transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "ml-[70px]" : "ml-0 md:ml-[22%]"
        }`}
      >
        <Header />
        <main className="flex-1 px-6 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
