function WritingLog() {
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

export default WritingLog;
