import { parseSimpleMarkdown } from '@/utils';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface WritingInfoProps {
  recordsId: string;
}

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

interface DetailData {
  date: string;
  week: string;
  count: number;
}
interface WritingTrends {
  start_date: string;
  end_date: string;
  data: DetailData[];
  total_count: number;
  average_count: number;
}

function WritingInfo({ recordsId }: WritingInfoProps) {
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

  const getMaxCount = (trends: WritingTrends | null): number => {
    if (trends?.data.length === 0) return 0;
    if (!trends) return 0;
    return Math.max(...trends.data.map((data) => data.count));
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
  }, [recordsId, year, month, day]);

  if (!writingTrends) {
    return <div />;
  }

  if (writingTrends && writingTrends.total_count === 0) {
    return (
      <div className="flex flex-col gap-4 px-5 py-4 h-full items-center justify-center">
        <span className="text-label-1-r text-indigo-300">최근 7일 동안 기록이 없어요.😭</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-5 py-4 h-full">
      <div className="text-label-1-r text-indigo-300">
        {writingTrends?.start_date} ~ {writingTrends?.end_date}
      </div>

      <div className="w-full h-64 min-h-64 flex flex-col justify-between gap-2">
        <div className="flex items-center justify-between w-full flex-1">
          <div className="flex flex-1 items-end justify-around w-full h-full">
            {writingTrends?.data.map((data) => (
              <div
                key={data.date}
                className="flex w-5 bg-blue-400 rounded-t-[4px]"
                style={{
                  height: `${changeIndexHeight(data.count, getMaxCount(writingTrends))}%`,
                }}
              />
            ))}
          </div>
          <div className="flex flex-col justify-between h-full w-8">
            <span className="text-caption-3-m text-indigo-100">{getMaxCount(writingTrends)}</span>{' '}
            <span className="text-caption-3-m text-indigo-100">{getMaxCount(writingTrends) / 2}</span>
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
        <span className="text-body-3-m">지난 7일동안 총 기록 횟수는 {writingTrends?.total_count}개 입니다.</span>
      </div>
      <div className="flex flex-col px-4 py-3 w-full bg-indigo-5 rounded-[8px]">
        <span className="text-body-3-m">평균 기록 횟수</span>
        <span className="text-label-1-r text-indigo-300">
          지난 7일동안 하루 평균 기록 횟수는 {writingTrends?.average_count}번 입니다.
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

export default WritingInfo;
