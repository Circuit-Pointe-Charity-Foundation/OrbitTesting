import React from "react";
import { Opportunity, OpportunityPipeline } from "@/types/opportunity";
import PipelineCard from "./PIpelineCard";

interface KanbanBoardProps {
  opportunities: Opportunity[];
  onCardClick: (opportunity: Opportunity) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  opportunities,
  onCardClick,
}) => {
  const columns: OpportunityPipeline[] = [
    "Identified",
    "Qualified",
    "Sent",
    "Approved",
  ];

  const getColumnHeaderColor = (status: OpportunityPipeline) => {
    const colors = {
      Identified: "bg-[#938b97]",
      Qualified: "bg-[#e59346]",
      Sent: "bg-[#4f46e5]",
      Approved: "bg-[#09c127]",
    };
    return colors[status];
  };

  const getCountTextColor = (status: OpportunityPipeline) => {
    const colors = {
      Identified: "text-[#938b97]",
      Qualified: "text-[#e59346]",
      Sent: "text-[#4f46e5]",
      Approved: "text-[#09c127]",
    };
    return colors[status];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
      {columns.map((status) => {
        const count = opportunities.filter(
          (opp) => opp.pipeline === status
        ).length;
        const columnOpportunities = opportunities.filter(
          (opp) => opp.pipeline === status
        );

        return (
          <div key={status} className="flex flex-col h-full">
            {/* Column Header */}
            <div
              className={`${getColumnHeaderColor(
                status
              )} p-2 rounded-full flex items-center`}
            >
              <div className="flex items-center gap-3 w-full justify-start">
                <span
                  className={`bg-white px-2.5 py-0.5 rounded-full text-base font-medium ${getCountTextColor(
                    status
                  )}`}
                >
                  {count}
                </span>
                <span className="font-medium text-base text-white">
                  {status}
                </span>
              </div>
            </div>

            {/* Opportunities List */}
            <div className="mt-2 space-y-2 flex-1 overflow-y-auto">
              {columnOpportunities.length > 0 ? (
                columnOpportunities.map((opportunity) => (
                  <PipelineCard
                    key={opportunity.id}
                    opportunity={opportunity}
                    onClick={onCardClick}
                  />
                ))
              ) : (
                <div className="p-4 text-center text-sm text-gray-500 bg-gray-50 rounded-lg">
                  No opportunities
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
