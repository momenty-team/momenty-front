'use client';

import { ReactNode } from 'react';

interface DateBoxProps {
  date: Date;
  isCurrentMonth: (date: Date) => boolean;
  isToday: (date: Date) => boolean;
  isSunday: (date: Date) => boolean;
  children?: ReactNode;
}

const DateBox = ({ date, isCurrentMonth, isToday, isSunday, children }: DateBoxProps) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <button
        type="button"
        className={`flex justify-center items-center w-8 h-8 rounded-[3px]
          active:scale-[0.85] transition-all
          ${isCurrentMonth(date) ? 'bg-[#D9D9D9]' : 'bg-transparent'}
          ${isSunday(date) ? 'text-red-500' : 'text-black'}`}
      />
      <div>
        <span
          className={`flex justify-center items-center text-caption-1-sb
            ${isSunday(date) ? 'text-red-500' : 'text-black'} 
            ${!isCurrentMonth(date) ? 'text-transparent' : ''}
            ${isToday(date) ? 'bg-[#DAECFF]' : 'bg-transparent'} 
            w-8 rounded-[3px]
          `}
        >
          {date.getDate()}
        </span>
        {children}
      </div>
    </div>
  );
};

export default DateBox;
