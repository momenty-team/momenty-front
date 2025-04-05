import CircleIcon from '@/assets/svg/log-detail/circle.svg';
import CloseIcon from '@/assets/svg/log-detail/close.svg';
import { postMessageToWebView } from '@/utils/webview';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface BooleanLogAdderProps {
  moveTodayLog: VoidFunction;
}

function BooleanLogAdder({ moveTodayLog }: BooleanLogAdderProps) {
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();

  const handleBooleanClick = async (value: 'O' | 'X') => {
    try {
      setLoading(true);
      await fetch(`/api/records/${params.get('id')}/details`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: value,
          option_id: null,
          is_public: true,
        }),
      });

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
      <div className="flex mx-5 gap-[2px] flex-none mt-5">
        <div className="text-caption-2-sb text-blue-300">12:34</div>
        <div className="text-caption-2-sb text-indigo-100">에 물 섭취 순간을 남길게요.</div>
      </div>

      <div className="flex gap-3 grow mx-5 py-6">
        <button
          className="flex items-center justify-center rounded-[12px] bg-[#A5D0FE] w-full"
          onClick={() => handleBooleanClick('O')}
        >
          <CircleIcon width={64} height={64} />
        </button>

        <div
          className="flex items-center justify-center rounded-[12px] bg-[#EC7B8E] w-full"
          onClick={() => handleBooleanClick('X')}
        >
          <CloseIcon width={64} height={64} />
        </div>
      </div>
    </>
  );
}

export default BooleanLogAdder;
