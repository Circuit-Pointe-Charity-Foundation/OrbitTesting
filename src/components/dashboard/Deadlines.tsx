import React from "react";

interface DeadlineProps {
  number: string;
  title: string;
  organization: string;
  dueDate: string;
  status: "Urgent" | "Due Soon" | "Upcoming";
  bgColor: string;
}

const Deadline: React.FC<DeadlineProps> = ({
  number,
  title,
  organization,
  dueDate,
  status,
  bgColor,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "Urgent":
        return "bg-red-600";
      case "Due Soon":
        return "bg-orange-600";
      case "Upcoming":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="w-full">
      <div
        className={`${bgColor} flex flex-col items-stretch justify-center px-4 py-5 rounded-[10px]`}
      >
        <div className="w-full">
          <div className="w-full font-normal">
            <div className="text-black text-sm">{title}</div>
            <div className="text-black text-xs mt-3">{organization}</div>
          </div>
          <div className="flex w-full gap-8 mt-1">
            <div className="text-black text-sm font-normal">{dueDate}</div>
            <div className="text-[10px] text-white font-semibold whitespace-nowrap w-[72px]">
              <div
                className={`${getStatusColor()} px-[7px] py-1.5 rounded-[5px]`}
              >
                {status}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Deadlines: React.FC = () => {
  return (
    <div>
      <div className="text-black text-sm font-normal leading-none mt-10">
        Upcoming Deadlines
      </div>
      <div className="border shrink-0 h-px mt-[7px] border-[rgba(233,233,233,1)] border-solid" />
      <div className="self-center flex w-[258px] max-w-full items-stretch gap-[18px] mt-6">
        <div className="text-xs text-[rgba(88,88,88,1)] font-medium whitespace-nowrap leading-none mt-[26px] max-md:hidden">
          <div className="w-full">
            <div className="bg-white border w-7 h-7 px-[11px] rounded-[50%] border-[rgba(233,233,233,1)] border-solid">
              1
            </div>
          </div>
          <div className="w-full mt-[132px] max-md:mt-10">
            <div className="bg-white border w-7 h-7 px-2.5 rounded-[50%] border-[rgba(233,233,233,1)] border-solid">
              2
            </div>
          </div>
          <div className="w-full mt-[132px] max-md:mt-10">
            <div className="bg-white border w-7 h-7 px-2.5 rounded-[50%] border-[rgba(233,233,233,1)] border-solid">
              3
            </div>
          </div>
        </div>
        <div>
          <Deadline
            number="1"
            title='Proposal: "Youth Empowerment Plan"'
            organization="UNICEF"
            dueDate="Due: Today"
            status="Urgent"
            bgColor="bg-red-100"
          />
          <div className="mt-8">
            <Deadline
              number="2"
              title='Opportunity: "Community Health Grant"'
              organization="WUO"
              dueDate="Due in 2 days"
              status="Due Soon"
              bgColor="bg-orange-100"
            />
          </div>
          <div className="mt-8">
            <Deadline
              number="3"
              title='Proposal: "Water for All"'
              organization="WaterAid"
              dueDate="Due in 1 week"
              status="Upcoming"
              bgColor="bg-green-100"
            />
          </div>
        </div>
      </div>
      <div className="border shrink-0 h-px mt-[29px] border-[rgba(233,233,233,1)] border-solid" />
    </div>
  );
};
