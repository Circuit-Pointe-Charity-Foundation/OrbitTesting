
import React from "react";
import { Button } from "@/components/ui/button";
import { Send, Calendar as CalendarIcon, Mail } from "lucide-react";

const QuickActionsCard: React.FC = () => (
  <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col space-y-2">
    <h3 className="text-md font-semibold mb-2">Quick Actions</h3>
    <Button variant="outline" className="w-full justify-start">
      <Send className="h-4 w-4 mr-2" />
      Send to Review
    </Button>
    <Button variant="outline" className="w-full justify-start">
      <CalendarIcon className="h-4 w-4 mr-2" />
      Schedule Meeting
    </Button>
    <Button variant="outline" className="w-full justify-start">
      <Mail className="h-4 w-4 mr-2" />
      Email Donor
    </Button>
  </div>
);

export default QuickActionsCard;
