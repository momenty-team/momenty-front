import { useState } from 'react';

const RECORD_METHODS = [
  {
    id: 1,
    title: '글로 남기기',
    description: ['물 섭취량을 일기를 쓰듯 글로 작성해서 기록해요.', '기록을 자세하게 하고 싶을 때 유용해요.'],
  },
  {
    id: 2,
    title: 'O, X',
    description: ['물 섭취량을 O와 X로 구분해서 작성해요.', '기록을 간단하고 빠르게 기록하고 싶을 때 유용해요.'],
  },
  {
    id: 3,
    title: '옵션 만들기',
    description: ['물 섭취량을 옵션 중 한 가지를 선택하는 방식으로 작성해요.', '원하는 옵션들을 직접 만들 수 있어요.'],
  },
  {
    id: 4,
    title: '숫자',
    description: [
      '물 섭취량을 숫자와 단위를 이용해서 기록해요.',
      '모멘티에서 제공하는 숫자 선택 방식에서 고를 수 있어요.',
    ],
  },
];

function StepMethod({ onNext }: { onNext: () => void }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="flex h-dvh flex-col justify-between bg-[#F4F6F9] pt-4 px-6 pb-[52px]">
      <div>
        <div className="mb-6">
          <p className="text-subtitle-1-b ">물 섭취량을</p>
          <p className="text-subtitle-1-b">어떤 방식으로 기록할까요?</p>
        </div>
        <div>
          <div className="flex flex-col gap-4">
            {RECORD_METHODS.map((method) => (
              <button
                onTouchStart={() => handleClick(method.id)}
                key={method.id}
                className={`flex flex-col w-full px-4 py-3 gap-1 rounded-[20px] active:scale-[0.98] transition-all active:#C3CAD2 
                  ${selectedIndex === method.id ? 'bg-[#E6E9F0]' : 'bg-white'}`}
              >
                <div className="flex flex-row items-center justify-between gap-1">
                  <div className="flex w-[26px] h-[26px] bg-[#D9D9D9] rounded-[8px]" />
                  <span className="text-body-2-m">{method.title}</span>
                </div>
                <div className="flex flex-col text-label-1-r text-[#99A5B4]">
                  {method.description.map((line, i) => (
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
        onClick={onNext}
        className={
          'w-full flex justify-center items-center bg-[#021730] text-[#F4F6F9] py-[14px] text-body-1-b h-14 rounded-[8px]'
        }
      >
        다음으로
      </button>
    </div>
  );
}

export default StepMethod;
