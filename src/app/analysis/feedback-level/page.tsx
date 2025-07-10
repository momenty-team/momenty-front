import { LineChart } from '@/common/components/Chart';
import { UserClient } from '@/utils/client';

interface WeekFeedback {
  id: number;
  title: string;
  level: string;
  content: string;
  created_at: string;
}

export default async function FeedbackChartPage() {
  const { record_feedbacks }: { record_feedbacks: WeekFeedback[] } = await UserClient.get(
    'https://api.momenty.co.kr/records/feedbacks'
  );

  const sorted = record_feedbacks.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  const levelData = sorted.map((feedback) => Number(feedback.level));
  const averageLevel = levelData.reduce((sum, level) => sum + level, 0) / levelData.length;
  const labels = sorted.map((feedback) =>
    new Date(feedback.created_at).toLocaleDateString('ko-KR', {
      month: '2-digit',
      day: '2-digit',
    })
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: '레벨 변화',
        data: levelData,
        backgroundColor: 'rgba(99, 102, 241, 0.3)',
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
