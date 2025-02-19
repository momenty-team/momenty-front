"use client";

import { useState } from "react";

const CALENDAR_CELL_COUNT = 42;

const getMonthDateList = (year: number, month: number): Date[] => {
  const currentMonth = month - 1;
  const currentMonthFirstDay = new Date(year, currentMonth, 1).getDay();
  const currentMonthLastDate = new Date(year, month, 0).getDate();

  const prevMonthDateList = Array.from(
    { length: currentMonthFirstDay },
    (_, index) => new Date(year, currentMonth, -currentMonthFirstDay + index + 1)
  );

  const currentMonthDateList = Array.from(
    { length: currentMonthLastDate },
    (_, index) => new Date(year, currentMonth, index + 1)
  );

  const nextMonthDateList = Array.from(
    { length: CALENDAR_CELL_COUNT - prevMonthDateList.length - currentMonthDateList.length },
    (_, index) => new Date(year, month, index + 1)
  );

  return [...prevMonthDateList, ...currentMonthDateList, ...nextMonthDateList];
};

const useCalendar = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const dateList = getMonthDateList(year, month);

  const isSunday = (date: Date) => date.getDay() === 0;
  const isCurrentMonth = (date: Date) => date.getFullYear() === year && date.getMonth() + 1 === month;
  const isToday = (date: Date) =>
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() + 1 === today.getMonth() + 1 &&
    date.getDate() === today.getDate();

  const prevMonth = () => {
    if (month === 1) {
      setYear((prev) => prev - 1);
      setMonth(12);
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  const nextMonth = () => {
    if (month === 12) {
      setYear((prev) => prev + 1);
      setMonth(1);
    } else {
      setMonth((prev) => prev + 1);
    }
  };

  return {
    year,
    month,
    prevMonth,
    nextMonth,
    dateList,
    isCurrentMonth,
    isToday,
    isSunday,
    setYear,
    setMonth,
  };
};

export default useCalendar;

