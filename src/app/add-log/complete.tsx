export default function StepComplete({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="flex h-dvh flex-col justify-between bg-[#F4F6F9] pt-[16px] px-[24px]">
      <div className="mb-[24px]">
        <p className="text-subtitle-1-b ">이제 물 섭취량을</p>
        <p className="text-subtitle-1-b">기록할 수 있어요.</p>
      </div>
      <button
        onClick={onRestart}
        className={
          'w-full flex justify-center items-center bg-[#021730] text-[#F4F6F9] py-[14px] text-body-1-b h-[56px] rounded-[8px]'
        }
      >
        기록하기
      </button>
    </div>
  );
}
