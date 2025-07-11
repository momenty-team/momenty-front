'use client';

import DateBox from './DateBox';
import MonthPicker from './MonthPicker';
import { useSearchParams } from 'next/navigation';
import { postMessageToWebView } from '@/utils/webview';
import { dateUtils } from '@/utils/calendar';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function Calendar() {
  const searchParams = useSearchParams();
  const year = searchParams.get('year') || new Date().getFullYear();
  const month = searchParams.get('month') || new Date().getMonth() + 1;
  const day = searchParams.get('day') || new Date().getDate();
  const routeFrom = searchParams.get('from') || '';

  const { isCurrentMonth, isSelectedDay, isSunday, getMonthDateList, isFuture } = dateUtils(
    Number(year),
    Number(month),
    Number(day)
  );
  const handleDateClick = (date: Date) => {
    const selectedYear = date.getFullYear();
    const selectedMonth = date.getMonth() + 1;
    const selectedDay = date.getDate();
    // alert(`${routeFrom}`);
    if (routeFrom === 'analysis') {
      postMessageToWebView({
        date: {
          year: selectedYear,
          month: selectedMonth,
          day: selectedDay,
        },
        route: '/analysis/week-feedback',
      });
      return;
    }

    postMessageToWebView({
      date: {
        year: selectedYear,
        month: selectedMonth,
        day: selectedDay,
      },
    });
  };

  const dateList = getMonthDateList();

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
        <ul className="px-6 grid grid-cols-7 gap-[20px] justify-items-center text-label-1-b text-indigo-600">
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
              isFuture={() => isFuture(date)}
            />
          ))}
        </ul>
      </main>
    </>
  );
}

export default Calendar;
