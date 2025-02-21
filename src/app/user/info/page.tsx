'use client';

import TopNavigation from '@/common/components/TopNavigation';
import { suitFont } from '@/styles/font';
import { postMessageToWebView } from '@/utils';
import { useRouter } from 'next/navigation';

function UserInfo() {
  const route = useRouter();
  return (
    <>
      <TopNavigation onClickBack={() => postMessageToWebView({ route: 'goBack' })} backGroundColor="transparent">
        <button onClick={() => route.push('/user/info/edit')} className="text-body-1-r">
          수정
        </button>
      </TopNavigation>
      <main className={`flex flex-col items-center gap-5 mt-12 ${suitFont.className}`}>
        <div className="w-[72px] h-[72px] bg-indigo-50 rounded-[12px] my-[15px]" />
        <section className="flex flex-col w-full">
          <div className="flex justify-between align-center px-8 py-2">
            <span className="text-body-1-m text-indigo-300">이름</span>
            <span className="text-body-1-m text-indigo-300">김혜준</span>
          </div>
          <div className="flex justify-between align-center px-8 py-2">
            <span className="text-body-1-m text-indigo-300">생년월일</span>
            <span className="text-body-1-m text-indigo-300">2002.02.28</span>
          </div>
          <div className="flex justify-between align-center px-8 py-2">
            <span className="text-body-1-m text-indigo-300">휴대폰 번호</span>
            <span className="text-body-1-m text-indigo-300">010-0000-0000</span>
          </div>
          <div className="flex justify-between align-center px-8 py-2">
            <span className="text-body-1-m text-indigo-300">이메일 주소</span>
            <span className="text-body-1-m text-indigo-300">aaa123@gmail.com</span>
          </div>
        </section>
      </main>
    </>
  );
}

export default UserInfo;
