import { cookies } from 'next/headers';

interface WeekFeedback {
  id: number;
  title: string;
  level: string;
  content: string;
  created_at: string;
}

export default async function FeedbackCollectionPage() {
  const cookieHeader = (await cookies()).toString();
  const response = await fetch('https://api.momenty.co.kr/records/feedbacks', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
    cache: 'no-store',
  });

  if (!response.ok) throw new Error('데이터를 가져오지 못했습니다.');

  const { record_feedbacks }: { record_feedbacks: WeekFeedback[] } = await response.json();

  return (
    <div className="max-w-full mx-auto mb-8 px-4 mt-6">
      <h1 className="text-subtitle-2-sb mb-6">주간 피드백 기록</h1>
      <div className="space-y-4">
        {record_feedbacks.map(({ id, title, content, level, created_at }) => {
          const formattedDate = new Date(created_at).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          return (
            <details key={id} className="rounded-lg overflow-hidden">
              <summary className="cursor-pointer px-4 py-4 bg-indigo-5 active:bg-indigo-50 font-medium">
                <div className="flex w-full justify-between gap-1">
                  <span className="w-full text-indigo-700 text-body-3-m flex-1">{title}</span>
                  <span className="text-indigo-700 text-caption-1-r">{formattedDate}</span>
                </div>
              </summary>
              <div className="px-4 py-3 bg-white leading-relaxed text-indigo-700 whitespace-pre-wrap">
                <p className="my-2 text-label-1-m">레벨: {level}</p>
                <p className="text-body-3-r">{content}</p>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}
