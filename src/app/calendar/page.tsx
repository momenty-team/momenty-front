'use client';

import useCalendar from './hooks/useCalendar';
import CalendarDayBox from './DateBox';
import { useRouter } from 'next/navigation';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];

interface CalendarProps {
  children?: (date: Date) => React.ReactNode;
  closeModal?: VoidFunction;
}

const Calendar = ({ children, closeModal }: CalendarProps) => {
  const router = useRouter();
  const { prevMonth, nextMonth, dateList, year, month, isCurrentMonth, isToday, isSunday } = useCalendar();
  const handleClick = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex justify-center gap-5">
        <button type="button" onClick={handleClick} className="bg-blue-500 text-white px-3 py-1 rounded-md">
          홈
        </button>
        <button type="button" onClick={prevMonth}>
          ◀
        </button>
        <div>
          <h2 className="text-subtitle-3-b">
            {year}년 {month}월
          </h2>
        </div>
        <button type="button" onClick={nextMonth}>
          ▶
        </button>
      </header>

      <ul className="px-6 grid grid-cols-7 gap-[20px] justify-items-center text-label-1-b">
        {DAYS.map((day) => (
          <li key={day}>{day}</li>
        ))}
      </ul>
      <ul className="px-6 grid grid-cols-7 gap-[20px]">
        {dateList.map((date) => (
          <CalendarDayBox
            key={date.toISOString()}
            date={date}
            isCurrentMonth={isCurrentMonth}
            isToday={isToday}
            isSunday={isSunday}
          >
            {children && children(date)}
          </CalendarDayBox>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
