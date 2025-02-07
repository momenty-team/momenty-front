'use client';

import usePreventScrollOnKeyboard from '@/hooks/usePreventScrollOnKeyboard';
import { useEffect, useState } from 'react';

function StepTopic({ onNext }: { onNext: () => void }) {
  const [viewportHeight, setViewportHeight] = useState<number>(window.innerHeight);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  usePreventScrollOnKeyboard();

  useEffect(() => {
    const onResize = () => {
      if (window.visualViewport) {
        const visualViewportHeight = window.visualViewport?.height;
        const heightDiff = visualViewportHeight ? window.innerHeight - visualViewportHeight : 0;
        setKeyboardHeight(heightDiff > 0 ? heightDiff : 0);
        setViewportHeight(window.innerHeight);
      }
    };

    window.visualViewport?.addEventListener('resize', onResize);
    return () => {
      window.visualViewport?.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div
      className={`flex flex-col justify-between bg-[#F4F6F9] ${keyboardHeight > 0 ? '' : 'pb-10.5'}`}
      style={{ height: `${viewportHeight - keyboardHeight}px` }}
    >
      <div className="flex flex-col pt-4 gap-4">
        <div className="px-6">
          <p className="text-subtitle-1-b ">어떤 순간을 기록으로</p>
          <p className="text-subtitle-1-b">남기고 싶나요?</p>
        </div>
        <div className="px-6">
          <p className="text-body-4-sb text-[#99A5B4]">기록으로 남기고 싶은 주제를 작성해주세요.</p>
          <p className="text-body-4-sb text-[#99A5B4]">예시로 물 섭취량, 책, 여행 등을 기록할 수 있어요.</p>
        </div>
        <div className="px-6">
          <input className="flex w-full h-14 border-b-1 border-[#5A6B7F] bg-[#F4F6F9] rounded-none" />
        </div>
      </div>
      <div className={`${keyboardHeight > 0 ? '' : 'px-6'}`}>
        <button
          onClick={onNext}
          className={`w-full flex justify-center items-center bg-[#021730] text-[#F4F6F9] py-[14px] text-body-1-b h-14 ${
            keyboardHeight > 0 ? '' : 'rounded-[8px]'
          }`}
        >
          다음으로
        </button>
      </div>
    </div>
  );
}

export default StepTopic;
