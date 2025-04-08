'use client';

import { postMessageToWebView } from '@/utils/webview';
import { useRef, useState } from 'react';

import BooleanLogAdder from './BooleanLogAdder';
import OptionLogAdder from './OptionLogAdder';
import NumberLogAdder from './NumberLogAdder';
import WritingLogAdder from './WritingLogAdder';
import type { LogRecord, Option } from '@/types/apis/records';
import useAppMessage from '@/common/hooks/useAppMessage';

interface LogAdderProps {
  id: string;
  title: string;
  unit?: string;
  options?: Option[];
  changeSnapIndex: (index: number) => void;
  setIsTextAreaFocus: (isFocus: boolean) => void;
  isTextAreaFocus: boolean;
  option: LogRecord['method'];
  snapIndex: number;
  moveTodayLog: VoidFunction;
}

function LogAdder({
  id,
  title,
  unit,
  options,
  changeSnapIndex,
  isTextAreaFocus,
  setIsTextAreaFocus,
  option,
  snapIndex,
  moveTodayLog,
}: LogAdderProps) {
  const [isClose, setIsClose] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  useAppMessage(
    ({ bottomSheet }) => {
      if (!bottomSheet) return;

      if (bottomSheet?.state === 'close') {
        textareaRef.current?.blur();
        changeSnapIndex(-1);
        setIsTextAreaFocus(false);
        setIsClose(true);
      }

      if (bottomSheet?.state === 'hold' && bottomSheet.snapIndex) {
        changeSnapIndex(bottomSheet.snapIndex);
        if (bottomSheet.snapIndex === 1) {
          setIsTextAreaFocus(false);
          textareaRef.current?.blur();
        }

        if (bottomSheet.snapIndex > 1 && option === 'NUMBER_TYPE') {
          setIsTextAreaFocus(true);
        }
      }
    },
    [option]
  );

  if (option === 'TEXT_TYPE') {
    return (
      <WritingLogAdder
        id={id}
        title={title}
        ref={textareaRef}
        handleTextAreaFocus={handleKeyBoardAreaFocus}
        handleTextAreaBlur={handleKeyBoardAreaBlur}
        moveTodayLog={moveTodayLog}
      />
    );
  }

  if (option === 'NUMBER_TYPE') {
    return (
      <NumberLogAdder
        id={id}
        unit={unit!}
        title={title}
        snapIndex={snapIndex}
        isTextAreaFocus={isTextAreaFocus}
        handleNumberPadFocus={handleKeyBoardAreaFocus}
        handleNumberPadBlur={handleKeyBoardAreaBlur}
        moveTodayLog={moveTodayLog}
      />
    );
  }

  if (option === 'BOOLEAN_TYPE') {
    return <BooleanLogAdder id={id} title={title} moveTodayLog={moveTodayLog} />;
  }

  if (option === 'OPTION_TYPE') {
    return <OptionLogAdder id={id} options={options!} title={title} moveTodayLog={moveTodayLog} />;
  }

  return <div>잘못된 접근입니다.</div>;
}

export default LogAdder;
