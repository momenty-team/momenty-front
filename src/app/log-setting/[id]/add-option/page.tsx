'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CloseIcon from '@/assets/svg/close.svg';
import CommonModal from '@/common/components/Modal';
import { postMessageToWebView } from '@/utils/webview';

type OptionItem = {
  id: number;
  option: string;
};

function AddOption() {
  const route = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(false);

  const [options, setOptions] = useState<OptionItem[]>([]);

  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [tagToDelete, setTagToDelete] = useState<string | null>(null);
  const [isComposing, setComposing] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      await fetch(`/api/records/${id}/options`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ options: ['징어일곱마리'] }),
      });

      setLoading(false);
      route.push(`/log-setting/${id}`);
      postMessageToWebView({ toast: { type: 'success', message: '옵션 변경을 완료했어요.' } });
    } catch (error) {
      console.error('저장 실패:', error);
      setLoading(false);
    }
  };

  const addTag = (value: string) => {
    if (value && options.length !== 0) {
      setOptions((prevOptions) => {
        const newId = prevOptions.length > 0 ? Math.max(...prevOptions.map((opt) => opt.id)) + 1 : 1;

        const newOption: OptionItem = {
          id: newId,
          option: value,
        };

        return [...prevOptions, newOption];
      });
    }

    setInputValue('');
  };

  const removeTag = (value: string) => {
    setOptions((prevOptions) => prevOptions.filter((opt) => opt.option !== value));
  };

  useEffect(() => {
    if (id) {
      const fetchOptions = async () => {
        try {
          const res = await fetch(`/api/records/${id}/options`);
          if (!res.ok) throw new Error('데이터를 가져오는 데 실패했습니다.');
          const data = await res.json();
          setOptions(data.options);
        } catch (err) {
          console.error(err);
        }
      };

      fetchOptions();
    }
  }, [id]);

  return (
    <div className="flex w-full h-[calc(100vh-48px)] flex-col justify-between pt-2 px-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <span className="text-subtitle-1-b">옵션을 추가해주세요!</span>
          <span className="text-label-1-r text-indigo-100">
            추가하고 싶은 옵션을 입력해주세요. <p />
            옵션을 삭제하면 해당 옵션과 관련된 데이터가 삭제됩니다.
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
          {options.map(({ id, option }) => (
            <div
              key={id}
              className="flex gap-1 w-fit items-center justify-center bg-indigo-500 text-white py-2 pl-3 pr-2 text-body-3-sb rounded-[8px]"
            >
              <span className="flex text-body-3-sb">{option}</span>
              <button
                className="flex w-4 h-4 items-center justify-center"
                onClick={() => {
                  setTagToDelete(option);
                  setIsOpen(true);
                }}
              >
                <CloseIcon width={20} height={20} className="flex [&>path]:stroke-white" />
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
  );
}

export default AddOption;
