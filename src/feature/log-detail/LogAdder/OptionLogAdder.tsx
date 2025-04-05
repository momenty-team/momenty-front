import PlusCircleIcon from '@/assets/svg/log-detail/plus-circle.svg';
import { postMessageToWebView } from '@/utils/webview';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface OptionLogAdderProps {
  moveTodayLog: VoidFunction;
}

function OptionLogAdder() {
  // const [loading, setLoading] = useState(false);
  // const params = useSearchParams();
  // const handleAddLog: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   try {
  //     setLoading(true);
  //     await fetch(`/api/records/${params.get('id')}/details`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         // content: value,
  //         option_id: null,
  //         is_public: true,
  //       }),
  //     });

  //     postMessageToWebView({ toast: { type: 'success', message: '기록이 저장되었어요!' } });
  //     // moveTodayLog();
  //   } catch (error) {
  //     console.error('Error adding log:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <div className="flex mx-5 gap-[2px] flex-none mt-5">
        <div className="text-caption-2-sb text-blue-300">12:34</div>
        <div className="text-caption-2-sb text-indigo-100">에 물 섭취 순간을 남길게요.</div>
      </div>

      <div className="mx-5 mt-1.5 flex-none text-caption-3-sb text-indigo-100">
        해당하는 옵션을 탭해서 기록을 남겨주세요.
      </div>

      <div className="flex gap-4 grow mx-5 mt-5 flex-wrap content-start">
        <div className="flex gap-1.5 py-1 px-3 rounded-[99px] bg-[#3C8EE7] text-body-2-sb text-indigo-5 w-fit h-fit">
          50ml
        </div>
        <div className="flex gap-1.5 py-1 px-3 rounded-[99px] bg-[#3C8EE7] text-body-2-sb text-indigo-5 w-fit h-fit">
          100ml
        </div>
        <div className="flex gap-1.5 py-1 px-3 rounded-[99px] bg-[#3C8EE7] text-body-2-sb text-indigo-5 w-fit h-fit">
          120ml
        </div>
        <div className="flex gap-1.5 py-1 px-3 rounded-[99px] bg-[#3C8EE7] text-body-2-sb text-indigo-5 w-fit h-fit">
          350ml
        </div>
        <div className="flex gap-1.5 py-1 px-3 rounded-[99px] bg-[#3C8EE7] text-body-2-sb text-indigo-5 w-fit h-fit">
          1010ml
        </div>
        <div className="flex gap-1.5 py-1 px-3 rounded-[99px] bg-[#3C8EE7] text-body-2-sb text-indigo-5 w-fit h-fit">
          101494944840ml
        </div>
        <div className="flex gap-1.5 py-1 px-3 rounded-[99px] bg-[#3C8EE7] text-body-2-sb text-indigo-5 w-fit h-fit">
          101494944840ml
        </div>
        <div className="flex gap-1.5 py-1 px-3 rounded-[99px] bg-[#3C8EE7] text-body-2-sb text-indigo-5 w-fit h-fit">
          101494944840ml
        </div>
        <div className="flex items-center gap-1 py-1 px-3 rounded-[99px] bg-[#3C8EE7] text-body-2-sb text-indigo-5 w-fit h-fit">
          <div className="text-body-2-sb text-indigo-5">옵션 추가</div>
          <PlusCircleIcon width={21} height={20} />
        </div>
      </div>
      <button
        className="py-[14px] px-6 rounded-[8px] bg-indigo-700 text-indigo-5 text-body-3-b w-[calc(100vw-40px)] mx-5 flex-none my-5"
        onClick={() => {}}
      >
        기록하기
      </button>
    </>
  );
}

export default OptionLogAdder;
