'use client';

import { useRouter } from 'next/navigation';
import ChevronRightIcon from '@/assets/svg/chevron-right.svg';

function Home() {
  const router = useRouter();
  const handleAddButton = () => {
    router.push('/add-log');
  };

  return (
    <div className="flex flex-col pt-40 px-4 bg-[##F4F6F9]">
      <button onClick={handleAddButton} className="flex flex-col p-5 gap-5 rounded-[20px] shadow-4 bg-white">
        <div className="flex flex-row items-center w-full justify-between">
          <div className="flex flex-row items-center justify-center gap-2">
            <div className="w-5 h-5 bg-slate-400 rounded-md" />
            <span className="text-body-2-m">기록 추가하기</span>
          </div>
          <ChevronRightIcon className="[&>path]:stroke-[#021730]" style={{ width: '24px', height: '24px' }} />
        </div>
        <span className="text-[#99A5B4] text-body-2-r">나만의 기록을 만들어 보세요.</span>
      </button>
    </div>
  );
}

export default Home;
