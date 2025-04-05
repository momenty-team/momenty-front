'use client';

import useKeyboardResize from '@/common/hooks/useKeyboardResize';
import { suitFont } from '@/styles/font';
import { useEffect, useState } from 'react';
import ContentSection from './ContentSection';
// import TodayLogNotFound from './TodayLog/NotFound';
import TodayLog from './TodayLog';
import CurrentInfoNotFound from './CurrentInfo/NotFound';
import LogAdder from '../LogAdder';
import { useSearchParams } from 'next/navigation';
import { postMessageToWebView } from '@/utils/webview';

const 기록_남기기 = 0;
const 오늘_기록 = 1;
const 최근_동향 = 2;

const logOption = ['string', 'boolean', 'option', 'number'] as const;

export type LogOption = (typeof logOption)[number];

function LogDetail() {
  const { keyboardHeight } = useKeyboardResize();
  const [selectedNavIndex, setSelectedNavIndex] = useState(0);
  const [snapIndex, setSnapIndex] = useState(0);
  const [isTextAreaFocus, setIsTextAreaFocus] = useState(false);
  const params = useSearchParams();
  const [recordTitle, setRecordTitle] = useState<string>('');

  // 나중에 지우기
  const [exampleIndex, setExampleIndex] = useState(2);

  const changeSnapIndex = (index: number) => {
    setSnapIndex(index);
  };

  const moveTodayLog = () => {
    setSelectedNavIndex(1);
  };

  const goToLogSetting = () => {
    // ~~~~
    postMessageToWebView({ route: `/log-setting/${params.get('id')}` });
  };

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 0);
  }, [keyboardHeight]);

  useEffect(() => {
    if (params) {
      const fetchRecords = async () => {
        const res = await fetch(`/api/records/${params.get('id')}/details`);
        if (!res.ok) throw new Error('데이터를 가져오는 데 실패했습니다.');
        const data = await res.json();
        setRecordTitle(data.title);
      };

      fetchRecords();
    }
  }, [params]);

  return (
    <main className={`w-full flex h-full flex-col items-center gap-5 ${suitFont.className} scroll-smooth`}>
      <header className="fixed w-full flex flex-col items-center pb-5 bg-white top-0">
        <div className="text-indigo-700 text-body-3-sb">{recordTitle}</div>
        <div className="text-indigo-100 text-caption-3-sb">오늘 남긴 기록이 아직 없어요.</div>
        <button className="absolute top-0 right-4 text-indigo-300 text-body-2-sb" onClick={goToLogSetting}>
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

      <ContentSection snapIndex={snapIndex} isTextAreaFocus={isTextAreaFocus}>
        {selectedNavIndex === 기록_남기기 && (
          <LogAdder
            snapIndex={snapIndex}
            changeSnapIndex={changeSnapIndex}
            isTextAreaFocus={isTextAreaFocus}
            setIsTextAreaFocus={setIsTextAreaFocus}
            option={logOption[exampleIndex]}
            moveTodayLog={moveTodayLog}
          />
        )}

        {selectedNavIndex === 오늘_기록 && (
          <>
            {/* <TodayLogNotFound goToLogAdder={() => setSelectedNavIndex(0)} /> */}
            <TodayLog option={logOption[exampleIndex]} changeSnapIndex={changeSnapIndex} />
          </>
        )}

        {selectedNavIndex === 최근_동향 && <CurrentInfoNotFound goToLogAdder={() => setSelectedNavIndex(0)} />}
      </ContentSection>
    </main>
  );
}

export default LogDetail;
