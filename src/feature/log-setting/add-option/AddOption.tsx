'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import CloseIcon from '@/assets/svg/close.svg';
import CommonModal from '@/common/components/Modal';
import { postMessageToWebView } from '@/utils/webview';
import type { Option } from '@/types/apis/records';

interface AddOptionProps {
  initialOptions: Option[];
}

function AddOption({ initialOptions }: AddOptionProps) {
  const route = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [optionIdToDelete, setOptionIdToDelete] = useState<number | null>(null);
  const [isComposing, setComposing] = useState(false);
  const [newOptionList, setNewOptionList] = useState<string[]>([]);

  const onSubmit = async () => {
    try {
      setLoading(true);
      await fetch(`/api/records/${id}/options`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ options: newOptionList }),
      });

      setLoading(false);
      postMessageToWebView({ toast: { type: 'success', message: '옵션 변경을 완료했어요.' } });
      route.refresh();
      setNewOptionList([]);
      route.push(`/log-setting/${id}`);
    } catch (error) {
      console.error('저장 실패:', error);
      setLoading(false);
    }
  };

  const addOption = (value: string) => {
    if (value) {
      if (initialOptions.some((item) => item.option === value) || newOptionList.some((item) => item === value)) {
        postMessageToWebView({ toast: { type: 'error', message: '이미 존재하는 옵션입니다.' } });
        setInputValue('');
        return;
      }

      setNewOptionList((prev) => [...prev, value]);
      setInputValue('');
    }
  };

  const removeClientOption = (option: string) => {
    setNewOptionList((prev) => prev.filter((prevOption) => prevOption !== option));
  };

  const removeServerOption = async (optionId: number) => {
    await fetch(`/api/records/${id}/options/${optionId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    route.refresh();
  };

  return (
    <>
      <div className="flex flex-col gap-3 w-full h-full mt-4">
        <div className="flex flex-col gap-3 h-full">
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
            {initialOptions.map(({ id, option }) => (
              <div
                key={id}
                className="flex gap-1 w-fit items-center justify-center bg-indigo-500 text-white py-2 pl-3 pr-2 text-body-3-sb rounded-[8px]"
              >
                <span className="flex text-body-3-sb">{option}</span>
                <button
                  className="flex w-4 h-4 items-center justify-center"
                  onClick={() => {
                    setOptionIdToDelete(id);
                    setIsOpen(true);
                  }}
                >
                  <CloseIcon width={20} height={20} className="flex [&>path]:stroke-white" />
                </button>
              </div>
            ))}
            {newOptionList.map((option) => (
              <div
                key={option}
                className="flex gap-1 w-fit items-center justify-center bg-indigo-500 text-white py-2 pl-3 pr-2 text-body-3-sb rounded-[8px]"
              >
                <span className="flex text-body-3-sb">{option}</span>
                <button
                  className="flex w-4 h-4 items-center justify-center"
                  onClick={() => {
                    removeClientOption(option);
                    setIsOpen(true);
                  }}
                >
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
            onClick={onSubmit}
            className={
              'w-full flex justify-center items-center bg-indigo-700 text-indigo-5 py-[14px] text-body-1-b h-14 rounded-[8px] disabled:bg-indigo-50'
            }
            disabled={loading}
          >
            완료하기
          </button>
        </div>
      </div>

      {isOpen && optionIdToDelete && (
        <CommonModal
          onClose={() => setIsOpen(false)}
          onDelete={() => {
            removeServerOption(optionIdToDelete);
            setIsOpen(false);
            setOptionIdToDelete(null);
          }}
        >
          <div className="flex flex-col">
            <span className="text-subtitle-3-b">옵션을 삭제하면</span>
            <span className="text-subtitle-3-b">해당 옵션과 관련된 데이터가 삭제돼요.</span>
          </div>
        </CommonModal>
      )}
    </>
  );
}

export default AddOption;
