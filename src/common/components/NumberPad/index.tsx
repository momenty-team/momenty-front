'use client';

import { useState } from 'react';
import BackIcon from '@/assets/svg/back.svg';
import { postMessageToWebView } from '@/utils';

const keys = [
  { label: '1', code: 'Digit1', value: '1' },
  { label: '2', code: 'Digit2', value: '2' },
  { label: '3', code: 'Digit3', value: '3' },
  { label: '4', code: 'Digit4', value: '4' },
  { label: '5', code: 'Digit5', value: '5' },
  { label: '6', code: 'Digit6', value: '6' },
  { label: '7', code: 'Digit7', value: '7' },
  { label: '8', code: 'Digit8', value: '8' },
  { label: '9', code: 'Digit9', value: '9' },
  { label: '.', code: 'Period', value: '.' },
  { label: '0', code: 'Digit0', value: '0' },
  { label: <BackIcon width={32} height={32} className="m-0 p-0" />, code: 'Minus', value: '-' },
];

interface NumberPadProps {
  NumberPadValue: string;
  setNumberPadValue: React.Dispatch<React.SetStateAction<string>>;
  onClickSave: () => void;
}

function NumberPad({ setNumberPadValue, onClickSave }: NumberPadProps) {
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isLongPress, setIsLongPress] = useState(false);
  const [activeCode, setActiveCode] = useState<string | null>(null);

  const handleKeyPress = (value: string) => {
    setNumberPadValue((prev) => {
      if (value === '-') {
        const newValue = prev.slice(0, -1);
        return newValue === '' ? '0' : newValue;
      }

      if (value === '.' && prev.includes('.')) return prev;

      if (prev === '0') return value === '.' ? '0.' : value;

      return prev + value;
    });
  };

  const startLongPressBackSpace = () => {
    const timer = setTimeout(() => {
      setIsLongPress(true);
      const interval = setInterval(() => {
        postMessageToWebView({ haptic: 'ImpactMedium' });
        setNumberPadValue((prev) => {
          const newValue = prev.slice(0, -1);
          return newValue === '' ? '0' : newValue;
        });
      }, 130);
      setIntervalId(interval);
    }, 300);

    setPressTimer(timer);
  };

  const handleLongPressEnd = (value: string) => {
    if (pressTimer) clearTimeout(pressTimer);
    if (intervalId) clearInterval(intervalId);
    setPressTimer(null);
    setIntervalId(null);
    setIsLongPress(false);

    if (!isLongPress && activeCode) {
      handleKeyPress(value);
    }

    setActiveCode(null);
  };

  return (
    <div>
      <div className="grid grid-cols-3 h-[300px] bg-indigo-5">
        {keys.map(({ label, code, value }) => (
          <div
            key={code}
            className={`relative flex items-center w-[calc(100%-16px)] h-[calc(100%-16px)] justify-center text-subtitle-1-b focus:outline-none transition-all m-2 duration-200 ease-out ${activeCode === code && 'active:bg-indigo-50 active:scale-[0.92]'} rounded-[6px]`}
            data-code={code}
            data-val={value}
            onTouchStart={() => {
              setActiveCode(code);
              postMessageToWebView({ haptic: 'ImpactMedium' });
              if (code === 'Minus') {
                startLongPressBackSpace();
              }
            }}
            onTouchEnd={() => {
              handleLongPressEnd(value);
            }}
            onTouchMove={() => setActiveCode(null)}
            onTouchCancel={() => handleLongPressEnd(value)}
          >
            {label}
          </div>
        ))}
      </div>
      <button
        onTouchEnd={() => {
          postMessageToWebView({ haptic: 'ImpactMedium' });
          onClickSave();
        }}
        className="flex items-center justify-center py-[14px] w-full text-white text-body-1-b bg-indigo-700 active:bg-indigo-800 transition"
      >
        저장하기
      </button>
    </div>
  );
}

export default NumberPad;
