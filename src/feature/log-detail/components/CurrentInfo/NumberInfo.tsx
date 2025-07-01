import { parseSimpleMarkdown } from '@/utils';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface NumberLogProps {
  recordsId: string;
}

interface NumberData {
  date: string;
  week: string;
  value: string;
}

interface NumberTrends {
  start_date: string;
  end_date: string;
  data: NumberData[];
  total_count: number;
  average_count: number;
}

function extractNumber(value: string): number {
  const match = value.match(/\d+(\.\d+)?/);
  return match ? Number(match[0]) : NaN;
}

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

function NumberInfo({ recordsId }: NumberLogProps) {
  const searchParams = useSearchParams();
  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const day = searchParams.get('day');

  const [numberTrends, setNumberTrends] = useState<NumberTrends | null>(null);
  const [summaryData, setSummaryData] = useState<string | null>(null);

  const fetchNumberTrends = async () => {
    try {
      const response = await fetch(`/api/records/${recordsId}/trends/numbers?year=${year}&month=${month}&day=${day}`);
      const data = await response.json();
      if (!response.ok) throw new Error('데이터를 가져오지 못했습니다.');
      setNumberTrends(data);
    } catch (error) {
      console.error('Error fetching number trends:', error);
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
    fetchNumberTrends();
    getSummary();
  }, [recordsId, year, month, day]);

  const changeIndexHeight = (value: number, maxValue: number) => {
    const height = (value / maxValue) * 100;
    return height;
  };

  const getMaxCount = (trends: NumberTrends | null): number => {
    if (trends?.data.length === 0) return 0;
    if (!trends) return 0;
    return Math.max(...trends.data.map((data) => extractNumber(data.value)));
  };

  if (!numberTrends) {
    return <div />;
  }

  if (numberTrends && numberTrends.total_count === 0) {
    return (
      <div className="flex flex-col gap-4 px-5 py-4 h-full items-center justify-center">
        <span className="text-label-1-r text-indigo-300">최근 7일 동안 기록이 없어요.😭</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-5 py-4 h-full">
      <div className="text-label-1-r text-indigo-300">
        {numberTrends?.start_date} ~ {numberTrends?.end_date}
      </div>

      <div className="w-full h-64 min-h-64 flex flex-col justify-between gap-2">
        <div className="flex items-center justify-between w-full flex-1">
          <div className="flex flex-1 items-end justify-around w-full h-full">
            {numberTrends?.data.map((data) => (
              <div
                key={data.date}
                className="flex w-5 bg-blue-400 rounded-t-[4px]"
                style={{
                  height: `${changeIndexHeight(extractNumber(data.value), getMaxCount(numberTrends))}%`,
                }}
              />
            ))}
          </div>
          <div className="flex flex-col justify-between h-full w-8">
            <span className="text-caption-3-m text-indigo-100">{getMaxCount(numberTrends)}</span>{' '}
            <span className="text-caption-3-m text-indigo-100">{getMaxCount(numberTrends) / 2}</span>
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
        <span className="text-body-3-m">지난 7일동안 총 기록 횟수는 {numberTrends?.total_count}개 입니다.</span>
      </div>
      <div className="flex flex-col px-4 py-3 w-full bg-indigo-5 rounded-[8px]">
        <span className="text-body-3-m">평균 기록 횟수</span>
        <span className="text-label-1-r text-indigo-300">
          지난 7일동안 하루 평균 기록 횟수는{numberTrends?.average_count}번 입니다.
        </span>
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

export default NumberInfo;
