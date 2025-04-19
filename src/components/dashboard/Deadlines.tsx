import React from "react";

interface DeadlineItem {
  id: string;
  title: string;
  organization: string;
  dueDate: string;
  status: "Urgent" | "Due Soon" | "Upcoming";
}

const deadlinesData: DeadlineItem[] = [
  {
    id: "1",
    title: 'Proposal: "Youth Empowerment Plan"',
    organization: "UNICEF",
    dueDate: "Due: Today",
    status: "Urgent",
  },
  {
    id: "2",
    title: 'Opportunity: "Community Health Grant"',
    organization: "WUO",
    dueDate: "Due in 2 days",
    status: "Due Soon",
  },
  {
    id: "3",
    title: 'Proposal: "Water for All"',
    organization: "WaterAid",
    dueDate: "Due in 1 week",
    status: "Upcoming",
  },
];

interface DeadlineProps {
  item: DeadlineItem;
}

const Deadline: React.FC<DeadlineProps> = ({ item }) => {
  const cardBgColors = {
    Urgent: "bg-red-100", // #fee2e2
    "Due Soon": "bg-orange-100", // #ffedd5
    Upcoming: "bg-green-100", // #dcfce7
  };

  const statusBgColors = {
    Urgent: "bg-red-600", // #dc2626
    "Due Soon": "bg-orange-600", // #ea580c
    Upcoming: "bg-green-600", // #16a34a
  };

  return (
    <div className={`p-4 rounded-lg ${cardBgColors[item.status]} mb-5`}>
      <div className="flex flex-col gap-1">
        <h4 className="text-lg font-medium text-gray-800">{item.title}</h4>
        <p className="text-xs text-gray-600">{item.organization}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-500">{item.dueDate}</span>
          <span
            className={`${
              statusBgColors[item.status]
            } text-white text-xs px-3 py-1.5 rounded-md font-medium`}
          >
            {item.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export const Deadlines: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Upcoming Deadlines
        </h3>
      </div>
      <div className="border-b border-gray-200 mb-4" />
      <div className="h-[300px] overflow-y-auto">
        <div className="flex gap-4">
          {/* Numbered List - Fixed Version */}
          <div className="relative" style={{ minWidth: "24px" }}>
            {/* Vertical line spanning all cards */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 transform -translate-x-1/2" />

            {/* Number circles positioned along the line */}
            {deadlinesData.map((_, index) => (
              <div
                key={index}
                className="absolute"
                style={{ top: `${index * 120 + 28}px` }} // Adjust 120px per card, 28px offset
              >
                <div className="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 rounded-full text-xs font-medium text-gray-600 z-10 transform -translate-x-1/2 ml-3">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Deadlines List */}
          <div className="flex-1">
            {deadlinesData.map((item) => (
              <Deadline key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
