import { useState } from 'react';
import BackIcon from '@/assets/svg/back.svg';

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
  { label: <BackIcon width={32} hight={32} />, code: 'Minus', value: '-' },
];

function Keyboard() {
  const [value, setValue] = useState('');

  const handleKeyPress = (v: string) => {
    if (v === '-') {
      setValue((prev) => prev.slice(0, -1));
    } else {
      setValue((prev) => prev + v);
    }
  };

  return (
    <div className="py-10 relative">
      <div className="flex h-9"> {value || '입력값 표시'}</div>
      <div className="grid grid-cols-3">
        {keys.map(({ label, code, value }) => (
          <div
            key={code}
            className="flex items-center justify-center text-subtitle-1-b px-[54px] py-4 bg-indigo-5 hover:bg-indigo-5 active:bg-indigo-25 focus:outline-none transition"
            data-code={code}
            data-val={value}
            onTouchStart={() => handleKeyPress(value)}
          >
            {label}
          </div>
        ))}
      </div>
      <button className="flex items-center justify-center py-[14px] w-full text-white text-body-1-b bg-indigo-700 hover:bg-indigo-800 transition">
        저장하기
      </button>
    </div>
  );
}

export default Keyboard;
