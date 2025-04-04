'use client';
import useKeyboardResize from '@/common/hooks/useKeyboardResize';
import usePreventScrollOnKeyboard from '@/common/hooks/usePreventScrollOnKeyboard';
import { useFormContext, useWatch } from 'react-hook-form';

interface StepTopicProps {
  onNext: () => void;
}

function StepTopic({ onNext }: StepTopicProps) {
  usePreventScrollOnKeyboard();
  const { register, control } = useFormContext();
  const { viewportHeight, keyboardHeight } = useKeyboardResize();
  const containerHeight = viewportHeight - (keyboardHeight ?? 0);
  const unit = useWatch({ control, name: 'title' });

  return (
    <div
      className={`flex flex-col w-full justify-between bg-indigo-5 ${keyboardHeight ? '' : 'pb-[52px]'}`}
      style={{ height: `${containerHeight}px` }}
    >
      <div className="flex flex-col pt-2 gap-4">
        <div className="px-6">
          <div className="text-subtitle-1-b">어떤 순간을 기록으로</div>
          <div className="text-subtitle-1-b">남기고 싶나요?</div>
        </div>
        <div className="px-6">
          <input
            className="flex w-full h-14 border-b-[4px] border-indigo-300 bg-indigo-5 rounded-none"
            {...register('title')}
          />
        </div>
        <div className="px-6">
          <p className="text-body-4-sb text-indigo-100">기록으로 남기고 싶은 주제를 작성해주세요.</p>
          <p className="text-body-4-sb text-indigo-100">예시로 물 섭취량, 책, 여행 등을 기록할 수 있어요.</p>
        </div>
      </div>
      <div className={`${keyboardHeight ? '' : 'px-6'}`}>
        <button
          onClick={onNext}
          className={`w-full flex justify-center items-center bg-indigo-700 text-indigo-5 py-[14px] text-body-1-b h-14 disabled:bg-indigo-50 ${
            keyboardHeight ? '' : 'rounded-[8px]'
          }`}
          disabled={!unit.trim()}
        >
          다음으로
        </button>
      </div>
    </div>
  );
}

export default StepTopic;
