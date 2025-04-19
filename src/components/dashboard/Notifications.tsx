import React, { useState } from "react";

interface Notification {
  id: string;
  icon: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationProps {
  notification: Notification;
  onDelete: (id: string) => void;
}

const NotificationItem: React.FC<NotificationProps> = ({
  notification,
  onDelete,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative p-4 rounded-lg border border-gray-200 hover:bg-gray-50 mb-2 transition-colors`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-3 items-start">
        {/* Icon with gray border */}
        <div className="border border-gray-300 flex items-center justify-center w-8 h-8 rounded-full bg-white shrink-0">
          <img
            src={notification.icon}
            className="w-4 h-4 object-contain"
            alt="Notification icon"
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-800 font-medium">
            {notification.message}
          </p>
          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
        </div>

        <button
          onClick={() => onDelete(notification.id)}
          className={`transition-opacity ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <svg
            className="w-4 h-4 text-gray-400 hover:text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/517344edcc0f88fe432f8dc38d64411d8a7bb62c?placeholderIfAbsent=true",
      message: 'Proposal "Clean Water for All" was approved',
      time: "Just now",
      read: false,
    },
    {
      id: "2",
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/24bfac20c6003d4d6453b691605a0c078cbadcfd?placeholderIfAbsent=true",
      message: "Reminder: Proposal submission for UNICEF closes today",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "3",
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/517344edcc0f88fe432f8dc38d64411d8a7bb62c?placeholderIfAbsent=true",
      message: 'Proposal "Education for All" was approved',
      time: "Just now",
      read: false,
    },
    {
      id: "4",
      icon: "https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/24bfac20c6003d4d6453b691605a0c078cbadcfd?placeholderIfAbsent=true",
      message:
        "Reminder: Proposal delibration for AmplifyChange to start in 1 week",
      time: "3 hours ago",
      read: false,
    },
  ]);

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Notifications
      </h3>
      <div className="max-h-[300px] overflow-y-auto">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onDelete={handleDelete}
          />
        ))}
        {notifications.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            No new notifications
          </div>
        )}
      </div>
    </div>
  );
};
