import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { QuickActions } from "./QuickActions";
import { StatCards } from "./StatCards";
import { Calendar } from "./Calendar";
import { Notifications } from "./Notifications";
import { Deadlines } from "./Deadlines";

export const Dashboard: React.FC = () => {
  return (
    <div className="bg-[rgba(245,247,250,1)] overflow-hidden">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-[22%] max-md:w-full max-md:ml-0">
          <Sidebar />
        </div>
        <div className="w-[78%] ml-5 max-md:w-full max-md:ml-0">
          <div className="flex w-full flex-col items-stretch max-md:max-w-full">
            <Header />
            <QuickActions />
            <div className="border shrink-0 h-px border-[rgba(209,209,209,1)] border-solid max-md:max-w-full" />
            <div className="ml-8 mr-6 max-md:max-w-full max-md:mr-2.5">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                <div className="w-[71%] max-md:w-full max-md:ml-0">
                  <div className="w-full mt-[47px] max-md:max-w-full max-md:mt-10">
                    <StatCards />
                    <Calendar />
                  </div>
                </div>
                <div className="w-[29%] ml-5 max-md:w-full max-md:ml-0">
                  <div className="bg-white flex w-full flex-col items-stretch mx-auto pt-6 pb-[165px] max-md:mt-8 max-md:pb-[100px]">
                    <div className="flex flex-col items-stretch px-5">
                      <Notifications />
                      <Deadlines />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
