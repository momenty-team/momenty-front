import { useRef, useState } from 'react';
import ChevronDownIcon from '@/assets/svg/chevron-down.svg';

function MonthPicker({
  year,
  month,
  setDate,
}: {
  year: number;
  month: number;
  setDate: (year?: number, month?: number) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tempYear, setTempYear] = useState(year);
  const [tempMonth, setTempMonth] = useState(month);

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [selectedYear, selectedMonth] = e.target.value.split('-').map(Number);
    setTempYear(selectedYear);
    setTempMonth(selectedMonth);
  };

  const handleBlur = () => {
    setDate(tempYear, tempMonth);
  };

  return (
    <div className="relative flex items-center w-[140px]">
      <input
        ref={inputRef}
        type="month"
        value={`${year}-${String(month).padStart(2, '0')}`}
        onChange={handleMonthChange}
        onBlur={handleBlur}
        className="w-full bg-transparent text-subtitle-3-b pr-7"
      />
      <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2" />
    </div>
  );
}

export default MonthPicker;
