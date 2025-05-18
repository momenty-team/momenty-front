import WeekFeedback from '@/feature/analysis/week-feedback';

interface WeekFeedbackPageProps {
  searchParams: {
    year: string;
    month: string;
    day: string;
  };
}

async function WeekFeedbackPage({ searchParams }: WeekFeedbackPageProps) {
  const { year, month, day } = await searchParams;

  return <WeekFeedback year={year} month={month} day={day} />;
}

export default WeekFeedbackPage;
