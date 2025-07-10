'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import TextIcon from '@/assets/svg/text.svg';
import BooleanIcon from '@/assets/svg/boolean.svg';
import OptionIcon from '@/assets/svg/option.svg';
import NumberIcon from '@/assets/svg/number.svg';
import type { Step } from '@/types';

const RECORD_METHODS_TEMPLATE_LIST = (title: string) => [
  {
    method: 'text_type',
    title: '글로 남기기',
    description: [`${title}을 일기를 쓰듯 글로 작성해서 기록해요.`, '기록을 자세하게 하고 싶을 때 유용해요.'],
  },
  {
    method: 'boolean_type',
    title: 'O, X',
    description: [`${title}을 O와 X로 구분해서 작성해요.`, '기록을 간단하고 빠르게 기록하고 싶을 때 유용해요.'],
  },
  {
    method: 'option_type',
    title: '옵션 만들기',
    description: [`${title}을 옵션 중 한 가지를 선택하는 방식으로 작성해요.`, '원하는 옵션들을 직접 만들 수 있어요.'],
  },
  {
    method: 'number_type',
    title: '숫자',
    description: [
      `${title}을 숫자와 단위를 이용해서 기록해요.`,
      '모먼티에서 제공하는 숫자 선택 방식에서 고를 수 있어요.',
    ],
  },
];

interface StepMethodProps {
  onNext: (value: Step) => void;
}

function StepMethod({ onNext }: StepMethodProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const { setValue, getValues } = useFormContext();

  const methodTitle = getValues().title;

  const nextStep = (method: string | null) => {
    if (method === 'option_type') {
      return '옵션선택';
    }

    if (method === 'number_type') {
      return '단위선택';
    }

    return '기록완료';
  };

  const handleClickMethod = (method: string) => {
    setSelectedMethod(method);
    const selectedMethod = RECORD_METHODS_TEMPLATE_LIST(methodTitle).find((m) => m.method === method);

    if (selectedMethod) {
      setValue('method', selectedMethod.method);
    }
  };

  return (
    <div className="flex w-full h-[calc(100vh-48px)] flex-col justify-between bg-indigo-5 pt-2 px-6">
      <div>
        <div className="mb-6">
          <p className="text-subtitle-1-b">{methodTitle}을(를)</p>
          <p className="text-subtitle-1-b">어떤 방식으로 기록할까요?</p>
        </div>

        <div>
          <div className="flex flex-col gap-4">
            {RECORD_METHODS_TEMPLATE_LIST(methodTitle).map(({ title, method, description }) => (
              <button
                onTouchStart={() => handleClickMethod(method)}
                key={method}
                className={`flex flex-col w-full p-4 gap-1 rounded-[16px] active:scale-[0.98] transition-all active:#C3CAD2 
                  ${selectedMethod === method ? 'bg-[#E6E9F0]' : 'bg-white'}`}
              >
                <div className="flex flex-row items-center justify-between gap-2">
                  <div className="flex w-[26px] h-[26px] bg-indigo-5 rounded-[8px] items-center justify-center">
                    {method === 'text_type' && <TextIcon />}
                    {method === 'boolean_type' && <BooleanIcon />}
                    {method === 'option_type' && <OptionIcon />}
                    {method === 'number_type' && <NumberIcon />}
                  </div>
                  <span className="text-body-2-m">{title}</span>
                </div>
                <div className="flex flex-col text-label-1-r text-indigo-100">
                  {description.map((line, i) => (
                    <div key={i} className="flex text-left">
                      {line}
                    </div>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => onNext(nextStep(selectedMethod))}
        className={
          'w-full flex justify-center items-center bg-indigo-700 text-indigo-5 py-[14px] text-body-1-b h-14 rounded-[8px] disabled:bg-indigo-50'
        }
        disabled={!selectedMethod}
      >
        다음으로
      </button>
    </div>
  );
}

export default StepMethod;
