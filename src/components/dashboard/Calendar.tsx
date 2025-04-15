import React from "react";

interface WeekDayProps {
  day: string;
}

const WeekDay: React.FC<WeekDayProps> = ({ day }) => {
  return (
    <div className="flex-1 shrink basis-[0%] rotate-[-2.0521580065109717e-17rad] min-h-[25px] gap-[11px] text-[11px] text-[rgba(43,43,54,1)] px-1 py-[5px]">
      {day}
    </div>
  );
};

interface DayProps {
  day: string | number;
  indicator?: "red" | "green" | "orange";
}

const Day: React.FC<DayProps> = ({ day, indicator }) => {
  return (
    <div className="flex gap-1.5">
      <div className="rotate-[-2.0521580065109717e-17rad] mt-1.5">{day}</div>
      {indicator && (
        <div
          className={`bg-${indicator}-600 flex w-2 shrink-0 h-2 rounded-[50%]`}
        />
      )}
    </div>
  );
};

export const Calendar: React.FC = () => {
  return (
    <div className="bg-white flex w-full flex-col items-stretch mt-8 pl-5 py-11 rounded-2xl max-md:max-w-full">
      <div className="self-center flex w-[670px] max-w-full items-center gap-5 flex-wrap justify-between">
        <div className="rotate-[-2.0521580065109717e-17rad] text-black text-[22px] font-medium tracking-[0.22px] text-center self-stretch">
          Calendar
        </div>
        <div className="rotate-[-2.0521580065109717e-17rad] text-black text-sm font-normal tracking-[0.14px] text-center self-stretch my-auto">
          September 2022
        </div>
        <div className="rotate-[-2.0521580065109717e-17rad] self-stretch flex h-[17px] gap-[25px] justify-between my-auto">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/f2995333113b2ef368e03b347a5e0fdef52ab9af?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-[18px] shrink-0"
            alt="Previous"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/058b52928fa3c4d66159746925b0fdc9df75fc1c?placeholderIfAbsent=true"
            className="aspect-[0.94] object-contain w-[17px] shrink-0"
            alt="Next"
          />
        </div>
      </div>
      <div className="border shrink-0 h-px mt-3 border-[rgba(210,210,210,1)] border-solid max-md:max-w-full" />
      <div className="flex w-[683px] max-w-full items-stretch gap-[40px_58px] font-normal whitespace-nowrap text-center uppercase flex-wrap mt-[22px]">
        <div className="grow shrink-0 basis-0 w-fit max-md:max-w-full">
          <div className="flex w-full gap-5 flex-wrap justify-between max-md:max-w-full">
            <WeekDay day="Sun" />
            <WeekDay day="Mon" />
            <WeekDay day="Tue" />
            <WeekDay day="Wed" />
            <div className="self-stretch flex flex-col items-stretch">
              <div className="flex w-full items-stretch gap-5 text-[11px] text-[rgba(43,43,54,1)] justify-between">
                <WeekDay day="Thu" />
                <WeekDay day="Fri" />
              </div>
              <div className="self-center flex w-28 max-w-full items-stretch gap-5 text-[15px] text-[rgba(13,13,13,1)] justify-between mt-[22px]">
                <div className="rotate-[-2.0521580065109717e-17rad] overflow-hidden rounded-[45px]">
                  1
                </div>
                <div className="rotate-[-2.0521580065109717e-17rad] rounded-[45px]">
                  2
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-stretch gap-5 text-[15px] text-[rgba(13,13,13,1)] flex-wrap justify-between mt-[47px] mx-[19px] max-md:max-w-full max-md:mr-2.5 max-md:mt-10">
            <div className="rotate-[-1.3730236984508473e-17rad]">4</div>
            <div className="rotate-[-2.0521580065109717e-17rad]">5</div>
            <div className="rotate-[-2.0521580065109717e-17rad]">6</div>
            <div className="rotate-[-2.0521580065109717e-17rad]">7</div>
            <div className="rotate-[-2.0521580065109717e-17rad]">8</div>
            <div className="rotate-[-2.0521580065109717e-17rad]">9</div>
          </div>
          <div className="flex items-stretch gap-5 text-[15px] text-[rgba(13,13,13,1)] flex-wrap justify-between ml-[17px] mr-[15px] mt-[41px] max-md:max-w-full max-md:mr-2.5 max-md:mt-10">
            <div className="flex flex-col items-stretch mt-1.5">
              <div>11</div>
              <div className="mt-[47px] max-md:mt-10">18</div>
            </div>
            <div>
              <div className="flex w-full items-stretch gap-5 justify-between max-md:mr-0.5">
                <Day day="12" indicator="red" />
                <div className="rotate-[-1.3730236984508473e-17rad] mt-1.5">
                  13
                </div>
              </div>
              <div className="flex w-full items-stretch gap-5 justify-between mt-[43px] max-md:mt-10">
                <Day day="19" indicator="green" />
                <div className="rotate-[-2.0521580065109717e-17rad] mt-1">
                  20
                </div>
              </div>
            </div>
            <div>
              <div className="flex w-full gap-5 justify-between max-md:mr-0.5">
                <div className="rotate-[-1.3730236984508473e-17rad] mt-1.5">
                  14
                </div>
                <div className="self-stretch flex gap-[7px]">
                  <Day day="15" indicator="orange" />
                </div>
                <div className="rotate-[-1.3730236984508473e-17rad] mt-1.5">
                  16
                </div>
              </div>
              <div className="flex items-stretch gap-5 justify-between mt-[47px] max-md:mt-10">
                <div className="rotate-[-1.3730236984508473e-17rad]">21</div>
                <div className="rotate-[-1.3730236984508473e-17rad]">22</div>
                <div className="rotate-[-2.0521580065109717e-17rad]">23</div>
              </div>
            </div>
          </div>
          <div className="flex items-stretch gap-5 text-[15px] text-[rgba(13,13,13,1)] flex-wrap justify-between mt-[47px] mx-[15px] max-md:max-w-full max-md:mr-2.5 max-md:mt-10">
            <div className="rotate-[-2.0521580065109717e-17rad]">25</div>
            <div className="rotate-[-1.3730236984508473e-17rad]">26</div>
            <div className="rotate-[-1.3730236984508473e-17rad]">27</div>
            <div className="rotate-[-2.0521580065109717e-17rad]">28</div>
            <div className="rotate-[-1.3730236984508473e-17rad]">29</div>
            <div className="rotate-[-1.3730236984508473e-17rad]">30</div>
          </div>
        </div>
        <div className="flex flex-col items-center text-[15px] text-[rgba(13,13,13,1)]">
          <div className="flex-1 shrink basis-[0%] rotate-[-2.0521580065109717e-17rad] self-stretch min-h-[25px] gap-[11px] text-[11px] text-[rgba(43,43,54,1)] px-1 py-[5px]">
            SAT
          </div>
          <div className="mt-[22px]">3</div>
          <div className="mt-[47px] max-md:mt-10">10</div>
          <div className="mt-12 max-md:mt-10">17</div>
          <div className="mt-[46px] max-md:mt-10">24</div>
        </div>
      </div>
    </div>
  );
};
