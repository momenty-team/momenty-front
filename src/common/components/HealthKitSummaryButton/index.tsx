import ChevronRightIcon from '@/assets/svg/chevron-right.svg';

interface SummaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  title: string;
  items: {
    label: string;
    value: string | number | null | undefined;
    unit: string;
    fixed?: number;
  }[];
}

function HealthKitSummaryButton({ icon, title, items, ...props }: SummaryButtonProps) {
  return (
    <button className="flex flex-col p-5 gap-5 rounded-[16px] shadow-6 bg-white" {...props}>
      <div className="flex flex-row items-center w-full justify-between">
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="flex items-center justify-center bg-indigo-5 rounded-[4px] w-[26px] h-[26px]">{icon}</div>
          <span className="text-body-2-m">{title}</span>
        </div>
        <ChevronRightIcon width={24} height={24} />
      </div>

      <div className="flex flex-row items-center gap-10 w-full">
        {items.map(({ label, value, unit, fixed = 1 }) => (
          <div key={label} className="flex flex-col gap-1">
            <span className="flex text-blue-700 text-caption-1-r">{label}</span>
            <div className="flex flex-row items-center gap-1">
              <div className="text-subtitle-3-b text-indigo-700">
                {typeof value === 'number' && value.toFixed(fixed)}
                {typeof value === 'string' && value}
                {value === null && '-'}
              </div>
              <div className="text-body-2-r text-indigo-700">{unit}</div>
            </div>
          </div>
        ))}
      </div>
    </button>
  );
}

export default HealthKitSummaryButton;
