import CalendarIcon from '@/assets/svg/calendar.svg';
import LevelCollectorIcon from '@/assets/svg/level-collector.svg';
import FutureAdviceFeedbackIcon from '@/assets/svg/future-advice-feedback.svg';
import FeedbackCollectionIcon from '@/assets/svg/feedback-collection.svg';
import NavigationAnalysisButton from '@/common/components/NavigationAnalysisButton';

const MENU = [
  {
    title: '미래 조언, 피드백 받기',
    text: '미래의 나를 위한 조언과 피드백을 받아요.',
    path: '/analysis/week-feedback',
    icon: <FutureAdviceFeedbackIcon width={60} height={60} />,
  },
  {
    title: '피드백 모아보기',
    text: '지금까지 받았던 피드백을 모아봐요.',
    path: '/analysis/feedback-collection',
    icon: <FeedbackCollectionIcon width={52} height={52} />,
  },
  {
    title: '생활 레벨 모아보기',
    text: '그래프로 생활 레벨 동향을 확인해요.',
    path: '/analysis/feedback-level',
    icon: <LevelCollectorIcon width={52} height={52} />,
  },
  {
    title: '지난 날 피드백 받기',
    text: `달력을 통해 지난 날의 피드백을 받아요.`,
    path: '/calendar?from=analysis',
    icon: <CalendarIcon width={52} height={52} />,
  },
];

async function Analysis() {
  return (
    <div className="flex flex-col gap-4 mx-6 mt-10">
      {MENU.map(({ title, path, icon, text }) => (
        <section className="flex flex-col gap-3" key={title}>
          <NavigationAnalysisButton key={title} title={title} text={text} icon={icon} path={path} />
        </section>
      ))}
    </div>
  );
}

export default Analysis;
