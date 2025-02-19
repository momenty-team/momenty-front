'use client';

import ChevronRightIcon from '@/assets/svg/chevron-right.svg';
import { useRouter } from 'next/navigation';
import BellIcon from '@/assets/svg/bell.svg';
import { postMessageToWebView } from '@/utils';

function Home() {
  const router = useRouter();

  const routeCalendar = () => {
    postMessageToWebView({ route: '/calendar' });
  };

  return (
    <div className="w-full bg-indigo-5">
      <header>
        <button onClick={routeCalendar}>5월 14일</button>
        <BellIcon className="flex" width={26} height={26} />
      </header>
      <button className="flex flex-col p-[20px] gap-[20px] rounded-[20px] shadow-4 bg-white">
        <div className="flex flex-row items-center w-full justify-between">
          <div className="flex flex-row items-center justify-center gap-[8px]">
            <div className="w-5 h-5 bg-indigo-100 rounded-md" />
            <span className="text-body-2-m">기록 추가하기</span>
          </div>
          <ChevronRightIcon className="flex" width={24} height={24} />
        </div>
        <span className="text-indigo-100 text-body-2-r">나만의 기록을 만들어 보세요.</span>
      </button>
    </div>
  );
}

export default Home;
