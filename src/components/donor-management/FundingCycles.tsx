
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
      position: 1, 
      color: "bg-[#F6B93E]", 
      status: "Upcoming",
      startMonth: 2,
      endMonth: 6,
      description: "Upcoming funding cycle for FCDO starting in March. Expected to support educational initiatives."
    },
    { 
      name: "Global Fund", 
      width: "w-[135px]", 
      position: 7, 
      color: "bg-[#A7ADB4]", 
      status: "Closed",
      startMonth: 8,
      endMonth: 11,
      description: "This funding cycle has been closed. No active projects currently funded by Global Fund."
    },
    { 
      name: "UNICEF", 
      width: "w-[262px]", 
      position: 3, 
      color: "bg-[#3AA072]", 
      status: "Ongoing",
      startMonth: 4,
      endMonth: 9,
      description: "Active funding from UNICEF supporting child health initiatives from May through October."
    },
    { 
      name: "UNISEF", 
      width: "w-[216px]", 
      position: 5, 
      color: "bg-[#3AA072]", 
      status: "Ongoing",
      startMonth: 6,
      endMonth: 10,
      description: "Current UNISEF funding for educational programs running from July to November."
    },
    { 
      name: "USAID", 
      width: "w-[321px]", 
      position: 0, 
      color: "bg-[#F6B93E]", 
      status: "Upcoming",
      startMonth: 1,
      endMonth: 7,
      description: "Upcoming USAID funding cycle for infrastructure development beginning in February."
    },
    { 
      name: "WHO", 
      width: "w-[180px]", 
      position: 2, 
      color: "bg-[#3AA072]", 
      status: "Ongoing",
      startMonth: 3,
      endMonth: 7,
      description: "Current WHO funding for pandemic preparedness initiatives in the region."
    },
    { 
      name: "Gates Foundation", 
      width: "w-[200px]", 
      position: 4, 
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

  const getPositionStyle = (cycle: FundingCycle) => {
    // Calculate position based on actual start month (0-indexed)
    const startMonthIndex = cycle.startMonth - 1;
    const endMonthIndex = cycle.endMonth - 1;
    const width = (endMonthIndex - startMonthIndex + 1) * (100/12);
    
    return {
      left: `${(startMonthIndex / 12) * 100}%`,
      width: `${width}%`
    };
  };

  return (
    <section className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Funding Cycles</h2>
      
      <div className="flex">
        {/* Left side for donor names with vertical separator */}
        <div className="w-[140px] min-w-[140px] pr-4 border-r border-gray-200">
          <div className="h-8" /> {/* Spacer for alignment with months */}
          {fundingData.map((fund, index) => (
            <div key={index} className="h-14 flex items-center">
              <span className="text-sm text-gray-600 font-medium">{fund.name}</span>
            </div>
          ))}
        </div>

        {/* Right side for funding cycle bars */}
        <div className="flex-1 overflow-hidden pl-4">
          <div className="flex justify-between mb-2 px-2">
            {months.map((month) => (
              <div key={month} className="text-sm text-gray-500 font-medium">
                {month}
              </div>
            ))}
          </div>
          
          <ScrollArea className="h-[310px]">
            <div className="relative">
              {fundingData.map((fund, index) => (
                <div key={index} className="h-14 flex items-center relative">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div 
                          className={`h-8 ${fund.color} rounded transition-opacity duration-200 absolute hover:opacity-90 cursor-pointer`}
                          style={getPositionStyle(fund)}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-xs p-3">
                        <p className="font-medium text-sm">{fund.name}</p>
                        <p className="text-xs mt-1 text-gray-500">{fund.description}</p>
                        <p className="text-xs mt-1 font-medium">Status: {fund.status}</p>
                        {fund.startMonth && fund.endMonth && (
                          <p className="text-xs mt-1">
                            Period: {months[fund.startMonth-1]} - {months[fund.endMonth-1]}
                          </p>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <div className="flex gap-8">
        {statusLegend.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-3 h-3 ${item.color} rounded-sm`} />
            <span className="text-sm text-gray-700">{item.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FundingCycles;
