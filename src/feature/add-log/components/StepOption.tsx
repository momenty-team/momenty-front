'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import CloseIcon from '@/assets/svg/close.svg';
import CommonModal from '@/common/components/Modal';

interface StepOptionProps {
  onNext: React.MouseEventHandler<HTMLButtonElement>;
}

function Option({ onNext }: StepOptionProps) {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [optionToDelete, setOptionToDelete] = useState<string | null>(null);
  const [isComposing, setComposing] = useState(false);

  const { setValue, getValues } = useFormContext();
  const currentOptions: string[] = getValues('option');

  const addOption = (option: string) => {
    if (option && !currentOptions.includes(option)) {
      setValue('option', [...currentOptions, option]);
    }

    setInputValue('');
  };

  const removeOption = (option: string) => {
    const newOptions = currentOptions.filter((o) => o !== option);
    setValue('option', newOptions);
  };

  const openDeleteModal = (option: string) => {
    setOptionToDelete(option);
    setIsOpen(true);
  };

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
              addOption(inputValue.trim());
            }
          }}
          onCompositionStart={() => setComposing(true)}
          onCompositionEnd={() => setComposing(false)}
          enterKeyHint="done"
          className="flex w-full h-14 border-b-[4px] border-indigo-200 bg-transparent rounded-none subtitle-3-sb"
        />
        <div className="flex max-h-[400px] gap-4 w-full overflow-y-scroll flex-wrap mb-4">
          {currentOptions.map((option) => (
            <div
              key={option}
              className="flex gap-1 w-fit items-center justify-center bg-indigo-500 text-white py-2 pl-3 pr-2 text-body-3-sb rounded-[8px]"
            >
              <span className="flex text-body-3-sb">{option}</span>
              <button className="flex w-4 h-4 items-center justify-center" onClick={() => openDeleteModal(option)}>
                <CloseIcon width={20} height={20} className="flex [&>path]:stroke-white" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => addOption(inputValue.trim())}
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
          disabled={currentOptions.length === 0}
        >
          다음으로
        </button>
      </div>

      {isOpen && optionToDelete && (
        <CommonModal
          onClose={() => setIsOpen(false)}
          onDelete={() => {
            removeOption(optionToDelete);
            setIsOpen(false);
            setOptionToDelete(null);
          }}
        >
          <div className="flex flex-col">
            <span className="text-subtitle-3-b">옵션을 삭제하면</span>
            <span className="text-subtitle-3-b">해당 옵션과 관련된 데이터가 삭제돼요.</span>
          </div>
        </CommonModal>
      )}
    </div>
  );
}

export default Option;
