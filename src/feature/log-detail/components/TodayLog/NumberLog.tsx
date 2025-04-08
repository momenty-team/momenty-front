import type { RecordDetail } from '@/types/apis/records';

interface NumberLogProps {
  logDetailList: RecordDetail[];
}

function NumberLog({ logDetailList }: NumberLogProps) {
  return (
    <div className="flex flex-col gap-[1px]">
      {logDetailList.map(({ id, content, created_at }) => (
        <button key={id} className="py-2 px-5 bg-indigo-5 flex flex-col">
          <div className="flex items-end w-full gap-3">
            <div className="text-display-2-el">{created_at.slice(11, 16)}</div>
            <div className="ml-auto flex items-center justify-center gap-1.5">
              <span className="text-subtitle-2-r text-indigo-400">{content}</span>
            </div>
          </div>
          <div className="text-display-4-r mb-1">레이블</div>
        </button>
      ))}
    </div>
  );
}

export default NumberLog;
