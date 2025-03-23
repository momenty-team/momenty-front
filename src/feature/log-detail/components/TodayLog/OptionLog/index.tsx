import OptionList from './OptionList';

function OptionLog() {
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
            <OptionList options={content} />
          </div>
          <div className="text-display-4-r mb-1">레이블</div>
        </button>
      ))}
    </>
  );
}

export default OptionLog;
