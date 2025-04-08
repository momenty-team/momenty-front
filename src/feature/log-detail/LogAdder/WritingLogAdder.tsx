import { forwardRef, useState } from 'react';
import { postMessageToWebView } from '@/utils/webview';
import { getCurrentTimeHHMM } from '@/utils';
import { useRouter } from 'next/navigation';

interface WritingLogAdderProps {
  id: string;
  title: string;
  handleTextAreaFocus: VoidFunction;
  handleTextAreaBlur: VoidFunction;
  moveTodayLog: VoidFunction;
}

function WritingLogAdder(
  { id, title, handleTextAreaFocus, handleTextAreaBlur, moveTodayLog }: WritingLogAdderProps,
  ref: React.Ref<HTMLTextAreaElement>
) {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const handleAddLog: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);
      await fetch(`/api/records/${id}/details`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: value,
          option_ids: null,
          is_public: true,
        }),
      });

      router.refresh();

      setValue('');
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
      <div className="flex mx-5 gap-[2px] flex-none mb-2 mt-5">
        <div className="text-caption-2-sb text-blue-300">{getCurrentTimeHHMM()}</div>
        <div className="text-caption-2-sb text-indigo-100">에 {title} 순간을 남길게요.</div>
      </div>

      <textarea
        ref={ref}
        className="p-3 rounded-[8px] bg-indigo-5 mx-5 grow text-body-2-m"
        placeholder="오늘의 기록을 적어주세요."
        onFocus={handleTextAreaFocus}
        onBlur={handleTextAreaBlur}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />

      <button
        className="py-[14px] px-6 rounded-[8px] bg-indigo-700 text-indigo-5 text-body-3-b w-[calc(100vw-40px)] mx-5 flex-none my-5"
        onClick={handleAddLog}
        disabled={loading || value.trim().length === 0}
      >
        저장하기
      </button>
    </>
  );
}

export default forwardRef(WritingLogAdder);
