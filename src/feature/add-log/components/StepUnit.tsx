import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

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
];

function StepUnit({ onNext }: { onNext: (value: string) => void }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { setValue } = useFormContext();
  const handleClick = (index: number) => {
    setSelectedIndex(index);

    const selectedUnit = UNIT[index];
    if (selectedUnit.name !== '기타') {
      setValue('unit', selectedUnit.name);
    }
  };

  const nextStep = (value: string) => {
    if (value === '기타') return '단위입력';
    else return '기록완료';
  };

  return (
    <div className="flex w-full h-[calc(100vh-48px)] flex-col justify-between bg-indigo-5 pt-4 px-6 pb-[52px]">
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
          {UNIT.map((unit) => (
            <button
              key={unit.id}
              onTouchStart={() => handleClick(unit.id)}
              className={`flex text-indigo-5 text-body-3-sb rounded-[20px] px-6 py-2 
                ${selectedIndex === unit.id ? 'bg-indigo-500' : 'bg-indigo-100'}`}
            >
              {unit.name}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={() => onNext(nextStep(UNIT[selectedIndex!].name))}
        className={
          'w-full flex justify-center items-center bg-indigo-700 text-indigo-5 py-[14px] text-body-1-b h-14 rounded-[8px] disabled:bg-indigo-50'
        }
        disabled={!selectedIndex}
      >
        다음으로
      </button>
    </div>
  );
}

export default StepUnit;
