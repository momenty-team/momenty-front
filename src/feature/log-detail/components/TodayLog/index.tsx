import type { LogOption } from '..';

import CircleIcon from '@/assets/svg/log-detail/circle.svg';
import CloseIcon from '@/assets/svg/log-detail/close.svg';

interface TodayLogProps {
  option: LogOption;
}

function TodayLog({ option }: TodayLogProps) {
  if (option === 'string') {
    return (
      <>
        {[
          { time: '12:35', content: '글들 ~~~~' },
          {
            time: '12:35',
            content: '아침에 물을 먹었는데겁나 많이 먹었다. 아 겁나 배부르다. 하지만 그래도 기록을 해야하니 기록을...',
          },
          { time: '16:35', content: '글들 ~~~~' },
          { time: '12:00', content: 'dPtldlqslekasdfjlahsdlfjhasdfkahjsgdfajshdfgaljshdflaksjhdlkjsah' },
          { time: '18:51', content: '글들 ~~~~' },
        ].map(({ time, content }, index) => (
          <button key={index} className="py-2 px-5 bg-indigo-5 flex flex-col">
            <div className="flex items-end w-full gap-3">
              <div className="text-display-2-el">{time}</div>
              <div className="flex align-center w-full bg-indigo-25 h-[52px] rounded-[8px] px-4 py-3 text-caption-3-sb text-indigo-300">
                <div
                  className="text-left line-clamp-2 overflow-hidden text-ellipsis break-all whitespace-normal"
                  style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                  }}
                >
                  {content}
                </div>
              </div>
            </div>
            <div className="text-display-4-r mb-1">레이블</div>
          </button>
        ))}
      </>
    );
  }

  if (option === 'boolean') {
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

  if (option === 'option') {
    return (
      <>
        {[
          { time: '12:35', content: ['10ml'] },
          { time: '12:35', content: ['10ml', '200ml'] },
          { time: '18:51', content: ['10ml', '20ml', '500ml', '5002ml'] },
          { time: '16:35', content: ['102ml'] },
          { time: '12:00', content: ['1033ml', '300ml'] },
        ].map(({ time, content }, index) => (
          <button key={index} className="py-2 px-5 bg-indigo-5 flex flex-col">
            <div className="flex items-end w-full gap-3">
              <div className="text-display-2-el">{time}</div>
              <div className="ml-auto flex items-center gap-3 overflow-x-scroll scrollbar-hide">
                {content.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-1.5 py-1 px-3 rounded-[99px] bg-[#3C8EE7] text-body-2-sb text-indigo-5 w-fit h-fit"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-display-4-r mb-1">레이블</div>
          </button>
        ))}
      </>
    );
  }

  if (option === 'number') {
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

  return <div>잘못된 접근입니다.</div>;
}

export default TodayLog;
