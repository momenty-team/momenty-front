import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface WritingInfoProps {
  MOCK_DATA: {
    startDate: string;
    endDate: string;
    data: {
      date: string;
      week: string;
      value: number;
    }[];
    maxValue: number;
  };
  recordsId: string;
}

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

interface DayCounts {
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
}
interface WritingTrends {
  day_counts: DayCounts;
  total_count: number;
  average_count: number;
}

function WritingInfo({ MOCK_DATA, recordsId }: WritingInfoProps) {
  const searchParams = useSearchParams();
  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const day = searchParams.get('day');

  const [writingTrends, setWritingTrends] = useState<WritingTrends | null>(null);
  const [summaryData, setSummaryData] = useState<string | null>(null);
  const changeIndexHeight = (value: number, maxValue: number) => {
    const height = (value / maxValue) * 100;
    return height;
  };

  const fetchWritingTrends = async () => {
    try {
      const response = await fetch(`/api/records/${recordsId}/trends/texts?year=${year}&month=${month}&day=${day}`);
      const data = await response.json();
      if (!response.ok) throw new Error('데이터를 가져오지 못했습니다.');
      setWritingTrends(data);
    } catch (error) {
      console.error('Error fetching writing trends:', error);
    }
  };

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
    fetchWritingTrends();
    getSummary();
    console.log('WritingTrends');
  }, [recordsId, year, month, day]);

  return (
    <div className="flex flex-col gap-4 px-5 py-4 h-full">
      <div className="text-label-1-r text-indigo-300">
        {MOCK_DATA.startDate} ~ {MOCK_DATA.endDate}
      </div>

      <div className="w-full h-64 min-h-64 flex flex-col justify-between gap-2">
        <div className="flex items-center justify-between w-full flex-1">
          <div className="flex flex-1 items-end justify-around w-full h-full">
            {MOCK_DATA.data.map((data) => (
              <div
                key={data.date}
                className="flex w-5 bg-blue-400 rounded-t-[4px]"
                style={{
                  height: `${changeIndexHeight(data.value, MOCK_DATA.maxValue)}%`,
                }}
              />
            ))}
          </div>
          <div className="flex flex-col justify-between h-full w-8">
            <span className="text-caption-3-m text-indigo-100">{MOCK_DATA.maxValue}</span>{' '}
            <span className="text-caption-3-m text-indigo-100">{MOCK_DATA.maxValue / 2}</span>
            <span className="text-caption-3-m text-indigo-100">0</span>
          </div>
        </div>

        <div className="flex items-center w-[calc(100%-32px)] justify-around pt-3">
          {WEEK_DAYS.map((day, index) => (
            <span key={index} className="text-body-3-m text-indigo-200">
              {day}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col px-4 py-3 w-full bg-indigo-5 rounded-[8px]">
        <span className="text-body-3-m">지난 7일동안 평균 기록 횟수는</span>
        <span className="text-body-3-m">3개 입니다.</span>
      </div>
      <div className="flex flex-col px-4 py-3 w-full bg-indigo-5 rounded-[8px] gap-1">
        <span className="text-body-3-m text-black">이번 주 요약</span>
        <ul className="list-disc list-inside text-black">
          <li className="text-label-1-r text-indigo-300">{summaryData ?? '데이터가 없습니다.'}</li>
        </ul>
      </div>
    </div>
  );
}

export default WritingInfo;
