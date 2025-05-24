
import React, { useState } from "react";
import { Calendar as CalendarIcon, ArrowLeft, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface OpportunityCalendarCardProps {
  month: number;
  year: number;
  onMonthChange: (inc: number) => void;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const OpportunityCalendarCard: React.FC<OpportunityCalendarCardProps> = ({
  month, year, onMonthChange
}) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>();

  const onDayClick = (date?: Date) => {
    setSelectedDay(date);
    // Future: Open add-note modal for this date!
    if (date) alert(`Add note for ${date.toDateString()}`);
  };

  return (
    <Card className="p-6 flex flex-col h-full">
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          Opportunity Calendar
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => onMonthChange(-1)} className="hover:bg-accent p-1 rounded">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <span className="px-2 text-sm font-medium">{MONTHS[month]} {year}</span>
          <button onClick={() => onMonthChange(1)} className="hover:bg-accent p-1 rounded">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div>
        <Calendar
          mode="single"
          onSelect={onDayClick}
          selected={selectedDay}
          month={new Date(year, month, 1)}
          className={cn("p-3 pointer-events-auto")}
          showOutsideDays={false}
        />
      </div>
    </Card>
  );
};

export default OpportunityCalendarCard;
