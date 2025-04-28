
import React from "react";
import { Opportunity, OpportunityStatus } from "@/types/opportunity";
import OpportunityCard from "./OpportunityCard";

interface KanbanBoardProps {
  opportunities: Opportunity[];
  onCardClick: (opportunity: Opportunity) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ opportunities, onCardClick }) => {
  // Define the columns for the Kanban board
  const columns: OpportunityStatus[] = ["To Review", "In Progress", "Submitted", "Awarded", "Declined"];
  
  // Helper to get color for column header
  const getColumnHeaderColor = (status: OpportunityStatus) => {
    switch (status) {
      case "To Review":
        return "bg-gray-400 text-white";
      case "In Progress":
        return "bg-orange-400 text-white";
      case "Submitted":
        return "bg-blue-500 text-white";
      case "Awarded":
        return "bg-green-500 text-white";
      case "Declined":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      {columns.map((status) => (
        <div key={status} className="bg-gray-50 rounded-lg p-3 h-full">
          <div className={`${getColumnHeaderColor(status)} rounded-lg p-2 mb-4 text-center`}>
            <h3 className="font-medium">{status}</h3>
          </div>
          
          <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-240px)] pr-1">
            {opportunities
              .filter(opportunity => opportunity.status === status)
              .map(opportunity => (
                <OpportunityCard 
                  key={opportunity.id} 
                  opportunity={opportunity} 
                  onClick={onCardClick}
                />
              ))
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
