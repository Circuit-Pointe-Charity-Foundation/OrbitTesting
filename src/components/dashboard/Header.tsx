import React from "react";

export const Header: React.FC = () => {
  return (
    <div className="bg-white flex w-full items-stretch gap-5 flex-wrap justify-between px-9 py-[22px] max-md:max-w-full max-md:px-5">
      <div className="text-[rgba(56,56,57,1)] text-sm font-medium text-center my-auto">
        Good Afternoon, <span className="font-bold">Chioma Ike</span>
      </div>
      <div className="flex items-center gap-[30px]">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/bc5bd96ad79b000e67855a7c4cd427f5c23e0132?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-[50px] self-stretch shrink-0 my-auto"
          alt="Notifications"
        />
        <div className="self-stretch flex items-center gap-1.5 my-auto">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/72798c9f03b636536e1534c9b38dd6c314d301c0?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-14 self-stretch shrink-0 my-auto rounded-full"
            alt="User Avatar"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/a1a0227fe5276c0f9e0da921ffa5ac521ce1a959?placeholderIfAbsent=true"
            className="aspect-[2] object-contain w-5 self-stretch shrink-0 my-auto"
            alt="Dropdown"
          />
        </div>
      </div>
    </div>
  );
};
