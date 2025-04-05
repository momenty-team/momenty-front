'use client';

import { useState } from 'react';
import CloseIcon from '@/assets/svg/close.svg';
import { useFormContext } from 'react-hook-form';
import CommonModal from '@/common/components/Modal';

interface StepOptionProps {
  onNext: React.MouseEventHandler<HTMLButtonElement>;
}

function Option({ onNext }: StepOptionProps) {
  const { setValue, getValues } = useFormContext();
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [tagToDelete, setTagToDelete] = useState<string | null>(null);
  const [isComposing, setComposing] = useState(false);

  const addTag = (value: string) => {
    if (value && !getValues('option').includes(value)) {
      setValue('option', [...getValues('option'), value]);
    }

    setInputValue('');
  };

  const removeTag = (value: string) => {
    const prevTags: string[] = getValues('option');
    const newTags = prevTags.filter((tagText) => tagText !== value);
    setValue('option', newTags);
  };

  // react hook form control써서 다음으로 넘어갔다가 다시 옵션 페이지로 들어왔을떄 값 안사라지게 할 수 있을듯

  return (
    <div className="flex w-full h-[calc(100vh-48px)] flex-col justify-between bg-indigo-5 pt-2 px-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <span className="text-subtitle-1-b">옵션을 만들어볼까요?</span>
          <span className="text-label-1-r text-indigo-100">
            추가하고 싶은 옵션을 입력해주세요. <p />
            옵션 만들기 이후에 수정하거나 추가할 수 있습니다.
          </span>
        </div>
        <input
          placeholder="옵션을 입력해주세요."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter' && !isComposing) {
              e.preventDefault();
              addTag(inputValue.trim());
            }
          }}
          onCompositionStart={() => setComposing(true)}
          onCompositionEnd={() => setComposing(false)}
          enterKeyHint="done"
          className="flex w-full h-14 border-b-[4px] border-indigo-200 bg-transparent rounded-none subtitle-3-sb"
        />

        <div className="flex max-h-[400px] gap-4 w-full overflow-y-scroll flex-wrap mb-4">
          {(getValues('option') as string[]).map((value) => (
            <div
              key={value}
              className="flex gap-1 w-fit items-center justify-center bg-indigo-500 text-white py-2 pl-3 pr-2 text-body-3-sb rounded-[8px]"
            >
              <span className="flex text-body-3-sb">{value}</span>
              <button
                className="flex w-4 h-4 items-center justify-center"
                onClick={() => {
                  setTagToDelete(value);
                  setIsOpen(true);
                }}
              >
                <CloseIcon width={20} height={20} className="flex [&>path]:stroke-white " />
              </button>
            </div>
          ))}
        </div>
      </div>

      {isOpen && tagToDelete && (
        <CommonModal
          onClose={() => setIsOpen(false)}
          onDelete={() => {
            removeTag(tagToDelete);
            setIsOpen(false);
            setTagToDelete(null);
          }}
        >
          <div className="flex flex-col">
            <span className="text-subtitle-3-b">옵션을 삭제하면</span>
            <span className="text-subtitle-3-b">해당 옵션과 관련된 데이터가 삭제돼요.</span>
          </div>
        </CommonModal>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => addTag(inputValue.trim())}
          className={
            'w-full flex justify-center items-center bg-indigo-700 text-indigo-5 py-[14px] text-body-1-b h-14 rounded-[8px] disabled:bg-indigo-50'
          }
          disabled={!inputValue}
        >
          추가하기
        </button>
        <button
          onClick={onNext}
          className={
            'w-full flex justify-center items-center bg-indigo-700 text-indigo-5 py-[14px] text-body-1-b h-14 rounded-[8px] disabled:bg-indigo-50'
          }
          disabled={getValues('option').length === 0}
        >
          다음으로
        </button>
      </div>
    </div>
  );
}

export default Option;
