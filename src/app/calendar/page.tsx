'use client';

import { useRouter } from 'next/navigation';
import useCalendar from './hooks/useCalendar';
import DateBox from './DateBox';
import MonthPicker from './MonthPicker';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function Calendar() {
  const router = useRouter();
  const { dateList, year, month, setYear, setMonth, isCurrentMonth, isToday, isSunday } = useCalendar();

  const onClickHandler = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex justify-center gap-5">
        <MonthPicker year={year} month={month} changeYear={setYear} changeMonth={setMonth} />
      </header>
      <ul className="px-6 grid grid-cols-7 gap-[20px] justify-items-center text-label-1-b">
        {DAYS.map((day) => (
          <li key={day}>{day}</li>
        ))}
      </ul>
      <ul className="px-6 grid grid-cols-7 gap-[20px]">
        {dateList.map((date: Date) => (
          <DateBox
            key={date.toISOString()}
            date={date}
            isCurrentMonth={isCurrentMonth(date)}
            isToday={isToday(date)}
            isSunday={isSunday(date)}
          />
        ))}
      </ul>
      <button
        onClick={onClickHandler}
        className="flex flex-col w-20 p-[20px] gap-[20px] rounded-[20px] shadow-4 bg-white"
      >
        Home
      </button>
    </div>
  );
}

export default Calendar;
