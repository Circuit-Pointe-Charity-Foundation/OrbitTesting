
import React from "react";
import { format } from "date-fns";
import { X, Calendar, FileText, User } from "lucide-react";
import { Opportunity } from "@/types/opportunity";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface OpportunityDetailDialogProps {
  opportunity: Opportunity | null;
  isOpen: boolean;
  onClose: () => void;
}

// Helper to get status badge color
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

const OpportunityDetailDialog: React.FC<OpportunityDetailDialogProps> = ({
  opportunity,
  isOpen,
  onClose,
}) => {
  if (!opportunity) return null;

  const deadlineDate = new Date(opportunity.deadline);
  const formattedDeadline = format(deadlineDate, "MMMM dd, yyyy");
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-xl">{opportunity.title}</DialogTitle>
              <span className="text-sm text-gray-600">{opportunity.donorName}</span>
            </div>
            <Badge className={`${getStatusColor(opportunity.status)} hover:${getStatusColor(opportunity.status)}`}>
              {opportunity.status}
            </Badge>
          </div>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        
        <div className="mt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="col-span-2 space-y-6">
              {/* Basic Details */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Opportunity Details</h3>
                <div className="space-y-2">
                  {opportunity.amount && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-medium">${opportunity.amount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{opportunity.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Deadline:</span>
                    <span className="font-medium">{formattedDeadline}</span>
                  </div>
                  {opportunity.sector && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Sector:</span>
                      <span className="font-medium">{opportunity.sector}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Description / Notes */}
              {opportunity.notes && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Notes</h3>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{opportunity.notes}</p>
                </div>
              )}
              
              {/* Status Timeline */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Status Timeline</h3>
                <div className="relative pl-6 border-l border-gray-200 space-y-4">
                  <div className="relative">
                    <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-purple-500"></div>
                    <div className="text-sm">
                      <span className="font-medium">Created</span>
                      <span className="text-xs text-gray-500 ml-2">
                        {format(new Date(opportunity.createdAt), "MMM dd, yyyy h:mm a")}
                      </span>
                      <p className="text-xs text-gray-600 mt-1">Opportunity was created</p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-blue-400"></div>
                    <div className="text-sm">
                      <span className="font-medium">Status: {opportunity.status}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        {format(new Date(opportunity.updatedAt), "MMM dd, yyyy h:mm a")}
                      </span>
                      <p className="text-xs text-gray-600 mt-1">Current status</p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-orange-400"></div>
                    <div className="text-sm">
                      <span className="font-medium">Deadline</span>
                      <span className="text-xs text-gray-500 ml-2">
                        {formattedDeadline}
                      </span>
                      <p className="text-xs text-gray-600 mt-1">Submission deadline</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              {/* Assignee */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Team</h3>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-800 text-sm font-medium">
                    {opportunity.assignedTo.split(" ").map(name => name[0]).join("")}
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium">{opportunity.assignedTo}</div>
                    <div className="text-xs text-gray-500">Assigned</div>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>View Deadline</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Add Document</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    <span>Reassign</span>
                  </Button>
                </div>
              </div>
              
              {/* Related Links/Contacts */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Related</h3>
                <div className="text-sm">
                  <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">
                    View Donor Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpportunityDetailDialog;
