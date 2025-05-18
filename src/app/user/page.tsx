import UserIcon from '@/assets/svg/user/user.svg';
import UsersIcon from '@/assets/svg/user/users.svg';
import PlusUserIcon from '@/assets/svg/user/plus-user.svg';
import YellowBellIcon from '@/assets/svg/user/yellow-bell.svg';
import NoticeIcon from '@/assets/svg/user/notice.svg';
import MomentyIIcon from '@/assets/svg/user/momenty-i.svg';
import PaperIcon from '@/assets/svg/user/paper.svg';
import LockerIcon from '@/assets/svg/user/locker.svg';
import HeadsetIcon from '@/assets/svg/user/headset.svg';
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
    items: [
      { title: '알람 설정', path: '/user/info3', icon: <YellowBellIcon /> },
      { title: '계정 공개 범위', path: '/user/info4', icon: <UserIcon /> },
    ],
  },
  {
    title: '기타',
    items: [
      { title: '공지사항', path: '/user/notice', icon: <NoticeIcon /> },
      { title: '모먼티 약관 확인', path: '/user/info6', icon: <MomentyIIcon /> },
      { title: '오픈소스 라이선스', path: '/user/open-source', icon: <PaperIcon /> },
      { title: '개인정보 처리 방침', path: '/user/privacy', icon: <LockerIcon /> },
      {
        title: '문의하기',
        path: 'https://docs.google.com/forms/d/1i0nvT-L6BGuIFERNbHu-lqVqxTBdNnWs9E4__CIakAU/edit?hl=ko',
        icon: <HeadsetIcon />,
        isExternal: true,
      },
      { title: '버전 관리', path: '/user/info-qq', icon: <UserIcon /> },
    ],
  },
];

interface UsersMeResponse {
  id: number;
  name?: string;
  nickname: string;
  birth_date: string;
  email?: string;
  profile_image_url: string;
  gender: string;
  is_public: boolean;
  follower_count?: number;
  following_count?: number;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

async function User() {
  const cookieHeader = (await cookies()).toString();
  const response = await fetch('https://api.momenty.co.kr/users/me', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
    cache: 'no-cache',
  });

  if (!response.ok) throw new Error('데이터를 가져오지 못했습니다.');

  const { nickname, follower_count, following_count }: UsersMeResponse = await response.json();

  return (
    <>
      <header className="width-full flex flex-row-reverse py-[12px] px-[12px]">
        <AlarmButton />
      </header>

      <div className="flex flex-col gap-6 mx-6">
        <div className="py-3 flex gap-4 items-center">
          <div className="w-16 h-16 bg-[#f3f5f9] rounded-[12px]" />
          <div className="flex flex-col gap-0.5">
            <div className="text-[#010a15] text-subtitle-3-sb">{nickname}</div>
            <div className="flex items-center gap-3">
              <div className="text-[#010a15] text-body-3-r">팔로잉 {following_count || '00'}</div>
              <div className="text-[#010a15] text-body-3-r">팔로워 {follower_count || '00'}</div>
            </div>
          </div>
        </div>

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
