'use client';

import { postMessageToWebView } from '@/utils/webview';
import { useEffect, useRef, useState } from 'react';

import BooleanLogAdder from './BooleanLogAdder';
import OptionLogAdder from './OptionLogAdder';
import NumberLogAdder from './NumberLogAdder';
import WritingLogAdder from './WritingLogAdder';

export type LogOption = ['string', 'boolean', 'option', 'number'][number];

interface LogAdderProps {
  changeSnapIndex: (index: number) => void;
  setIsTextAreaFocus: (isFocus: boolean) => void;
  isTextAreaFocus: boolean;
  option: LogOption;
  snapIndex: number;
  moveTodayLog: VoidFunction;
}

function LogAdder({
  changeSnapIndex,
  isTextAreaFocus,
  setIsTextAreaFocus,
  option,
  snapIndex,
  moveTodayLog,
}: LogAdderProps) {
  const [isClose, setIsClose] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const getMessageToApp = (e: MessageEvent) => {
    const { bottomSheet } = JSON.parse(e.data);

    if (bottomSheet?.state === 'close') {
      textareaRef.current?.blur();
      changeSnapIndex(-1);
      setIsTextAreaFocus(false);
      setIsClose(true);
    }

    if (bottomSheet?.state === 'hold') {
      changeSnapIndex(bottomSheet.snapIndex);
      if (bottomSheet.snapIndex === 1) {
        setIsTextAreaFocus(false);
        textareaRef.current?.blur();
      }

      if (bottomSheet.snapIndex > 1 && option === 'number') {
        //option number일때만으로 한정해야함.
        setIsTextAreaFocus(true);
      }
    }
  };

  const handleKeyBoardAreaFocus = () => {
    setIsTextAreaFocus(true);
    postMessageToWebView({ bottomSheet: { name: 'keyboard', state: 'hold', snapIndex: 2 } });
  };

  const handleKeyBoardAreaBlur = () => {
    setIsTextAreaFocus(false);
    if (!isClose) {
      postMessageToWebView({ bottomSheet: { name: 'keyboard', state: 'hold', snapIndex: 1 } });
    }
  };

  useEffect(() => {
    document.addEventListener('message', getMessageToApp as EventListener);
    window.addEventListener('message', getMessageToApp);

    return () => {
      document.removeEventListener('message', getMessageToApp as EventListener);
      window.removeEventListener('message', getMessageToApp);
    };
  }, [option]);

  if (option === 'string') {
    return (
      <WritingLogAdder
        ref={textareaRef}
        handleTextAreaFocus={handleKeyBoardAreaFocus}
        handleTextAreaBlur={handleKeyBoardAreaBlur}
        moveTodayLog={moveTodayLog}
      />
    );
  }

  if (option === 'number') {
    return (
      <NumberLogAdder
        snapIndex={snapIndex}
        isTextAreaFocus={isTextAreaFocus}
        handleNumberPadFocus={handleKeyBoardAreaFocus}
        handleNumberPadBlur={handleKeyBoardAreaBlur}
        moveTodayLog={moveTodayLog}
      />
    );
  }

  if (option === 'boolean') {
    return <BooleanLogAdder moveTodayLog={moveTodayLog} />;
  }

  if (option === 'option') {
    return <OptionLogAdder />;
  }

  return <div>잘못된 접근입니다.</div>;
}

export default LogAdder;
