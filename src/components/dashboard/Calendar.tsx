
import React from "react";

interface WeekDayProps {
  day: string;
}

const WeekDay: React.FC<WeekDayProps> = ({ day }) => {
  return (
    <div className="flex-1 shrink basis-[0%] min-h-[25px] text-[11px] text-[rgba(43,43,54,1)] px-1 py-[5px] text-center">
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
    <div className="flex items-center gap-1.5">
      <div className="text-center">{day}</div>
      {indicator && (
        <div
          className={`bg-${indicator}-600 w-2 h-2 rounded-full`}
        />
      )}
    </div>
  );
};

export const Calendar: React.FC = () => {
  return (
    <div className="bg-white flex w-full flex-col mt-8 px-5 py-11 rounded-2xl">
      <div className="flex w-full items-center justify-between mb-3">
        <div className="text-black text-[22px] font-medium">
          Calendar
        </div>
        <div className="flex items-center gap-4">
          <div className="text-black text-sm">
            September 2022
          </div>
          <div className="flex items-center gap-4">
            <button className="p-1 hover:bg-gray-100 rounded-full">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/f2995333113b2ef368e03b347a5e0fdef52ab9af?placeholderIfAbsent=true"
                className="w-[18px]"
                alt="Previous"
              />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded-full">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/058b52928fa3c4d66159746925b0fdc9df75fc1c?placeholderIfAbsent=true"
                className="w-[17px]"
                alt="Next"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="border-b border-[rgba(210,210,210,1)]"></div>
      <div className="grid grid-cols-7 gap-2 mt-5 text-center">
        <WeekDay day="SUN" />
        <WeekDay day="MON" />
        <WeekDay day="TUE" />
        <WeekDay day="WED" />
        <WeekDay day="THU" />
        <WeekDay day="FRI" />
        <WeekDay day="SAT" />
        
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div className="p-2">1</div>
        <div className="p-2">2</div>
        <div className="p-2">3</div>
        
        <div className="p-2">4</div>
        <div className="p-2">5</div>
        <div className="p-2">6</div>
        <div className="p-2">7</div>
        <div className="p-2">8</div>
        <div className="p-2">9</div>
        <div className="p-2">10</div>
        
        <div className="p-2">11</div>
        <div className="p-2 flex items-center justify-center">
          <Day day="12" indicator="red" />
        </div>
        <div className="p-2">13</div>
        <div className="p-2">14</div>
        <div className="p-2 flex items-center justify-center">
          <Day day="15" indicator="orange" />
        </div>
        <div className="p-2">16</div>
        <div className="p-2">17</div>
        
        <div className="p-2">18</div>
        <div className="p-2 flex items-center justify-center">
          <Day day="19" indicator="green" />
        </div>
        <div className="p-2">20</div>
        <div className="p-2">21</div>
        <div className="p-2">22</div>
        <div className="p-2">23</div>
        <div className="p-2">24</div>
        
        <div className="p-2">25</div>
        <div className="p-2">26</div>
        <div className="p-2">27</div>
        <div className="p-2">28</div>
        <div className="p-2">29</div>
        <div className="p-2">30</div>
        <div></div>
      </div>
    </div>
  );
};
