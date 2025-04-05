import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface RecordDetail {
  id: number;
  content: string[];
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

function WritingLog() {
  const params = useSearchParams();
  const [recordDetails, setRecordDetails] = useState<RecordDetail[]>([]);

  useEffect(() => {
    if (params) {
      const fetchRecords = async () => {
        const res = await fetch(`/api/records/${params.get('id')}/details`);
        if (!res.ok) throw new Error('데이터를 가져오는 데 실패했습니다.');
        const data = await res.json();
        setRecordDetails(data.records);
      };

      fetchRecords();
    }
  }, [params]);

  return (
    <>
      {recordDetails?.map(({ id, content, created_at }) => (
        <button key={id} className="py-2 px-5 bg-indigo-5 flex flex-col">
          <div className="flex items-end w-full gap-3">
            <div className="text-display-2-el">{created_at.slice(11, 16)}</div>
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
