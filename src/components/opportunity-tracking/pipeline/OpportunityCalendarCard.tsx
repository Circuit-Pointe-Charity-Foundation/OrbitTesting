
import React, { useState } from "react";
import { Calendar as CalendarIcon, ArrowLeft, ArrowRight, BellPlus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import ReminderForm from "./ReminderForm";

// Per-day reminders for demo (local state only)
type Reminder = { date: string; text: string };

interface OpportunityCalendarCardProps {
  month: number;
  year: number;
  setMonth: (inc: number) => void;
  setYear: (y: number) => void;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const OpportunityCalendarCard: React.FC<OpportunityCalendarCardProps> = ({
  month, year, setMonth, setYear,
}) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showReminderForm, setShowReminderForm] = useState(false);

  // Responsive calendar fill
  const today = new Date();
  // const cardMonth = new Date(year, month, 1);  // Not needed

  // Helper for reminders per day by ISO string
  const getDailyReminder = (date: Date) =>
    reminders.find(r => r.date === date.toISOString().substring(0,10));

  const onDayClick = (date?: Date) => {
    if (!date) return;
    setSelectedDay(date);
    setShowReminderForm(true);
  };

  const handleReminderSave = (reminderText: string) => {
    if (!selectedDay) return setShowReminderForm(false);
    const key = selectedDay.toISOString().substring(0,10);
    setReminders((prev) => {
      // Replace if exists
      const filtered = prev.filter(r => r.date !== key);
      return reminderText ? [...filtered, { date: key, text: reminderText }] : filtered;
    });
    setShowReminderForm(false);
    setSelectedDay(undefined);
  };

  const handleMonthChange = (inc: number) => {
    let m = month + inc;
    let y = year;
    if (m > 11) { m = 0; y++; }
    else if (m < 0) { m = 11; y--; }
    setMonth(m);
    setYear(y);
  };

  // Custom DayContent for react-day-picker
  const DayContent = (props: { date: Date; }) => {
    const reminder = getDailyReminder(props.date);
    return (
      <div 
        className={cn(
          "relative flex items-center justify-center w-full h-full",
          reminder ? "bg-violet-500 text-white rounded-full" : ""
        )}
        style={{ minWidth: 24, minHeight: 24 }}
      >
        <span>{props.date.getDate()}</span>
        {reminder && (
          <BellPlus className="absolute left-2 top-2 h-4 w-4 text-white bg-violet-500 rounded-full" />
        )}
      </div>
    );
  };

  return (
    <Card className="p-6 flex flex-col h-full">
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          Opportunity Calendar
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => handleMonthChange(-1)} className="hover:bg-accent p-1 rounded">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <span className="px-2 text-sm font-medium">{MONTHS[month]} {year}</span>
          <button onClick={() => handleMonthChange(1)} className="hover:bg-accent p-1 rounded">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      {/* Calendar now fills the card horizontally and is centered */}
      <div className="flex flex-1 items-center justify-center w-full h-full mt-2">
        <Calendar
          mode="single"
          onSelect={onDayClick}
          selected={selectedDay}
          month={new Date(year, month, 1)}
          className={cn("pointer-events-auto w-full max-w-none")}
          showOutsideDays={false}
          modifiers={{
            hasReminder: (date) => !!getDailyReminder(date),
            today: (date) => date.toDateString() === today.toDateString(),
          }}
          modifiersClassNames={{
            hasReminder: "bg-violet-500 text-white rounded-full cursor-pointer",
            today: "border border-blue-500",
          }}
          components={{
            DayContent: DayContent,
          }}
        />
      </div>
      {/* Add Reminder Modal */}
      {showReminderForm && (
        <ReminderForm
          open={showReminderForm}
          onClose={() => setShowReminderForm(false)}
          date={selectedDay}
          initialValue={selectedDay && getDailyReminder(selectedDay)?.text || ""}
          onSave={handleReminderSave}
        />
      )}
    </Card>
  );
};

export default OpportunityCalendarCard;
