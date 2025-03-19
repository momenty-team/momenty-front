import NumberPad from '@/common/components/NumberPad';
import { useState } from 'react';

interface NumberLogAdderProps {
  isTextAreaFocus: boolean;
  snapIndex: number;
  handleNumberPadFocus: VoidFunction;
  handleNumberPadBlur: VoidFunction;
}

function NumberLogAdder({
  isTextAreaFocus,
  snapIndex,
  handleNumberPadFocus,
  handleNumberPadBlur,
}: NumberLogAdderProps) {
  const [NumberPadValue, setNumberPadValue] = useState('0');

  return (
    <>
      <div
        className={`flex flex-col overflow-hidden transition-all duration-[0.4s] ease-out
          ${!isTextAreaFocus && snapIndex <= 0 ? 'h-full' : 'h-[calc(100vh-436px)]'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex mx-5 gap-[2px] flex-none mt-5">
            <div className="text-caption-2-sb text-blue-300">12:34</div>
            <div className="text-caption-2-sb text-indigo-100">에 물 섭취 순간을 남길게요.</div>
          </div>

          <div
            className={`flex w-full h-full items-end justify-end transition-all duration-[0.4s] ease-out
                ${isTextAreaFocus && 'translate-y-[52px] delay-[0.2s]'}`}
          >
            <div className="relative w-[calc(100vw-123px)] h-[50px] flex items-center ml-5 mr-2 text-display-3-eb whitespace-nowrap">
              <div className="min-w-full flex items-center overflow-x-scroll scrollbar-hide justify-end">
                {NumberPadValue}
              </div>
              <div className="absolute top-0 left-0 w-[45px] h-full bg-gradient-to-l from-white/0 to-white" />
            </div>
            <div className="flex h-[50px] items-center text-display-3-eb pr-8">ML</div>
          </div>
        </div>

        <button
          onTouchEnd={handleNumberPadFocus}
          className={`py-[14px] px-6 rounded-[8px] bg-indigo-700 text-indigo-5 text-body-3-b w-[calc(100vw-40px)] mx-5 flex-none my-5 transition-all duration-[0.6s] delay-[0.2s] ease-out
              ${!isTextAreaFocus ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[180%] invisible'}`}
        >
          기록하기
        </button>

        <div
          className={`fixed bottom-0 left-0 w-full transition-all duration-[0.6s] ease-out transform h-[356px]
            ${isTextAreaFocus ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
        >
          <NumberPad
            NumberPadValue={NumberPadValue}
            setNumberPadValue={setNumberPadValue}
            onClickSave={handleNumberPadBlur}
          />
        </div>
      </div>
    </>
  );
}

export default NumberLogAdder;
