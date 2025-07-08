'use client';

import { useState, useEffect } from 'react';

interface FeedbackData {
  title: string;
  level: string;
  feedback: string;
}

interface WeekFeedbackProps {
  year: string;
  month: string;
  day: string;
}

function WeekFeedback({ year, month, day }: WeekFeedbackProps) {
  const [feedbackData, setFeedbackData] = useState<FeedbackData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingDots, setLoadingDots] = useState('');

  useEffect(() => {
    let dotsCount = 0;
    let intervalId: NodeJS.Timeout;

    if (isLoading) {
      intervalId = setInterval(() => {
        dotsCount = (dotsCount + 1) % 4;
        setLoadingDots('.'.repeat(dotsCount === 0 ? 3 : dotsCount));
      }, 300);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isLoading]);

  const getFeedback = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/records/feedback?year=${year}&month=${month}&day=${day}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          health_kit: '',
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error('데이터를 가져오지 못했습니다.');

      setFeedbackData(data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 px-6 py-6 h-[100vh] items-center justify-between pb-[42px]">
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="text-subtitle-1-b w-full">미래 조언/피드백 받기</h1>
        <div className="w-[200px] h-[220px] bg-blue-400 my-[32px] rounded-md" />
        <div className="text-body-2-m text-indigo-300 px-1">
          {feedbackData ? (
            <div className="flex flex-col gap-2">
              <h2 className="text-subtitle-3-sb">{feedbackData.title}</h2>
              {/* <p className="text-body-2-m">{feedbackData.level}</p> */}
              <p className="text-body-2-r">{feedbackData.feedback}</p>
            </div>
          ) : (
            <span>피드백 데이터를 받아보세요~</span>
          )}
        </div>
      </div>
      <button
        type="button"
        className={`${isLoading ? 'bg-indigo-25' : 'bg-indigo-700'} rounded-[8px] w-full py-[14px]`}
        onClick={getFeedback}
        disabled={isLoading}
      >
        <span className={`${isLoading ? 'text-indigo-300' : 'text-indigo-5'} text-body-1-sb`}>
          {isLoading ? `AI 피드백 생성중${loadingDots}` : 'AI 피드백 받기'}
        </span>
      </button>
    </div>
  );
}

export default WeekFeedback;
