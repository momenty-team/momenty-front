'use client';

import BellIcon from '@/assets/svg/bell.svg';
import UserIcon from '@/assets/svg/user/user.svg';
import ChevronRightIcon from '@/assets/svg/chevron-right.svg';
import UsersIcon from '@/assets/svg/user/users.svg';
import PlusUserIcon from '@/assets/svg/user/plus-user.svg';
import YellowBellIcon from '@/assets/svg/user/yellow-bell.svg';
import NoticeIcon from '@/assets/svg/user/notice.svg';
import MomentyIIcon from '@/assets/svg/user/momenty-i.svg';
import PaperIcon from '@/assets/svg/user/paper.svg';
import LockerIcon from '@/assets/svg/user/locker.svg';
import HeadsetIcon from '@/assets/svg/user/headset.svg';
import { useState } from 'react';

const MENU = [
  {
    title: '계정',
    items: [{ title: '내 정보', icon: <UserIcon /> }],
  },
  {
    title: '일반',
    items: [
      { title: '친구 추가', icon: <UsersIcon /> },
      { title: '친구 관리', icon: <PlusUserIcon /> },
      { title: '알람 설정', icon: <YellowBellIcon /> },
      { title: '계정 공개 범위', icon: <UserIcon /> },
    ],
  },
  {
    title: '기타',
    items: [
      { title: '공지사항', icon: <NoticeIcon /> },
      { title: '모먼티 약관 확인', icon: <MomentyIIcon /> },
      { title: '오픈소스 라이선스', icon: <PaperIcon /> },
      { title: '개인정보 처리 방침', icon: <LockerIcon /> },
      { title: '문의하기', icon: <HeadsetIcon /> },
      { title: '버전 관리', icon: <UserIcon /> },
    ],
  },
];

function User() {
  const [activeButtonId, setActiveButtonId] = useState<string | null>(null);

  const activeButton = (id: string) => {
    setActiveButtonId(id);
  };

  const removeActiveButton = () => {
    setActiveButtonId(null);
  };

  const onClickAlarmButton = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ route: '/alarm' }));
    }
  };

  return (
    <div className="w-full">
      <header className="width-full flex flex-row-reverse py-[12px] px-[12px]">
        <button onClick={onClickAlarmButton} type="button">
          <BellIcon className="flex" width={26} height={26} />
        </button>
      </header>

      <div className="flex flex-col gap-6 mx-6">
        <div className="py-3 flex gap-4 items-center">
          <div className="w-16 h-16 bg-[#f3f5f9] rounded-[12px]" />
          <div className="flex flex-col gap-0.5">
            <div className="text-[#010a15] text-subtitle-3-sb">아무개</div>
            <div className="flex items-center gap-3">
              <div className="text-[#010a15] text-body-3-r">팔로잉 00</div>
              <div className="text-[#010a15] text-body-3-r">팔로워 00</div>
            </div>
          </div>
        </div>

        {MENU.map(({ title, items }) => (
          <section key={title} className="flex flex-col gap-3">
            <h3 className="text-body-1-sb">{title}</h3>
            <div className="flex flex-col gap-5">
              {items.map(({ title, icon }) => (
                <button
                  key={title}
                  className="relative flex justify-center items-center ease-out origin-center group"
                  onTouchStart={() => activeButton(title)}
                  onTouchMove={removeActiveButton}
                  onTouchEnd={removeActiveButton}
                >
                  <div
                    className={`absolute bg-transparent w-[calc(100%+16px)] h-[calc(100%+12px)] transition-all duration-300 ease-out ${activeButtonId === title && 'group-active:bg-[#ebebeb] group-active:scale-[0.98]'} rounded-[6px]`}
                  ></div>

                  <div
                    className={`w-full flex items-center justify-between ${activeButtonId === title && 'group-active:scale-[0.96]'} transition-transform duration-200 ease-out origin-center relative`}
                  >
                    <div className="flex items-center gap-4 ">
                      <div className="w-8 h-8 bg-indigo-5 rounded-[4px] flex items-center justify-center">{icon}</div>
                      <div className="text-body-2-sb">{title}</div>
                    </div>

                    <ChevronRightIcon
                      className="[&>path]:stroke-[#99A5B4] relative"
                      style={{ width: 16, height: 16 }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default User;
