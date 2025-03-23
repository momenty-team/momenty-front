import { forwardRef } from 'react';

interface WritingLogAdderProps {
  handleTextAreaFocus: VoidFunction;
  handleTextAreaBlur: VoidFunction;
}

function WritingLogAdder(
  { handleTextAreaFocus, handleTextAreaBlur }: WritingLogAdderProps,
  ref: React.Ref<HTMLTextAreaElement>
) {
  return (
    <>
      <div className="flex mx-5 gap-[2px] flex-none mb-2 mt-5">
        <div className="text-caption-2-sb text-blue-300">12:34</div>
        <div className="text-caption-2-sb text-indigo-100">에 물 섭취 순간을 남길게요.</div>
      </div>

      <textarea
        ref={ref}
        className="p-3 rounded-[8px] bg-indigo-5 mx-5 grow text-body-2-m"
        placeholder="오늘의 기록을 적어주세요."
        onFocus={handleTextAreaFocus}
        onBlur={handleTextAreaBlur}
      />

      <button
        className="py-[14px] px-6 rounded-[8px] bg-indigo-700 text-indigo-5 text-body-3-b w-[calc(100vw-40px)] mx-5 flex-none my-5"
        onClick={() => {}}
      >
        저장하기
      </button>
    </>
  );
}

export default forwardRef(WritingLogAdder);
