import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface RecordDetail {
  id: number;
  content: string[];
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

function NumberLog() {
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
    <div className="flex flex-col gap-[1px]">
      {recordDetails?.map(({ id, content, created_at }) => (
        <button key={id} className="py-2 px-5 bg-indigo-5 flex flex-col">
          <div className="flex items-end w-full gap-3">
            <div className="text-display-2-el">{created_at.slice(11, 16)}</div>
            <div className="ml-auto flex items-center justify-center gap-1.5">
              <span className="text-subtitle-2-r text-indigo-400">{content}</span>{' '}
              {/* <span className="text-subtitle-2-r text-indigo-400">{unit || '%'}</span> */}
            </div>
          </div>
          <div className="text-display-4-r mb-1">레이블</div>
        </button>
      ))}
    </div>
  );
}

export default NumberLog;
