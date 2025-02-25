'use client';

import { postMessageToWebView } from '@/utils';
import { useEffect, useRef } from 'react';
import type { LogOption } from '.';

import CircleIcon from '@/assets/svg/log-detail/circle.svg';
import CloseIcon from '@/assets/svg/log-detail/close.svg';
import PlusCircleIcon from '@/assets/svg/log-detail/plus-circle.svg';

interface LogAdderProps {
  changeSnapIndex: (index: number) => void;
  setIsTextAreaFocus: (isFocus: boolean) => void;
  option: LogOption;
}

function LogAdder({ changeSnapIndex, setIsTextAreaFocus, option }: LogAdderProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const getMessageToApp = (e: MessageEvent) => {
    const { bottomSheet } = JSON.parse(e.data);

    if (bottomSheet?.state === 'close') {
      textareaRef.current?.blur();
      changeSnapIndex(-1);
    }

    if (bottomSheet?.state === 'hold') {
      changeSnapIndex(bottomSheet.snapIndex);
    }
  };

  useEffect(() => {
    document.addEventListener('message', getMessageToApp as EventListener);
    window.addEventListener('message', getMessageToApp);
  }, []);

  if (option === 'string') {
    return (
      <>
        <div className="flex mx-5 gap-[2px] flex-none mb-2 mt-5">
          <div className="text-caption-2-sb text-blue-300">12:34</div>
          <div className="text-caption-2-sb text-indigo-100">에 물 섭취 순간을 남길게요.</div>
        </div>

        <textarea
          ref={textareaRef}
          className="p-3 rounded-[8px] bg-indigo-5 mx-5 grow text-body-2-m"
          placeholder="오늘의 기록을 적어주세요."
          onFocus={() => {
            setIsTextAreaFocus(true);
            postMessageToWebView({ bottomSheet: { name: 'keyboard', state: 'hold', snapIndex: 1 } });
          }}
          onBlur={() => {
            setIsTextAreaFocus(false);
            postMessageToWebView({ bottomSheet: { name: 'keyboard', state: 'hold', snapIndex: 0 } });
          }}
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

  if (option === 'boolean') {
    return (
      <>
        <div className="flex mx-5 gap-[2px] flex-none mt-5">
          <div className="text-caption-2-sb text-blue-300">12:34</div>
          <div className="text-caption-2-sb text-indigo-100">에 물 섭취 순간을 남길게요.</div>
        </div>

        <div className="flex gap-3 grow mx-5 py-6">
          <div className="flex items-center justify-center rounded-[12px] bg-[#A5D0FE] w-full">
            <CircleIcon width={64} height={64} />
          </div>

          <div className="flex items-center justify-center rounded-[12px] bg-[#EC7B8E] w-full">
            <CloseIcon width={64} height={64} />
          </div>
        </div>
      </>
    );
  }

  if (option === 'option') {
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

  if (option === 'number') {
    return (
      <>
        <div className="flex mx-5 gap-[2px] flex-none mt-5">
          <div className="text-caption-2-sb text-blue-300">12:34</div>
          <div className="text-caption-2-sb text-indigo-100">에 물 섭취 순간을 남길게요.</div>
        </div>

        <div
          className="flex w-full h-full grow gap-2.5 px-5 grow my-3 items-end flex-row-reverse"
          onFocus={() => {
            postMessageToWebView({ bottomSheet: { name: 'keyboard', state: 'hold', snapIndex: 1 } });
          }}
          onBlur={() => {
            setIsTextAreaFocus(false);
            postMessageToWebView({ bottomSheet: { name: 'keyboard', state: 'hold', snapIndex: 0 } });
          }}
        >
          <div className="text-indigo-500 text-display-3-eb">ML</div>
          <div className="text-indigo-500 text-display-3-eb">1,000</div>
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

  return <div>잘못된 접근입니다.</div>;
}

export default LogAdder;
