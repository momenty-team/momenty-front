'use client';

import useKeyboardResize from '@/hooks/useKeyboardResize';
import usePreventScrollOnKeyboard from '@/hooks/usePreventScrollOnKeyboard';
import { useState } from 'react';
import CloseIcon from '@/assets/svg/close.svg';

function Option({ onNext }: { onNext: () => void }) {
  usePreventScrollOnKeyboard();
  const { viewportHeight, keyboardHeight } = useKeyboardResize();

  
  const [inputValue, setInputValue] = useState('');
  const [tag, setTag] = useState<string[]>([]);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(inputValue.trim());
    }
  };

  const addTag = (value: string) => {
    if(!tag.includes(value)) {
      setTag([...tag, value]);
    }
    setInputValue('');
  };

  const removeTag = (index: number) => { 
    setTag(tag.filter((_, i) => i !== index));
  }

  return (
    <div
      className={`flex flex-col  w-full justify-between py-3 bg-indigo-5  ${keyboardHeight ? '' : 'pb-[52px]'}`}
      style={{ height: `${viewportHeight - 48 - (keyboardHeight ?? 0)}px` }}
    >
      <div className="flex flex-col gap-6 px-5">
        <div className="flex flex-col gap-3">
          <span className="text-subtitle-1-b">옵션을 만들어볼까요?</span>
          <span className="text-label-1-r text-indigo-100">
            추가하고 싶은 옵션을 입력해주세요. <p />
            옵션 만들기 이후에 수정하거나 추가할 수 있습니다.
          </span>
        </div>
        <input
          type="text"
          placeholder="옵션을 입력해주세요."
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex w-full h-14 border-b-[4px] border-indigo-200 bg-transparent rounded-none subtitle-3-sb"
        />
        <div className="flex gap-4 w-full flex-wrap">
          {tag.map((value, index) => (
            <div
              key={index}
              className="flex gap-1 w-fit items-center justify-center bg-indigo-500 text-white py-2 pl-3 pr-2 text-body-3-sb rounded-[8px]"
            >
              <span className="flex text-body-3-sb">{value}</span>
              <button
                className="flex w-4 h-4 items-center justify-center "
                onClick={() => removeTag(index)}
              >
                <CloseIcon width={20} height={20} className="flex [&>path]:stroke-white " />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className={`${keyboardHeight ? '' : 'px-6'}`}>
        <button
          onClick={onNext}
          className={`w-full flex justify-center items-center bg-[#021730] text-[#F4F6F9] py-[14px] text-body-1-b h-14 ${
            keyboardHeight ? '' : 'rounded-[8px]'
          }`}
        >
          다음으로
        </button>
      </div>
    </div>
  );
}

export default Option;
