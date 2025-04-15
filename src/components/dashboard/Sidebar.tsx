import React from "react";

interface SidebarLinkProps {
  icon: string;
  label: string;
  isActive?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  icon,
  label,
  isActive = false,
}) => {
  return (
    <div
      className={`flex items-center gap-4 justify-center mt-10 rounded-[5px] ${
        isActive ? "text-white font-bold" : "text-[rgba(202,179,255,1)]"
      }`}
    >
      <img
        src={icon}
        className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto"
        alt=""
      />
      <div className="self-stretch flex flex-col items-stretch justify-center my-auto rounded-[5px]">
        <div>{label}</div>
        <div
          className={`border min-h-px w-0 ${
            isActive ? "border-white" : "border-[rgba(202,179,255,1)]"
          } border-solid`}
        />
      </div>
    </div>
  );
};

export const Sidebar: React.FC = () => {
  return (
    <div className="bg-violet-600 flex w-full flex-col font-medium text-center leading-none mx-auto pl-6 pr-[52px] pt-[31px] pb-[494px] max-md:pb-[100px] max-md:px-5">
      <div className="flex items-center gap-2 text-lg text-white">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/8d57d3330a663501866598decc78666e8126d2f9?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-[50px] self-stretch shrink-0 my-auto"
          alt="Orbit Logo"
        />
        <div className="self-stretch my-auto">Orbit ERP</div>
      </div>
      <div className="flex flex-col text-base text-[rgba(202,179,255,1)] mt-10">
        <SidebarLink icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/828eaaedadd88007410b86b2eb04ca0bf0a298ba?placeholderIfAbsent=true" label="Dashboards" isActive={true} />
        <SidebarLink icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/614b6853984dcae9c03cb57b4b3b4030230a0642?placeholderIfAbsent=true" label="Donor management" />
        <SidebarLink icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/1549fd0f0a5dfb5a80ce4567068bbc87f72ccfda?placeholderIfAbsent=true" label="Opportunity Tracking" />
        <SidebarLink icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/614b6853984dcae9c03cb57b4b3b4030230a0642?placeholderIfAbsent=true" label="Proposal Development" />
        <SidebarLink icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/23cba190c061e1a18edf5c5a381a6ac364437936?placeholderIfAbsent=true" label="Proposal Library" />
        <SidebarLink icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/010c49009b64343fc260ff2073febfeb3376217b?placeholderIfAbsent=true" label="AI Proposal Wizard" />
        <SidebarLink icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/4bf6d47149419ce63561ecb9bc9f8e248c23ed04?placeholderIfAbsent=true" label="Internal Workflow & Review" />
        <SidebarLink icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/8d222f0838818acf1732ad8f2844ef1bd21d12da?placeholderIfAbsent=true" label="Calendar & Reminders" />
        <SidebarLink icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/464233521b077e39fdef00fa474dcfa61c710069?placeholderIfAbsent=true" label="Fundraising Analytics" />
        <SidebarLink icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/003933b9929b300ebc0692dc33f2bc17afc04f7a?placeholderIfAbsent=true" label="Settings" />
      </div>
    </div>
  );
};
