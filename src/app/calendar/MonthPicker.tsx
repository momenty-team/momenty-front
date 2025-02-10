import ChevronDownIcon from '../../assets/svg/chevron-down.svg';

function MonthPicker({
  year,
  month,
  setYear,
  setMonth,
}: {
  year: number;
  month: number;
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
}) {
  function handleMonthChange(event: React.ChangeEvent<HTMLInputElement>) {
    const [selectedYear, selectedMonth] = event.target.value.split('-').map(Number);
    setYear(selectedYear);
    setMonth(selectedMonth);
  }

  function handleClick() {
    const input = document.getElementById('month-picker') as HTMLInputElement;
    if (input) {
      input.showPicker?.();
      input.click();
    }
  }

  return (
    <div className="relative flex items-center w-[140px] rounded-md cursor-pointer" onClick={handleClick}>
      <input
        id="month-picker"
        type="month"
        value={`${year}-${String(month).padStart(2, '0')}`}
        onChange={handleMonthChange}
        className="w-full bg-transparent text-subtitle-3-b pr-7"
      />
      <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2" />
    </div>
  );
}

export default MonthPicker;
