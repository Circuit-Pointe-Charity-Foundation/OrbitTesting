
import React from "react";
import { format } from "date-fns";
import { Opportunity } from "@/types/opportunity";
import { 
  CircleCheck, 
  CircleX, 
  CircleMinus, 
  CircleAlert, 
  CircleDot 
} from "lucide-react";

interface OpportunityCardProps {
  opportunity: Opportunity;
  onClick: (opportunity: Opportunity) => void;
}

// Helper to check if a deadline is urgent (within 7 days)
const isUrgent = (deadline: string) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 7 && diffDays >= 0;
};

// Helper to check if a deadline is due soon (within 14 days)
const isDueSoon = (deadline: string) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 14 && diffDays > 7;
};

// Helper to determine status color
const getStatusColor = (status: string) => {
  switch (status) {
    case "To Review":
      return "bg-gray-400";
    case "In Progress":
      return "bg-orange-400";
    case "Submitted":
      return "bg-blue-500";
    case "Awarded":
      return "bg-green-500";
    case "Declined":
      return "bg-red-500";
    default:
      return "bg-gray-400";
  }
};

// Helper to determine status icon
const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "To Review":
      return <CircleDot className="h-5 w-5 text-gray-600" />;
    case "In Progress":
      return <CircleAlert className="h-5 w-5 text-orange-600" />;
    case "Submitted":
      return <CircleMinus className="h-5 w-5 text-blue-600" />;
    case "Awarded":
      return <CircleCheck className="h-5 w-5 text-green-600" />;
    case "Declined":
      return <CircleX className="h-5 w-5 text-red-600" />;
    default:
      return <CircleDot className="h-5 w-5 text-gray-600" />;
  }
};

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, onClick }) => {
  const deadlineDate = new Date(opportunity.deadline);
  const formattedDeadline = format(deadlineDate, "MMM dd, yyyy");
  
  // Determine the deadline urgency class
  let deadlineClass = "text-green-500"; // Default - not urgent
  if (isUrgent(opportunity.deadline)) {
    deadlineClass = "text-red-500 font-bold";
  } else if (isDueSoon(opportunity.deadline)) {
    deadlineClass = "text-orange-500";
  }

  return (
    <div 
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-3 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick(opportunity)}
    >
      <div className="font-medium text-base truncate">{opportunity.title}</div>
      <div className="text-sm text-gray-600">{opportunity.donorName}</div>
      
      <div className="flex justify-between items-center mt-2">
        <div className={`text-sm ${deadlineClass}`}>
          {formattedDeadline}
        </div>
        <div className="flex items-center">
          <StatusIcon status={opportunity.status} />
        </div>
      </div>
      
      <div className="flex items-center mt-3 pt-3 border-t border-gray-100">
        <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-800 text-xs font-medium">
          {opportunity.assignedTo.split(" ").map(name => name[0]).join("")}
        </div>
        <span className="text-xs text-gray-500 ml-2">{opportunity.assignedTo}</span>
      </div>
    </div>
  );
};

export default OpportunityCard;
