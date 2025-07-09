import { getCurrentTimeHHMM } from '@/utils';
import { postMessageToWebView } from '@/utils/webview';
import { useState } from 'react';
import type { Option } from '@/types/apis/records';
import { useRouter, useSearchParams } from 'next/navigation';

interface OptionLogAdderProps {
  id: string;
  title: string;
  options: Option[];
  moveTodayLog: VoidFunction;
}

function OptionLogAdder({ id, title, moveTodayLog, options }: OptionLogAdderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const day = searchParams.get('day');
  const [loading, setLoading] = useState(false);
  const [checkedOptionIdList, setCheckedOptionIdList] = useState<string[]>([]);
  const handleAddLog: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      await fetch(`/api/records/${id}/details?year=${year}&month=${month}&day=${day}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: '',
          option_ids: checkedOptionIdList,
          is_public: true,
        }),
      });

      router.refresh();

      postMessageToWebView({ toast: { type: 'success', message: '기록이 저장되었어요!' } });
      moveTodayLog();
    } catch (error) {
      console.error('Error adding log:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckedLog: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked, id } = e.target;

    if (checked) {
      setCheckedOptionIdList((prev) => [...prev, id]);
    } else {
      setCheckedOptionIdList((prev) => prev.filter((optionId) => optionId !== id));
    }
  };

  return (
    <>
      <div className="flex mx-5 gap-[2px] flex-none mt-5">
        <div className="text-caption-2-sb text-blue-300">{getCurrentTimeHHMM()}</div>
        <div className="text-caption-2-sb text-indigo-100">에 {title} 순간을 남길게요.</div>
      </div>
      <div className="mx-5 mt-1.5 flex-none text-caption-3-sb text-indigo-100">
        해당하는 옵션을 탭해서 기록을 남겨주세요.
      </div>

      <div className="flex gap-3 grow mx-5 mt-2 flex-wrap content-start">
        {options.map(({ id, option }) => (
          <label
            htmlFor={String(id)}
            key={id}
            className={`flex py-1.5 px-3 rounded-[8px] bg-indigo-100 text-body-2-sb text-indigo-5 w-fit h-fit ${
              checkedOptionIdList.includes(String(id)) ? 'bg-indigo-700 text-indigo-5' : 'text-indigo-100'
            }`}
          >
            <input
              id={String(id)}
              type="checkbox"
              className="peer hidden"
              value={option}
              checked={checkedOptionIdList.includes(String(id))}
              onChange={handleCheckedLog}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>

      <button
        className="py-[14px] px-6 rounded-[8px] bg-indigo-700 text-indigo-5 text-body-3-b w-[calc(100vw-40px)] mx-5 flex-none my-5"
        onClick={handleAddLog}
        disabled={loading || checkedOptionIdList.length === 0}
      >
        기록하기
      </button>
    </>
  );
}

export default OptionLogAdder;
