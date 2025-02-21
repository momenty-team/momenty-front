import { useState } from 'react';

interface StepCreateProps {
  onNext: React.MouseEventHandler<HTMLButtonElement>;
}

function StepCustomUnit({ onNext }: StepCreateProps) {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="flex w-full h-[calc(100vh-48px)] flex-col justify-between bg-[#F4F6F9] pt-4 px-6 pb-[52px]">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <span className="text-subtitle-1-b">단위를 정해볼까요?</span>
          <span className="text-label-1-r text-indigo-100">원하는 단위를 입력해주세요.</span>
        </div>
        <input
          type="text"
          placeholder="단위를 입력해주세요."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex w-full h-14 border-b-[4px] border-indigo-200 bg-transparent rounded-none subtitle-3-sb"
        />
      </div>
      <button
        onClick={onNext}
        className={
          'w-full flex justify-center items-center bg-[#021730] text-[#F4F6F9] py-[14px] text-body-1-b h-14 rounded-[8px] disabled:bg-indigo-50'
        }
        disabled={!inputValue}
      >
        확인
      </button>
    </div>
  );
}

export default StepCustomUnit;
