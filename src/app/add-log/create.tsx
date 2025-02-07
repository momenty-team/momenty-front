export default function StepCreate({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  return (
    <div className="flex h-dvh flex-col justify-between bg-[#F4F6F9] pt-[16px] px-[24px]">
      <div className="mb-[24px]">
        <p className="text-subtitle-1-b ">민재님의 새로운 기록을</p>
        <p className="text-subtitle-1-b">만들고 있어요.</p>
      </div>
      <button
        onClick={onNext}
        className={
          'w-full flex justify-center items-center bg-[#E8EBEF] text-[#5A6B7F] py-[14px] text-body-1-b h-[56px] rounded-[8px]'
        }
      >
        보관함 생성중...
      </button>
    </div>
  );
}
