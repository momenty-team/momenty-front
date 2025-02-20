'use client';

import { suitFont } from '@/styles/font';
import { postMessageToWebView } from '@/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function LogDetail() {
  const route = useRouter();
  const [selectedNavIndex, setSelectedNavIndex] = useState(0);
  const [value, setValue] = useState(false);

  return (
    <main className={`w-full h-dvh flex flex-col items-center gap-5 ${suitFont.className}`}>
      <header className="fixed w-full flex flex-col items-center pb-5 bg-white">
        <div className="text-indigo-700 text-body-3-sb">물 섭취</div>
        <div className="text-indigo-100 text-caption-3-sb">오늘 남긴 기록이 아직 없어요.</div>
        <button className="absolute top-0 right-4 text-indigo-300 text-body-2-sb" onClick={() => {}}>
          설정
        </button>
      </header>

      <nav className="fixed grid w-full grid-cols-3 top-[58px] bg-white">
        {['기록 남기기', '오늘 기록', '최근 동향'].map((nav, index) => (
          <button
            key={nav}
            className="p-1.5 text-center text-label-1-sb text-indigo-700"
            onClick={() => setSelectedNavIndex(index)}
          >
            {nav}
          </button>
        ))}
        <div
          className={`w-[calc(100vw/3)] h-[1.4px] bg-blue-400 absolute bottom-0 transition-transform duration-300 ease-in-out`}
          style={{
            transform: `translateX(${selectedNavIndex * 100}%)`,
          }}
        />
      </nav>

      {selectedNavIndex === 0 && (
        <section className="mt-[100px] w-full h-[calc(100vh-100px)] flex flex-col align-center justify-evenly">
          <div className="flex mx-5 gap-[2px] flex-none mb-2">
            <div className="text-caption-2-sb text-blue-300">12:34</div>
            <div className="text-caption-2-sb text-indigo-100">에 물 섭취 순간을 남길게요.</div>
          </div>

          <textarea
            className="p-3 rounded-[8px] bg-indigo-5 mx-5 grow text-body-2-m"
            placeholder="오늘의 기록을 적어주세요."
          />

          <button
            className="py-[14px] px-6 rounded-[8px] bg-indigo-700 text-indigo-5 text-body-3-b w-[calc(100vw-40px)] mx-5 flex-none my-5"
            onClick={() => setValue(false)}
          >
            저장하기
          </button>
        </section>
      )}

      {selectedNavIndex === 1 && !value && (
        <section className="mt-[100px] w-full h-full flex flex-col align-center justify-evenly">
          <div className="w-[102px] h-[102px] bg-indigo-50 rounded-[12px] mx-auto" />
          <div className="text-body-3-sb text-indigo-400 text-center">
            오늘 물 섭취 기록이 없어요.
            <br />
            바로 첫 기록을 남겨볼까요?
          </div>
          <div className="flex gap-5">
            <button
              className="py-2 px-6 rounded-[8px] bg-indigo-700 text-indigo-5 text-body-3-b w-fit mx-auto"
              onClick={() => setSelectedNavIndex(0)}
            >
              기록 남기기
            </button>
            <button
              className="py-2 px-6 rounded-[8px] bg-indigo-700 text-indigo-5 text-body-3-b w-fit mx-auto"
              onClick={() => {
                setSelectedNavIndex(0);
                setValue(true);
              }}
            >
              기록 있을 때
            </button>
          </div>
        </section>
      )}

      {selectedNavIndex === 1 && value && (
        <section className="mt-[84px] w-full h-full flex flex-col align-center gap-[1px]">
          {[
            { time: '12:35', content: '글들 ~~~~' },
            {
              time: '12:35',
              content:
                '아침에 물을 먹었는데겁나 많이 먹었다. 아 겁나 배부르다. 하지만 그래도 기록을 해야하니 기록을...',
            },
            { time: '16:35', content: '글들 ~~~~' },
            { time: '12:00', content: 'dPtldlqslekasdfjlahsdlfjhasdfkahjsgdfajshdfgaljshdflaksjhdlkjsah' },
            { time: '18:51', content: '글들 ~~~~' },
          ].map(({ time, content }, index) => (
            <button key={index} className="py-2 px-5 bg-indigo-5 flex flex-col">
              <div className="flex items-end w-full gap-3">
                <div className="text-display-2-el">{time}</div>
                <div className="flex align-center w-full bg-indigo-25 h-[52px] rounded-[8px] px-4 py-3 text-caption-3-sb text-indigo-300">
                  <div
                    className="text-left line-clamp-2 overflow-hidden text-ellipsis break-all whitespace-normal"
                    style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                    }}
                  >
                    {content}
                  </div>
                </div>
              </div>
              <div className="text-display-4-r mb-1">레이블</div>
            </button>
          ))}
        </section>
      )}

      {selectedNavIndex === 2 && (
        <section className="mt-[100px] w-full h-full flex flex-col align-center justify-evenly">
          <div className="w-[102px] h-[102px] bg-indigo-50 rounded-[12px] mx-auto" />
          <div className="text-body-3-sb text-indigo-400 text-center">최근동향은 준비중!</div>
          <button
            className="py-2 px-6 rounded-[8px] bg-indigo-700 text-indigo-5 text-body-3-b w-fit mx-auto"
            onClick={() => setSelectedNavIndex(0)}
          >
            기록 남기기
          </button>
        </section>
      )}
    </main>
  );
}

export default LogDetail;
