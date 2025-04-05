import NumberPad from '@/common/components/NumberPad';
import { postMessageToWebView } from '@/utils/webview';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface NumberLogAdderProps {
  isTextAreaFocus: boolean;
  snapIndex: number;
  handleNumberPadFocus: VoidFunction;
  handleNumberPadBlur: VoidFunction;
  moveTodayLog: VoidFunction;
}

function NumberLogAdder({
  isTextAreaFocus,
  snapIndex,
  handleNumberPadFocus,
  handleNumberPadBlur,
  moveTodayLog,
}: NumberLogAdderProps) {
  const [NumberPadValue, setNumberPadValue] = useState('0');
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const handleAddLog = async () => {
    try {
      setLoading(true);
      await fetch(`/api/records/${params.get('id')}/details`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: NumberPadValue,
          option_id: null,
          is_public: true,
        }),
      });

      setNumberPadValue('0');
      handleNumberPadBlur();
      postMessageToWebView({ toast: { type: 'success', message: '기록이 저장되었어요!' } });
      moveTodayLog();
    } catch (error) {
      console.error('Error adding log:', error);
    } finally {
      setLoading(false);
    }
  };

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
            {/* <div className="flex h-[50px] items-center text-display-3-eb pr-8"></div> */}
            {/* 이 위의 유닛은 다희가 마저 null 안뜨게 해야지 고칠 수 있다. */}
          </div>
        </div>

        <button
          onTouchEnd={handleNumberPadFocus}
          className={`py-[14px] px-6 rounded-[8px] bg-indigo-700 text-indigo-5 text-body-3-b w-[calc(100vw-40px)] mx-5 flex-none my-5 transition-all duration-[0.6s] delay-[0.2s] ease-out
              ${!isTextAreaFocus ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[180%] invisible'}`}
          disabled={loading || NumberPadValue === '0'}
        >
          기록하기
        </button>

        <div
          className={`fixed bottom-0 left-0 w-full transition-all duration-[0.6s] ease-out transform h-[356px]
            ${isTextAreaFocus ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
        >
          <NumberPad NumberPadValue={NumberPadValue} setNumberPadValue={setNumberPadValue} onClickSave={handleAddLog} />
        </div>
      </div>
    </>
  );
}

export default NumberLogAdder;
