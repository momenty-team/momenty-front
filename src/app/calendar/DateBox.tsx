'use client';

interface DateBoxProps {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSunday: boolean;
  onClick: (date: Date) => void;
  isFuture: (date: Date) => boolean;
}

function DateBox({ date, isCurrentMonth, isToday, isSunday, onClick, isFuture }: DateBoxProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <button
        type="button"
        onClick={() => onClick(date)}
        className={`flex justify-center items-center w-8 h-8 rounded-[3px]
          active:scale-[0.85] transition-all
          ${isCurrentMonth ? 'bg-[#D9D9D9]' : 'bg-transparent'}
          ${isSunday ? 'text-red-500' : 'text-black'}`}
        disabled={isFuture(date)}
      />
      <div>
        <span
          className={`flex justify-center items-center text-caption-1-sb w-8 rounded-[3px]
            ${isSunday ? 'text-red-500' : 'text-black'} 
            ${!isCurrentMonth ? 'text-transparent' : ''}
            ${isToday ? 'bg-[#DAECFF]' : 'bg-transparent'}
          `}
        >
          {date.getDate()}
        </span>
      </div>
    </div>
  );
}

export default DateBox;
