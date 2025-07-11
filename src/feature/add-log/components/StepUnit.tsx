'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { Step } from '@/types';

const UNIT = [
  { id: 0, name: 'k' },
  { id: 1, name: 'kg' },
  { id: 2, name: 'g' },
  { id: 3, name: 'mg' },
  { id: 4, name: 'L' },
  { id: 5, name: 'mL' },
  { id: 6, name: 'cm' },
  { id: 7, name: 'mm' },
  { id: 8, name: '개' },
  { id: 9, name: '회' },
  { id: 10, name: '분' },
  { id: 11, name: '시간' },
  { id: 12, name: '일' },
  { id: 13, name: '주' },
  { id: 14, name: '개월' },
  { id: 15, name: '년' },
  { id: 16, name: '회차' },
  { id: 17, name: '세트' },
  { id: 18, name: '번' },
  { id: 19, name: '층' },
  { id: 20, name: '단계' },
  { id: 21, name: '기타' },
] as const;

interface StepUnitProps {
  onNext: (value: Step) => void;
}

function StepUnit({ onNext }: StepUnitProps) {
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);
  const { setValue } = useFormContext();

  const handleClick = (index: number) => {
    setSelectedUnitId(index);
    const selectedUnit = UNIT[index];

    if (selectedUnit.name !== '기타') {
      setValue('unit', selectedUnit.name);
    }
  };

  const nextStep = (unit: (typeof UNIT)[number]['name']) => {
    if (unit === '기타') {
      return '단위입력';
    }

    return '기록완료';
  };

  return (
    <div className="flex w-full h-[calc(100vh-48px)] flex-col justify-between bg-indigo-5 pt-2 px-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <span className="text-subtitle-1-b">단위를 정해볼까요?</span>
          <span className="text-label-1-r text-indigo-100">
            단위를 선택해주세요.
            <p />
            원하시는 단위가 없다면 단위를 추가해주세요.
          </span>
        </div>
        <div className="flex gap-2 w-full flex-wrap mb-4">
          {UNIT.map(({ id, name }) => (
            <button
              key={id}
              onTouchStart={() => handleClick(id)}
              className={`flex text-indigo-5 text-body-3-sb rounded-[20px] px-6 py-2 
                ${selectedUnitId === id ? 'bg-indigo-500' : 'bg-indigo-100'}`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={() => onNext(nextStep(UNIT[selectedUnitId!].name))}
        className={
          'w-full flex justify-center items-center bg-indigo-700 text-indigo-5 py-[14px] text-body-1-b h-14 rounded-[8px] disabled:bg-indigo-50'
        }
        disabled={!selectedUnitId}
      >
        다음으로
      </button>
    </div>
  );
}

export default StepUnit;
