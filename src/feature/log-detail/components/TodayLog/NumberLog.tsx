function NumberLog() {
  return (
    <div className="flex flex-col gap-[1px]">
      {[
        { time: '12:35', content: '2,000', unit: 'ml' },
        { time: '12:35', content: '1,000', unit: 'ml' },
        { time: '16:35', content: '500', unit: 'ml' },
        { time: '12:00', content: '300', unit: 'ml' },
        { time: '18:51', content: '100', unit: 'ml' },
      ].map(({ time, content, unit }, index) => (
        <button key={index} className="py-2 px-5 bg-indigo-5 flex flex-col">
          <div className="flex items-end w-full gap-3">
            <div className="text-display-2-el">{time}</div>
            <div className="ml-auto flex items-center justify-center gap-1.5">
              <span className="text-subtitle-2-r text-indigo-400">{content}</span>{' '}
              <span className="text-subtitle-2-r text-indigo-400">{unit}</span>
            </div>
          </div>
          <div className="text-display-4-r mb-1">레이블</div>
        </button>
      ))}
    </div>
  );
}

export default NumberLog;
