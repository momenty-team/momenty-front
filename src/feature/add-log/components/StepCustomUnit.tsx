'use client';

import useKeyboardResize from '@/common/hooks/useKeyboardResize';
import { useFormContext, useWatch } from 'react-hook-form';

interface StepCreateProps {
  onNext: React.MouseEventHandler<HTMLButtonElement>;
}

function StepCustomUnit({ onNext }: StepCreateProps) {
  const { register, control } = useFormContext();
  const unit = useWatch({ control, name: 'unit' });
  const { viewportHeight, keyboardHeight } = useKeyboardResize();

  const containerHeight = viewportHeight - (keyboardHeight ?? 0);
  const isKeyboardHidden = !keyboardHeight;

  return (
    <div
      className={`flex flex-col w-full justify-between bg-indigo-5 ${isKeyboardHidden && 'pb-[52px]'}`}
      style={{ height: `${containerHeight}px` }}
    >
      <div className="flex flex-col gap-6 pt-2 px-6">
        <div className="flex flex-col gap-3">
          <span className="text-subtitle-1-b">단위를 정해볼까요?</span>
          <span className="text-label-1-r text-indigo-100">원하는 단위를 입력해주세요.</span>
        </div>
        <input
          type="text"
          enterKeyHint="done"
          placeholder="단위를 입력해주세요."
          className="flex w-full h-14 border-b-[4px] border-indigo-200 bg-transparent rounded-none subtitle-3-sb"
          {...register('unit', { required: '단위를 입력해주세요.' })}
        />
      </div>
      <div className={`${isKeyboardHidden && 'px-6'}`}>
        <button
          onClick={onNext}
          className={`w-full flex justify-center items-center bg-indigo-700 text-indigo-5 py-[14px] text-body-1-b h-14 disabled:bg-indigo-50 ${
            isKeyboardHidden && 'rounded-[8px]'
          }`}
          disabled={!unit.trim()}
        >
          다음으로
        </button>
      </div>
    </div>
  );
}

export default StepCustomUnit;
