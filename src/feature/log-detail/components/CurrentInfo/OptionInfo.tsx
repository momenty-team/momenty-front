import { parseSimpleMarkdown } from '@/utils';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface OptionInfoProps {
  MOCK_DATA: {
    startDate: string;
    endDate: string;
    data: {
      date: string;
      week: string;
      count: number;
      optionList: string[];
    }[];
  };
  recordsId: string;
}

function OptionInfo({ MOCK_DATA, recordsId }: OptionInfoProps) {
  const searchParams = useSearchParams();
  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const day = searchParams.get('day');

  const [summaryData, setSummaryData] = useState<string | null>(null);

  const getSummary = async () => {
    try {
      const response = await fetch(`/api/records/${recordsId}/trends/summary?year=${year}&month=${month}&day=${day}`);
      const data = await response.json();
      if (!response.ok) throw new Error('데이터를 가져오지 못했습니다.');
      setSummaryData(data.summary);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  useEffect(() => {
    getSummary();
    console.log('WritingTrends');
  }, [recordsId, year, month, day]);

  return (
    <div className="flex flex-col gap-4 px-5 py-4 h-full">
      <div className="text-label-1-r text-indigo-300">
        {MOCK_DATA.startDate} ~ {MOCK_DATA.endDate}
      </div>

      <div className="w-full h-64 min-h-64 flex flex-col gap-4">
        <header className="flex items-center justify-between w-full gap-4">
          <span className="min-w-[28px] text-indigo-700 text-center text-body-3-m">요일</span>
          <span className="min-w-[56px] text-indigo-700 text-center text-body-3-m">기록횟수</span>
          <span className="w-full text-indigo-700 text-body-3-m">선택 옵션</span>
        </header>

        {MOCK_DATA.data.map((data) => (
          <div className="flex items-center justify-between w-full gap-4" key={data.date}>
            <div key={data.date} className="flex items-center justify-between w-full gap-4">
              <span className="min-w-[28px] text-indigo-700 text-center text-body-3-m">{data.week}</span>
              <span className="min-w-[56px] text-indigo-700 text-center text-body-3-m">{data.count}회</span>
              <div className="flex gap-1.5 w-full items-center overflow-x-auto">
                {data.optionList.map((option, index) => (
                  <span
                    key={index}
                    className="text-caption-2-sb text-indigo-5 flex px-2 py-1 bg-blue-400 rounded-[4px]"
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col px-4 py-3 w-full bg-indigo-5 rounded-[8px]">
        <span className="text-body-3-m">지난 7일동안 평균 기록 횟수는 28회입니다.</span>
      </div>
      <div className="flex flex-col px-4 py-3 w-full bg-indigo-5 rounded-[8px] gap-3">
        <span className="text-body-3-m text-black">많이 중복된 옵션</span>
        <div className="flex gap-2">
          <div className="text-caption-2-sb text-indigo-5 flex px-2 py-1 bg-blue-400 rounded-[4px]">200ml</div>
          <div className="text-caption-2-sb text-indigo-5 flex px-2 py-1 bg-blue-400 rounded-[4px]">800ml</div>
        </div>
      </div>
      <div className="flex flex-col px-4 py-3 w-full bg-indigo-5 rounded-[8px] gap-1">
        <span className="text-body-3-m text-black">이번 주 요약</span>
        <ul className="list-disc list-inside text-black">
          <li
            className="text-label-1-r text-indigo-300"
            dangerouslySetInnerHTML={{
              __html: parseSimpleMarkdown(summaryData ?? '데이터가 없습니다.'),
            }}
          />
        </ul>
      </div>
    </div>
  );
}

export default OptionInfo;
