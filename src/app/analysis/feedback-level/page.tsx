// app/feedback/chart/page.tsx
import { LineChart } from '@/common/components/Chart';
import { cookies } from 'next/headers';

interface WeekFeedback {
  id: number;
  title: string;
  level: string; // string으로 오므로 숫자로 변환 필요
  content: string;
  created_at: string;
}

export default async function FeedbackChartPage() {
  const cookieHeader = cookies().toString();

  const response = await fetch('https://api.momenty.co.kr/records/feedbacks', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
    cache: 'no-store',
  });

  if (!response.ok) throw new Error('피드백 데이터를 불러오지 못했습니다.');

  const { record_feedbacks }: { record_feedbacks: WeekFeedback[] } = await response.json();

  // 날짜 순 정렬
  const sorted = record_feedbacks.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  const labels = sorted.map((fb) =>
    new Date(fb.created_at).toLocaleDateString('ko-KR', {
      month: '2-digit',
      day: '2-digit',
    })
  );

  const levelData = sorted.map((fb) => Number(fb.level));

  const averageLevel = levelData.reduce((sum, level) => sum + level, 0) / levelData.length;

  const chartData = {
    labels,
    datasets: [
      {
        label: '레벨 변화',
        data: levelData,
        backgroundColor: 'rgba(99, 102, 241, 0.3)', // indigo-500
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="max-w-full h-[100vh-44px] mx-auto mb-8 px-6">
      <h1 className="text-subtitle-2-sb  mb-4">레벨 변화 차트</h1>
      <div className="text-body-2-sb mb-4">평균 레벨: {averageLevel.toFixed(2)}</div>
      <div className="flex flex-col items-center justify-center h-[320px]">
        <div className="overflow-x-auto w-full">
          <div className="h-[280px]" style={{ width: `${chartData.labels.length * 36}px` }}>
            <LineChart data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}
