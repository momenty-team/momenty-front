'use client';

import TopNavigation from '@/components/TopNavigation';
import { suitFont } from '@/styles/font';
import { useRouter } from 'next/navigation';

function UserInfoEdit() {
  const route = useRouter();

  return (
    <>
      <TopNavigation onClickBack={() => route.back()} backGroundColor="transparent" />
      <main className={`flex flex-col items-center justify-between gap-5 pt-12 ${suitFont.className}`}>
        <form className="flex flex-col w-full gap-3">
          <div className="flex flex-col gap-1 align-center px-[22.5px]">
            <label className="text-body-3-m text-indigo-300">이름</label>
            <input className="flex justify-between h-[41px] align-center px-2 py-2 bg-indigo-5 rounded-[8px]"></input>
          </div>
          <div className="flex flex-col gap-1 align-center px-[22.5px]">
            <label className="text-body-3-m text-indigo-300">생년월일</label>
            <input className="flex justify-between h-[41px] align-center px-2 py-2 bg-indigo-5 rounded-[8px]"></input>
          </div>
          <div className="flex flex-col gap-1 align-center px-[22.5px]">
            <label className="text-body-3-m text-indigo-300">휴대폰 번호</label>
            <input
              className="flex justify-between h-[41px] align-center px-2 py-2 bg-indigo-5 rounded-[8px]"
              value="010-0000-0000"
              disabled
            ></input>
          </div>
          <div className="flex flex-col gap-1 align-center px-[22.5px]">
            <label className="text-body-3-m text-indigo-300">이메일</label>
            <input className="flex justify-between h-[41px] align-center px-2 py-2 bg-indigo-5 rounded-[8px]"></input>
          </div>
        </form>
        <button
          onClick={() => route.back()}
          className="fixed flex justify-center items-center bg-[#021730] text-[#F4F6F9] py-[14px] text-body-1-b h-14 w-[calc(100%-48px)] rounded-[8px] bottom-14"
        >
          수정 완료
        </button>
      </main>
    </>
  );
}

export default UserInfoEdit;
