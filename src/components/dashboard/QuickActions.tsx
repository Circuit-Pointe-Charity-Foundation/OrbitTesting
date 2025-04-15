import React from "react";

interface QuickActionProps {
  icon: string;
  label: string;
  isActive?: boolean;
}

const QuickAction: React.FC<QuickActionProps> = ({
  icon,
  label,
  isActive = false,
}) => {
  return (
    <div className="self-stretch flex items-center gap-0.5 text-[rgba(56,56,57,1)] my-auto">
      <img
        src={icon}
        className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto"
        alt=""
      />
      <div className="self-stretch my-auto">{label}</div>
    </div>
  );
};

export const QuickActions: React.FC = () => {
  return (
    <div className="z-10 w-[667px] max-w-full text-sm text-[#383839] font-medium text-center mr-10 mt-11 max-md:mr-2.5 max-md:mt-10">
      <div className="flex items-center gap-[40px_54px] flex-wrap max-md:max-w-full">
        <QuickAction icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/965a4a1f3ca576e6aa56ae0709d67302d74873cd?placeholderIfAbsent=true" label="New Donor" />
        <QuickAction icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/317b4486ebc32b2db7308b7bccd5be2891c14934?placeholderIfAbsent=true" label="New Opportunity" />
        <QuickAction icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/e4db9bc09fc3b27f400f30eb3535efe627699f5d?placeholderIfAbsent=true" label="Create Proposal" />
        <QuickAction icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/c45e474da37deb864af93438f814f567fcfba3f7?placeholderIfAbsent=true" label="Generate Reports" />
      </div>
      <div className="border-violet-600 w-[94px] shrink-0 h-0.5 mt-1 border-solid border-2" />
    </div>
  );
};
