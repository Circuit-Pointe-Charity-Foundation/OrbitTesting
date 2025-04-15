import React from "react";

export const Header: React.FC = () => {
  return (
    <div className="bg-white flex w-full items-center justify-between px-6 py-4 shadow-sm">
      <div className="text-gray-700 text-sm font-medium">
        Good Afternoon, <span className="font-bold">Chioma Ike</span>
      </div>

      {/* Temporary 404 Indicator */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/bc5bd96ad79b000e67855a7c4cd427f5c23e0132?placeholderIfAbsent=true"
            className="w-6 h-6 object-contain"
            alt="Notifications"
          />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            4
          </span>
        </div>

        <div className="bg-violet-100 text-violet-600 px-3 py-1 rounded-md text-sm font-medium">
          404 Mode
        </div>

        <div className="flex items-center gap-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/72798c9f03b636536e1534c9b38dd6c314d301c0?placeholderIfAbsent=true"
            className="w-8 h-8 rounded-full object-cover"
            alt="User Avatar"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/a1a0227fe5276c0f9e0da921ffa5ac521ce1a959?placeholderIfAbsent=true"
            className="w-3 h-3 object-contain"
            alt="Dropdown"
          />
        </div>
      </div>
    </div>
  );
};
