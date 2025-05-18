'use client';

import { useEffect, useState } from 'react';
import useKeyboardResize from '@/common/hooks/useKeyboardResize';
import type { LogRecord, Option, RecordDetail } from '@/types/apis/records';

import ContentSection from './ContentSection';
import TodayLog from './TodayLog';
import LogAdder from '../LogAdder';
import useAppMessage from '@/common/hooks/useAppMessage';
import { useRouter } from 'next/navigation';
import CurrentInfo from './CurrentInfo';

const 기록_남기기 = 0;
const 오늘_기록 = 1;
const 최근_동향 = 2;
interface LogDetailProps {
  id: string;
  logOption: LogRecord['method'];
  title: LogRecord['title'];
  logDetailList: RecordDetail[];
  unit?: string;
  options?: Option[];
}

function LogDetail({ id, logOption, title, logDetailList, unit, options }: LogDetailProps) {
  const router = useRouter();
  const { keyboardHeight } = useKeyboardResize();
  const [selectedNavIndex, setSelectedNavIndex] = useState(0);
  const [snapIndex, setSnapIndex] = useState(0);
  const [isTextAreaFocus, setIsTextAreaFocus] = useState(false);

  const changeSnapIndex = (index: number) => {
    setSnapIndex(index);
  };

  const moveTodayLog = () => {
    setSelectedNavIndex(1);
  };

  const moveLogAdder = () => {
    setSelectedNavIndex(0);
  };

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 0);
  }, [keyboardHeight]);

  useAppMessage(({ viewState }) => {
    if (viewState === 'focus') {
      router.refresh();
    }
  }, []);

  return (
    <>
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
            id={id}
            title={title}
            option={logOption}
            snapIndex={snapIndex}
            changeSnapIndex={changeSnapIndex}
            isTextAreaFocus={isTextAreaFocus}
            setIsTextAreaFocus={setIsTextAreaFocus}
            moveTodayLog={moveTodayLog}
            unit={unit}
            options={options}
          />
        )}

        {selectedNavIndex === 오늘_기록 && (
          <TodayLog
            option={logOption}
            title={title}
            changeSnapIndex={changeSnapIndex}
            moveLogAdder={moveLogAdder}
            logDetailList={logDetailList}
            unit={unit}
          />
        )}

        {selectedNavIndex === 최근_동향 && <CurrentInfo option={logOption} changeSnapIndex={changeSnapIndex} id={id} />}
      </ContentSection>
    </>
  );
}

export default LogDetail;
