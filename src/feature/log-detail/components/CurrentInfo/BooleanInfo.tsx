import { parseSimpleMarkdown } from '@/utils';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BooleanInfoProps {
  recordsId: string;
}

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

interface BooleanData {
  date: string;
  week: string;
  ox_count: {
    o_count: number;
    x_count: number;
  };
}

interface BooleanTrends {
  start_date: string;
  end_date: string;
  data: BooleanData[];
  total_counts: {
    o_count: number;
    x_count: number;
  };
  average_count: number;
}

function BooleanInfo({ recordsId }: BooleanInfoProps) {
  const searchParams = useSearchParams();
  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const day = searchParams.get('day');

  const [booleanTrends, setBooleanTrends] = useState<BooleanTrends | null>(null);
  const [summaryData, setSummaryData] = useState<string | null>(null);

  const getMaxCount = (trends: BooleanTrends | null): number => {
    if (!trends || trends.data.length === 0) return 0;

    return Math.max(...trends.data.map(({ ox_count }) => Math.max(ox_count.o_count, ox_count.x_count)));
  };

  const fetchBooleanTrends = async () => {
    try {
      const response = await fetch(`/api/records/${recordsId}/trends/ox?year=${year}&month=${month}&day=${day}`);
      const data = await response.json();
      if (!response.ok) throw new Error('데이터를 가져오지 못했습니다.');
      setBooleanTrends(data);
    } catch (error) {
      console.error('Error fetching boolean trends:', error);
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
    fetchBooleanTrends();
    getSummary();
  }, [recordsId, year, month, day]);

  const changeIndexHeight = (value: number, maxValue: number) => {
    const height = (value / maxValue) * 100;
    return height;
  };

  if (!booleanTrends) {
    return <div />;
  }

  if (booleanTrends && booleanTrends.total_counts.o_count === 0 && booleanTrends.total_counts.x_count === 0) {
    return (
      <div className="flex flex-col gap-4 px-5 py-4 h-full items-center justify-center">
        <span className="text-label-1-r text-indigo-300">최근 7일 동안 기록이 없어요.😭</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-5 py-4 h-full">
      <div className="text-label-1-r text-indigo-300">
        {booleanTrends?.start_date} ~ {booleanTrends?.end_date}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-2 bg-blue-200 rounded-[2px]" />
          <span className="text-caption-3-sb text-indigo-200">O</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-2 bg-[#F97E80] rounded-[2px]" />
          <span className="text-caption-3-sb text-indigo-200">X</span>
        </div>
      </div>

      <div className="w-full h-64 min-h-64 flex flex-col justify-between gap-2">
        <div className="flex items-center justify-between w-full flex-1">
          <div className="flex flex-1 items-end justify-around w-full h-full">
            {booleanTrends?.data.map((data) => (
              <div key={data.date} className="flex w-5 h-full items-end gap-[2px]">
                <div
                  className="flex w-[9px] bg-blue-400 rounded-t-[2px]"
                  style={{
                    height: `${changeIndexHeight(data.ox_count.o_count, getMaxCount(booleanTrends))}%`,
                  }}
                />
                <div
                  className="flex w-[9px] bg-[#F97E80] rounded-t-[2px]"
                  style={{
                    height: `${changeIndexHeight(data.ox_count.x_count, getMaxCount(booleanTrends))}%`,
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-between h-full w-8">
            <span className="text-caption-3-m text-indigo-100">{getMaxCount(booleanTrends)}</span>{' '}
            <span className="text-caption-3-m text-indigo-100">{getMaxCount(booleanTrends) / 2}</span>
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
        <span className="text-body-3-m">
          지난 7일동안 O 횟수는 <strong className="text-blue-400">{booleanTrends?.total_counts.o_count}</strong>
          번입니다.
        </span>
      </div>
      <div className="flex flex-col px-4 py-3 w-full bg-indigo-5 rounded-[8px]">
        <span className="text-body-3-m">
          지난 7일동안 X 횟수는 <strong className="text-[#F97E80]">{booleanTrends?.total_counts.x_count}</strong>
          번입니다.
        </span>
      </div>
      <div className="flex flex-col px-4 py-3 w-full bg-indigo-5 rounded-[8px] gap-1">
        <span className="text-body-3-m">평균 기록 횟수</span>
        <span className="text-label-1-r text-indigo-300">
          지난 7일동안 하루 평균 기록 횟수는 {booleanTrends?.average_count}번 입니다.
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

export default BooleanInfo;
