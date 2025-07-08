import UserIcon from '@/assets/svg/user/user.svg';
import YellowBellIcon from '@/assets/svg/user/yellow-bell.svg';
import NoticeIcon from '@/assets/svg/user/notice.svg';
import MomentyIIcon from '@/assets/svg/user/momenty-i.svg';
import PaperIcon from '@/assets/svg/user/paper.svg';
import LockerIcon from '@/assets/svg/user/locker.svg';
import HeadsetIcon from '@/assets/svg/user/headset.svg';
import PatchIcon from '@/assets/svg/user/patch.svg';
import NavigationMenuButton from '@/common/components/NavigationMenuButton';
import AlarmButton from '@/feature/user/AlarmButton';
import { cookies } from 'next/headers';

const MENU = [
  {
    title: '계정',
    items: [{ title: '내 정보', path: '/user/info', icon: <UserIcon /> }],
  },
  {
    title: '일반',
    items: [{ title: '알람 설정', path: '/user/notification', icon: <YellowBellIcon /> }],
  },
  {
    title: '기타',
    items: [
      { title: '공지사항', path: '/user/notice', icon: <NoticeIcon /> },
      { title: '모먼티 약관 확인', path: '/user/term', icon: <MomentyIIcon /> },
      { title: '오픈소스 라이선스', path: '/user/open-source', icon: <PaperIcon /> },
      { title: '개인정보 처리 방침', path: '/user/privacy', icon: <LockerIcon /> },
      {
        title: '문의하기',
        path: 'https://docs.google.com/forms/d/1i0nvT-L6BGuIFERNbHu-lqVqxTBdNnWs9E4__CIakAU/edit?hl=ko',
        icon: <HeadsetIcon />,
        isExternal: true,
      },
      { title: '버전 관리', path: '/user/info-qq', icon: <PatchIcon /> },
    ],
  },
];

async function User() {
  const cookieHeader = (await cookies()).toString();
  const response = await fetch('https://api.momenty.co.kr/users/me', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
    cache: 'no-cache',
  });

  if (!response.ok) throw new Error('데이터를 가져오지 못했습니다.');

  return (
    <>
      <header className="width-full flex flex-row-reverse py-[12px] px-[12px]">
        <AlarmButton />
      </header>

      <div className="flex flex-col gap-6 mx-6 mb-4">
        {MENU.map(({ title, items }) => (
          <section key={title} className="flex flex-col gap-3">
            <h3 className="text-body-1-sb">{title}</h3>
            <div className="flex flex-col gap-5">
              {items.map(({ title, icon, path, isExternal }) => (
                <NavigationMenuButton key={title} title={title} icon={icon} path={path} isExternal={isExternal} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

export default User;
