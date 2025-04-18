import React from "react";

const FundingCycles: React.FC = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const fundingData = [
    { name: "FCDO", width: "w-32", color: "bg-[#F6B93E]" },
    { name: "Global Fund", width: "w-[135px]", color: "bg-[#A7ADB4]" },
    { name: "UNICEF", width: "w-[262px]", color: "bg-[#3AA072]" },
    { name: "UNISEF", width: "w-[216px]", color: "bg-[#3AA072]" },
    { name: "USAID", width: "w-[321px]", color: "bg-[#F6B93E]" },
  ];

  const statusLegend = [
    { status: "Ongoing", color: "bg-[#3AA072]" },
    { status: "Upcoming", color: "bg-[#F6B93E]" },
    { status: "Closed", color: "bg-[#A7ADB4]" },
  ];

  return (
    <section className="bg-white mb-6 p-6 rounded-[10px] max-md:p-4 max-sm:p-4">
      <h2 className="text-lg text-[#383839] mb-4 max-md:text-base max-sm:text-base">
        Funding Cycles
      </h2>
      <div className="flex justify-between mb-4 max-md:gap-6 max-sm:gap-4">
        {months.map((month) => (
          <div key={month} className="text-xs text-[rgba(0,0,0,0.6)]">
            {month}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-6 mb-6 max-md:gap-4 max-sm:gap-3">
        {fundingData.map((fund, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="text-xs text-[rgba(0,0,0,0.6)]">{fund.name}</div>
            <div className={`${fund.width} h-8 ${fund.color} rounded-[3px]`} />
          </div>
        ))}
      </div>
      <div className="flex gap-14">
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
