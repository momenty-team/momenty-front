import { UserClient } from '@/utils/client';

interface WeekFeedback {
  id: number;
  title: string;
  level: string;
  content: string;
  created_at: string;
}

export default async function FeedbackCollectionPage() {
  const { record_feedbacks }: { record_feedbacks: WeekFeedback[] } = await UserClient.get(
    'https://api.momenty.co.kr/records/feedbacks'
  );

  return (
    <div className="max-w-full mx-auto mb-8 px-6">
      <h1 className="text-subtitle-2-sb mb-4">피드백 모아보기</h1>
      <div className="space-y-4 gap-3">
        {record_feedbacks.map(({ id, title, content, level, created_at }) => (
          <details key={id} className="rounded-[4px] overflow-hidden">
            <summary className="cursor-pointer px-4 py-4 bg-indigo-5 active:bg-indigo-50 font-medium">
              <div className="flex w-full justify-between gap-1">
                <span className="w-full text-indigo-700 text-body-4-m flex-1">{title}</span>
                <span className="text-indigo-700 text-label-1-el">
                  {new Date(created_at).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </summary>
            <div className="px-4 py-3 bg-indigo-5 leading-relaxed text-indigo-700 whitespace-pre-wrap">
              <p className="my-2 text-label-1-m text-indigo-700">레벨: {level}</p>
              <p className="text-body-3-r text-indigo-700">{content}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
