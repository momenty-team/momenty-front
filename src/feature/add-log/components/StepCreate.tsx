interface StepCreateProps {
  onNext: React.MouseEventHandler<HTMLButtonElement>;
}

function StepCreate({ onNext }: StepCreateProps) {
  return (
    <div className="flex h-[calc(100vh-48px)] flex-col justify-between bg-indigo-5 pt-2 px-6 pb-[52px]">
      <div className="mb-[24px]">
        <p className="text-subtitle-1-b ">민재님의 새로운 기록을</p>
        <p className="text-subtitle-1-b">만들고 있어요.</p>
      </div>
      <button
        onClick={onNext}
        className={
          'w-full flex justify-center items-center bg-indigo-5 text-indigo-300 py-3.5 text-body-1-b h-14 rounded-[8px]'
        }
      >
        보관함 생성중...
      </button>
    </div>
  );
}

export default StepCreate;
