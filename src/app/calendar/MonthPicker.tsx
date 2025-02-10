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
    <button className="relative flex text-center w-[123px] text-subtitle-3-b" onClick={handleClick}>
      <input
        id="month-picker"
        type="month"
        value={`${year}-${String(month).padStart(2, '0')}`}
        onChange={handleMonthChange}
        className="bg-transparent cursor-pointer "
      />
      <ChevronDownIcon className="absolute right-0 top-0.5" />
    </button>
  );
}

export default MonthPicker;
