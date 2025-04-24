
import React from "react";
import { StatCards } from "@/components/dashboard/StatCards";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { Calendar } from "@/components/dashboard/Calendar";
import { Notifications } from "@/components/dashboard/Notifications";
import { Deadlines } from "@/components/dashboard/Deadlines";

export const Dashboard: React.FC = () => {
  return (
    <div className="bg-[rgba(245,247,250,1)]">
      <QuickActions />
      <div className="border shrink-0 h-px border-[rgba(209,209,209,1)] border-solid" />
      <div className="mt-6">
        <div className="gap-5 flex flex-col lg:flex-row">
          <div className="w-full lg:w-[70%]">
            <StatCards />
            <Calendar />
          </div>
          <div className="w-full lg:w-[30%]">
            <div className="bg-white flex w-full flex-col rounded-lg shadow-sm">
              <div className="flex flex-col p-6 gap-4">
                <Notifications />
                <Deadlines />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
