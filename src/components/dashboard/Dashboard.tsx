
import React from "react";
import { QuickActions } from "./QuickActions";
import { StatCards } from "./StatCards";
import { Calendar } from "./Calendar";
import { Notifications } from "./Notifications";
import { Deadlines } from "./Deadlines";

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
              <div className="flex flex-col p-6">
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
