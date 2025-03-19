import CircleIcon from '@/assets/svg/log-detail/circle.svg';
import CloseIcon from '@/assets/svg/log-detail/close.svg';

function BooleanLog() {
  return (
    <div className="flex flex-col gap-[1px]">
      {[
        { time: '12:35', content: true },
        { time: '12:35', content: true },
        { time: '16:35', content: false },
        { time: '12:00', content: true },
        { time: '18:51', content: false },
      ].map(({ time, content }, index) => (
        <button key={index} className="py-2 px-5 bg-indigo-5 flex flex-col">
          <div className="flex items-end w-full gap-3">
            <div className="text-display-2-el">{time}</div>
            <div
              className={`ml-auto flex items-center justify-center w-10 ${content ? 'bg-[#A5D0FE]' : 'bg-[#EC7B8E]'} h-10 rounded-[4px] text-caption-3-sb text-indigo-300`}
            >
              {content ? <CircleIcon width={26} height={26} /> : <CloseIcon width={26} height={26} />}
            </div>
          </div>
          <div className="text-display-4-r mb-1">레이블</div>
        </button>
      ))}
    </div>
  );
}

export default BooleanLog;
