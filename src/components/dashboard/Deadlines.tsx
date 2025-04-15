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
  const statusColors = {
    Urgent: "bg-red-100 border-red-200 text-red-800",
    "Due Soon": "bg-orange-100 border-orange-200 text-orange-800",
    Upcoming: "bg-green-100 border-green-200 text-green-800",
  };

  return (
    <div className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 bg-white mb-3 transition-colors">
      <div className="flex flex-col gap-2">
        <h4 className="text-sm font-medium text-gray-800">{item.title}</h4>
        <p className="text-xs text-gray-600">{item.organization}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500">{item.dueDate}</span>
          <span
            className={`${
              statusColors[item.status]
            } text-xs px-2 py-1 rounded-full`}
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
      <div className="h-[300px] overflow-y-auto pr-2">
        <div className="flex gap-4">
          {/* Numbered List */}
          <div className="flex flex-col items-center">
            {deadlinesData.map((_, index) => (
              <div key={index} className="relative">
                <div className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600">
                  {index + 1}
                </div>
                {index < deadlinesData.length - 1 && (
                  <div className="h-[100px] w-px bg-gray-200 my-2" />
                )}
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
