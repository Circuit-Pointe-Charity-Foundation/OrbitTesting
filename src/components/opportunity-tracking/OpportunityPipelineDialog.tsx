
import React from "react";
import { X, ArrowRight } from "lucide-react";
import { Opportunity } from "@/types/opportunity";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";

interface OpportunityPipelineDialogProps {
  isOpen: boolean;
  onClose: () => void;
  opportunities: Opportunity[];
}

const OpportunityPipelineDialog: React.FC<OpportunityPipelineDialogProps> = ({
  isOpen,
  onClose,
  opportunities
}) => {
  // Pipeline stages
  const stages = [
    { name: "Identified", filter: (opp: Opportunity) => opp.status === "To Review" },
    { name: "Qualified", filter: (opp: Opportunity) => opp.status === "In Progress" },
    { name: "Sent", filter: (opp: Opportunity) => opp.status === "Submitted" },
    { name: "Approved", filter: (opp: Opportunity) => opp.status === "Awarded" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Opportunity Pipeline</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        
        <div className="mt-6">
          <div className="flex justify-between mb-2">
            {stages.map((stage, index) => (
              <div key={stage.name} className="flex items-center">
                <div className="text-sm font-medium text-gray-700">{stage.name}</div>
                {index < stages.length - 1 && (
                  <ArrowRight className="h-4 w-4 mx-4 text-gray-400" />
                )}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {stages.map((stage) => {
              const stageOpportunities = opportunities.filter(stage.filter);
              
              return (
                <div key={stage.name} className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-3 flex justify-between items-center">
                    <span>{stageOpportunities.length} opportunities</span>
                    <span className="font-medium">${stageOpportunities.reduce((sum, opp) => sum + (opp.amount || 0), 0).toLocaleString()}</span>
                  </div>
                  
                  <div className="space-y-3">
                    {stageOpportunities.map((opp) => (
                      <div key={opp.id} className="bg-white p-3 rounded-md border border-gray-200 shadow-sm">
                        <div className="font-medium">{opp.title}</div>
                        <div className="text-sm text-gray-600">{opp.donorName}</div>
                        {opp.amount && (
                          <div className="text-sm font-medium mt-1">${opp.amount.toLocaleString()}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpportunityPipelineDialog;
