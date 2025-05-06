
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
  index: number;
  isLast: boolean;
}

const Deadline: React.FC<DeadlineProps> = ({ item, index, isLast }) => {
  // color config same as before
  const cardBgColors = {
    Urgent: "bg-red-100",
    "Due Soon": "bg-orange-100",
    Upcoming: "bg-green-100",
  };
  const statusBgColors = {
    Urgent: "bg-red-600",
    "Due Soon": "bg-orange-600",
    Upcoming: "bg-green-600",
  };

  return (
    <div className="relative flex items-start group">
      {/* Timeline/Index */}
      <div className="flex flex-col items-center z-10" style={{ width: 32 }}>
        {/* Short top line */}
        {index !== 0 && (
          <div className="w-1 h-[18px] bg-gray-300" />
        )}
        {/* Circle with number (centered number) */}
        <div className="flex items-center justify-center w-7 h-7 rounded-full border-2 border-gray-300 bg-white text-gray-700 font-semibold text-xs">
          {index + 1}
        </div>
        {/* Long bottom line */}
        {!isLast && (
          <div className="w-1 flex-1 bg-gray-300 min-h-[36px]" />
        )}
      </div>
      {/* Card */}
      <div className={`flex-1 ml-4 mb-6`}>
        <div className={`p-4 rounded-lg ${cardBgColors[item.status]} mb-2`}>
          <div className="flex flex-col gap-1">
            <h4 className="card-title text-gray-800">{item.title}</h4>
            <p className="caption-text text-gray-600">{item.organization}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">{item.dueDate}</span>
              <span
                className={`${statusBgColors[item.status]} text-white badge-text px-3 py-1.5 rounded-md`}
              >
                {item.status}
              </span>
            </div>
          </div>
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
      <div className="h-[300px] overflow-y-auto pr-2">
        <div className="flex flex-col">
          {deadlinesData.map((item, idx) => (
            <Deadline
              key={item.id}
              item={item}
              index={idx}
              isLast={idx === deadlinesData.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
