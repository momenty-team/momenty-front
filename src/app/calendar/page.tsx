'use client';

import useCalendar from './hooks/useCalendar';
import DateBox from './DateBox';
import MonthPicker from './MonthPicker';
import { useSearchParams } from 'next/navigation';
import { postMessageToWebView } from '@/utils/webview';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function Calendar() {
  const searchParams = useSearchParams();
  const year = searchParams.get('year') || new Date().getFullYear();
  const month = searchParams.get('month') || new Date().getMonth() + 1;
  const day = searchParams.get('day') || new Date().getDate();

  const { isCurrentMonth, isSelectedDay, isSunday, getMonthDateList } = useCalendar(
    Number(year),
    Number(month),
    Number(day)
  );
  const handleDateClick = (date: Date) => {
    const selectedYear = date.getFullYear();
    const selectedMonth = date.getMonth() + 1;
    const selectedDay = date.getDate();

    postMessageToWebView({
      date: {
        year: selectedYear,
        month: selectedMonth,
        day: selectedDay,
      },
    });
  };

  const dateList = getMonthDateList(Number(year), Number(month));

  const setDate = (year?: number, month?: number) => {
    const selectedYear = year || Number(year);
    const selectedMonth = month || Number(month);

    postMessageToWebView({
      date: { year: selectedYear, month: selectedMonth, day: Number(day) },
    });
  };

  return (
    <>
      <main className="flex flex-col gap-6">
        <header className="flex justify-center gap-5">
          <MonthPicker year={Number(year)} month={Number(month)} setDate={setDate} />
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
              isToday={isSelectedDay(date)}
              isSunday={isSunday(date)}
              onClick={() => handleDateClick(date)}
            />
          ))}
        </ul>
      </main>
    </>
  );
}

export default Calendar;
