import React from "react";

interface NotificationProps {
  icon: string;
  message: string;
  time: string;
}

const Notification: React.FC<NotificationProps> = ({ icon, message, time }) => {
  return (
    <div className="flex w-full gap-2">
      <div className="bg-[rgba(237,238,252,1)] flex items-center justify-center w-6 h-6 px-1 rounded-lg">
        <img
          src={icon}
          className="aspect-[1] object-contain w-4 self-stretch my-auto"
          alt=""
        />
      </div>
      <div className="w-[209px]">
        <div className="text-black text-sm font-normal">{message}</div>
        <div className="text-black text-xs font-normal leading-none tracking-[0px] mt-1">
          {time}
        </div>
      </div>
    </div>
  );
};

export const Notifications: React.FC = () => {
  return (
    <div>
      <div className="min-h-5 w-full text-sm text-black font-normal whitespace-nowrap tracking-[0px] leading-none rounded-lg">
        Notifications
      </div>
      <div className="w-full mt-4">
        <Notification
          icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/517344edcc0f88fe432f8dc38d64411d8a7bb62c?placeholderIfAbsent=true"
          message='Proposal "Clean Water for All" was approved'
          time="Just now"
        />
        <div className="mt-6">
          <Notification
            icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/24bfac20c6003d4d6453b691605a0c078cbadcfd?placeholderIfAbsent=true"
            message="Reminder: Proposal submission for UNICEF closes today"
            time="2 hours ago"
          />
        </div>
        <div className="mt-6">
          <Notification
            icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/1cb3088f85cf2946c5bc25d5d6f14c46cf1d2d11?placeholderIfAbsent=true"
            message='Proposal "Education Forward" submitted to World Bank'
            time="3 days ago"
          />
        </div>
      </div>
    </div>
  );
};
