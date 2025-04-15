import React, { useState } from "react";

interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  color: string;
}

interface DayProps {
  date: Date;
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  currentDate: Date;
  onEventClick: (event: CalendarEvent) => void; // New prop for event click
}

const Day: React.FC<DayProps> = ({
  date,
  events,
  onDateClick,
  currentDate,
  onEventClick,
}) => {
  const dayNumber = date.getDate();
  const today = new Date();
  const isOtherMonth = date.getMonth() !== currentDate.getMonth();

  return (
    <div
      className={`p-2 border border-transparent rounded-md cursor-pointer
      hover:bg-gray-100 min-h-[80px] ${
        date.toDateString() === today.toDateString() ? "bg-blue-50" : ""
      } ${isOtherMonth ? "text-gray-400 bg-gray-50" : "text-gray-800"}`}
      onClick={() => onDateClick(date)}
    >
      <div className="text-right text-sm text-gray-600 mb-1">{dayNumber}</div>
      <div className="space-y-1">
        {events.map((event) => (
          <div
            key={event.id}
            className="text-xs p-1 rounded truncate cursor-pointer" // Added cursor-pointer
            style={{ backgroundColor: event.color }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent date click
              onEventClick(event);
            }}
          >
            <span>{event.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [clickedEvent, setClickedEvent] = useState<CalendarEvent | null>(null); // State for clicked event

  const generateCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const calendarDays: Date[] = [];

    const startDay = firstDay.getDay();
    for (let i = startDay - 1; i >= 0; i--) {
      calendarDays.push(new Date(year, month, -i));
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      calendarDays.push(new Date(year, month, i));
    }

    const endDay = lastDay.getDay();
    for (let i = 1; i <= 6 - endDay; i++) {
      calendarDays.push(new Date(year, month + 1, i));
    }

    return calendarDays;
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId));
    setClickedEvent(null); // Close the preview after deletion
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleAddEvent = () => {
    if (selectedDate && newEventTitle.trim()) {
      setEvents([
        ...events,
        {
          id: Date.now().toString(),
          date: selectedDate,
          title: newEventTitle,
          color: "#" + Math.floor(Math.random() * 16777215).toString(16),
        },
      ]);
      setSelectedDate(null);
      setNewEventTitle("");
    }
  };

  return (
    <div className="bg-white flex w-full flex-col mt-8 px-5 py-6 rounded-2xl shadow-sm relative">
      <div className="flex w-full items-center justify-between mb-4">
        <h2 className="text-black text-xl font-semibold">Calendar</h2>
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevMonth}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              ◀
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              ▶
            </button>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 mb-3"></div>

      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
        {generateCalendar(currentDate).map((date, index) => (
          <Day
            key={index}
            date={date}
            events={events.filter(
              (e) => e.date.toDateString() === date.toDateString()
            )}
            onDateClick={setSelectedDate}
            currentDate={currentDate}
            onEventClick={setClickedEvent} // Pass the setClickedEvent function
          />
        ))}
      </div>

      {clickedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">{clickedEvent.title}</h3>
            <div className="text-sm text-gray-500 mb-3">
              {clickedEvent.date.toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setClickedEvent(null)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm"
              >
                Close
              </button>
              <button
                onClick={() => handleDeleteEvent(clickedEvent.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">
              Add Event for {selectedDate.toLocaleDateString()}
            </h3>
            <input
              type="text"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              placeholder="Event title"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedDate(null)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
