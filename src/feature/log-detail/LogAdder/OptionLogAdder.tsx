import { getCurrentTimeHHMM } from '@/utils';
import { postMessageToWebView } from '@/utils/webview';
import { useState } from 'react';
import type { Option } from '@/types/apis/records';
interface OptionLogAdderProps {
  id: string;
  title: string;
  options: Option[];
  moveTodayLog: VoidFunction;
}

function OptionLogAdder({ id, title, moveTodayLog, options }: OptionLogAdderProps) {
  const [loading, setLoading] = useState(false);
  const [checkedOptionList, setCheckedOptionList] = useState<string[]>([]);
  const handleAddLog: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);
      await fetch(`/api/records/${id}/options`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          options: checkedOptionList,
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

  const handleCheckedLog: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setCheckedOptionList((prev) => [...prev, value]);
    } else {
      setCheckedOptionList((prev) => prev.filter((option) => option !== value));
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

      <div className="flex gap-3 grow mx-5 mt-5 flex-wrap content-start">
        {options.map(({ id, option }) => (
          <label
            htmlFor={String(id)}
            key={id}
            className={`flex py-1.5 px-3 rounded-[8px] bg-indigo-100 text-body-2-sb text-indigo-5 w-fit h-fit ${
              checkedOptionList.includes(option) ? 'bg-indigo-700 text-indigo-5' : 'text-indigo-100'
            }`}
          >
            <input
              id={String(id)}
              type="checkbox"
              className="peer hidden"
              value={option}
              checked={checkedOptionList.includes(option)}
              onChange={handleCheckedLog}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>

      <button
        className="py-[14px] px-6 rounded-[8px] bg-indigo-700 text-indigo-5 text-body-3-b w-[calc(100vw-40px)] mx-5 flex-none my-5"
        onClick={handleAddLog}
        disabled={loading || checkedOptionList.length === 0}
      >
        기록하기
      </button>
    </>
  );
}

export default OptionLogAdder;
