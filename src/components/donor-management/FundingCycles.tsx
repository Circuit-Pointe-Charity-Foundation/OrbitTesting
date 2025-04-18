
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { FundingCycle } from "@/types/donor";

const FundingCycles: React.FC = () => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const fundingData: FundingCycle[] = [
    { 
      name: "FCDO", 
      width: "w-32", 
      position: 2, 
      color: "bg-[#F6B93E]", 
      status: "Upcoming",
      startMonth: 2,
      endMonth: 6,
      description: "Upcoming funding cycle for FCDO starting in March. Expected to support educational initiatives."
    },
    { 
      name: "Global Fund", 
      width: "w-[135px]", 
      position: 8, 
      color: "bg-[#A7ADB4]", 
      status: "Closed",
      startMonth: 8,
      endMonth: 11,
      description: "This funding cycle has been closed. No active projects currently funded by Global Fund."
    },
    { 
      name: "UNICEF", 
      width: "w-[262px]", 
      position: 4, 
      color: "bg-[#3AA072]", 
      status: "Ongoing",
      startMonth: 4,
      endMonth: 9,
      description: "Active funding from UNICEF supporting child health initiatives from May through October."
    },
    { 
      name: "UNISEF", 
      width: "w-[216px]", 
      position: 6, 
      color: "bg-[#3AA072]", 
      status: "Ongoing",
      startMonth: 6,
      endMonth: 10,
      description: "Current UNISEF funding for educational programs running from July to November."
    },
    { 
      name: "USAID", 
      width: "w-[321px]", 
      position: 1, 
      color: "bg-[#F6B93E]", 
      status: "Upcoming",
      startMonth: 1,
      endMonth: 7,
      description: "Upcoming USAID funding cycle for infrastructure development beginning in February."
    },
    { 
      name: "WHO", 
      width: "w-[180px]", 
      position: 3, 
      color: "bg-[#3AA072]", 
      status: "Ongoing",
      startMonth: 3,
      endMonth: 7,
      description: "Current WHO funding for pandemic preparedness initiatives in the region."
    },
    { 
      name: "Gates Foundation", 
      width: "w-[200px]", 
      position: 5, 
      color: "bg-[#F6B93E]", 
      status: "Upcoming",
      startMonth: 5,
      endMonth: 9,
      description: "Upcoming funding from Gates Foundation for vaccine distribution programs."
    }
  ];

  const statusLegend = [
    { status: "Ongoing", color: "bg-[#3AA072]" },
    { status: "Upcoming", color: "bg-[#F6B93E]" },
    { status: "Closed", color: "bg-[#A7ADB4]" },
  ];

  const getPositionStyle = (position: number, width: string) => {
    // Calculate position based on month
    return {
      marginLeft: `${(position / 12) * 100}%`,
      width: width.includes('px') ? width.replace('w-[', '').replace('px]', '') + 'px' : 'auto'
    };
  };

  return (
    <section className="bg-white mb-6 p-6 rounded-[10px] max-md:p-4 max-sm:p-4">
      <h2 className="text-lg font-bold text-[#383839] mb-4 max-md:text-base max-sm:text-base">
        Funding Cycles
      </h2>
      
      <div className="flex justify-between mb-2 max-md:gap-6 max-sm:gap-4 border-b border-gray-200 pb-2">
        {months.map((month) => (
          <div key={month} className="text-xs text-[rgba(0,0,0,0.6)]">
            {month}
          </div>
        ))}
      </div>
      
      <div className="flex">
        {/* Left side for donor names with vertical separator */}
        <div className="pr-4 border-r border-gray-200 min-w-[120px]">
          {fundingData.map((fund, index) => (
            <div key={index} className="h-14 flex items-center">
              <div className="text-xs text-[rgba(0,0,0,0.6)]">{fund.name}</div>
            </div>
          ))}
        </div>

        {/* Right side for funding cycle bars */}
        <ScrollArea className="flex-1 h-[310px] overflow-y-auto pr-2">
          <div className="relative">
            {fundingData.map((fund, index) => (
              <div key={index} className="h-14 flex items-center relative">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div 
                        className={`h-8 ${fund.color} rounded-[3px] absolute hover:opacity-80 transition-opacity cursor-pointer`}
                        style={getPositionStyle(fund.position, fund.width)}
                      />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs p-2">
                      <p className="font-medium">{fund.name}</p>
                      <p className="text-xs mt-1">{fund.description}</p>
                      <p className="text-xs mt-1">Status: {fund.status}</p>
                      {fund.startMonth && fund.endMonth && (
                        <p className="text-xs mt-1">Period: {months[fund.startMonth-1]} - {months[fund.endMonth-1]}</p>
                      )}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      <Separator className="my-4" />
      
      <div className="flex gap-14 mt-2">
        {statusLegend.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-4 h-4 ${item.color} rounded-sm`} />
            <div className="text-xs text-black">{item.status}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FundingCycles;
