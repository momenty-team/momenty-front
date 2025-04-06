import OptionList from './OptionList';

import type { Option, RecordDetail } from '@/types/apis/records';

interface OptionLogProps {
  logDetailList: RecordDetail[];
}

function OptionLog({ logDetailList }: OptionLogProps) {
  return (
    <>
      {logDetailList.map(({ created_at, content }, index) => (
        <button key={index} className="py-2 px-5 bg-indigo-5 flex flex-col">
          <div className="flex items-end w-full gap-3">
            <div className="text-display-2-el">{created_at.slice(11, 16)}</div>
            <OptionList options={content} />
          </div>
          <div className="text-display-4-r mb-1">레이블</div>
        </button>
      ))}
    </>
  );
}

export default OptionLog;
