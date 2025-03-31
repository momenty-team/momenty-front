'use client';

import { useState } from 'react';
import CloseIcon from '@/assets/svg/close.svg';
import { useFormContext } from 'react-hook-form';

interface StepOptionProps {
  onNext: React.MouseEventHandler<HTMLButtonElement>;
}

function Option({ onNext }: StepOptionProps) {
  const { register } = useFormContext();
  const [inputValue, setInputValue] = useState('');
  const [tag, setTag] = useState<string[]>([]);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(inputValue.trim());
    }
  };

  const addTag = (value: string) => {
    if (!tag.includes(value)) {
      setTag((p) => [...p, value]);
    }
    setInputValue('');
  };

  const removeTag = (value: string) => {
    setTag(tag.filter((tagText) => tagText !== value));
  };

  return (
    <div className="flex w-full h-[calc(100vh-48px)] flex-col justify-between bg-indigo-5 pt-4 px-6">
      <div className="flex flex-col gap-6">
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
          onKeyDown={handleKeyDown}
          {...register('option', { required: '옵션을 입력해주세요' })}
          className="flex w-full h-14 border-b-[4px] border-indigo-200 bg-transparent rounded-none subtitle-3-sb"
        />
        <div className="flex max-h-[400px] gap-4 w-full overflow-y-scroll flex-wrap mb-4">
          {tag.map((value) => (
            <div
              key={value}
              className="flex gap-1 w-fit items-center justify-center bg-indigo-500 text-white py-2 pl-3 pr-2 text-body-3-sb rounded-[8px]"
            >
              <span className="flex text-body-3-sb">{value}</span>
              <button className="flex w-4 h-4 items-center justify-center " onClick={() => removeTag(value)}>
                <CloseIcon width={20} height={20} className="flex [&>path]:stroke-white " />
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onNext}
        className={
          'w-full flex justify-center items-center bg-indigo-700 text-indigo-5 py-[14px] text-body-1-b h-14 rounded-[8px] disabled:bg-indigo-50'
        }
        // disabled={!tag.length}
      >
        다음으로
      </button>
    </div>
  );
}

export default Option;
