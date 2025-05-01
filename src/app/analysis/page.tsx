import UserIcon from '@/assets/svg/user/user.svg';
import UsersIcon from '@/assets/svg/user/users.svg';
import NavigationAnalysisButton from '@/common/components/NavigationAnalysisButton';

const MENU = [
  { title: '오늘 하루 분석하기', text: '오늘 하루, 무슨 일이 있었을까?', path: '/analysis/', icon: <UsersIcon /> },
  { title: '이번주 분석하기', text: '이번 주 요약 리포트 보기', path: '/analysis/week-analysis', icon: <UsersIcon /> },
  { title: '한달 분석하기', text: '한 달 동안의 나, 돌아보기', path: '/analysis/', icon: <UserIcon /> },
  { title: '지금까지 분석하기', text: '모든 기록, 한눈에 보기', path: '/analysis/', icon: <UserIcon /> },
  { title: '미래 조언, 피드백 받기', text: '미래의 나를 위한 조언 받기', path: '/analysis/', icon: <UserIcon /> },
];

async function Analysis() {
  return (
    <div className="flex flex-col gap-4 mx-6">
      {MENU.map(({ title, path, icon }) => (
        <section className="flex flex-col gap-3" key={title}>
          <NavigationAnalysisButton key={title} title={title} icon={icon} path={path} />
        </section>
      ))}
    </div>
  );
}

export default Analysis;
