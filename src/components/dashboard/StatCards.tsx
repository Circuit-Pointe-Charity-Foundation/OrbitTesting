import React from "react";

interface StatCardProps {
  icon: string;
  value: string;
  label: string;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, bgColor }) => {
  return (
    <div className="self-stretch w-[174px] my-auto transition-all duration-300 hover:scale-[1.03] hover:shadow-md">
      <div
        className={`${bgColor} flex flex-col items-stretch justify-center px-[17px] py-[27px] rounded-[15px] max-md:px-5 h-full`}
      >
        <div className="flex flex-col items-stretch">
          <img
            src={icon}
            className="aspect-[1] object-contain w-[34px] self-center"
            alt=""
          />
          <div className="w-full mt-4">
            <div className="text-[rgba(56,56,57,1)] text-xl font-semibold">
              {value}
            </div>
            <div className="text-gray-500 text-xs font-normal mt-2">
              {label}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const StatCards: React.FC = () => {
  return (
    <div className="flex items-center gap-[13px] text-center leading-none flex-wrap">
      <StatCard
        icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/1ce28e55aca4e95d78842131b9bc09d9fa1d1d6a?placeholderIfAbsent=true"
        value="128"
        label="Total Proposals"
        bgColor="bg-[rgba(239,232,253,1)]"
      />
      <StatCard
        icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/8b67d66d96cd69ce00d85796ccc693e6a4822d96?placeholderIfAbsent=true"
        value="28.5%"
        label="Conversion Rate"
        bgColor="bg-[rgba(220,227,239,1)]"
      />
      <StatCard
        icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/251bd0107bdd1ac0289b0c43e0507c89dde7970f?placeholderIfAbsent=true"
        value="37"
        label="Active Opportunities"
        bgColor="bg-[rgba(252,227,240,1)]"
      />
      <StatCard
        icon="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/bababac512714f0895070169539f1a920bdf2122?placeholderIfAbsent=true"
        value="$2k"
        label="Funds Raised This Quarter"
        bgColor="bg-[rgba(254,243,205,1)]"
      />
    </div>
  );
};
