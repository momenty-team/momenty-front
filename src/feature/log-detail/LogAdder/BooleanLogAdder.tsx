import CircleIcon from '@/assets/svg/log-detail/circle.svg';
import CloseIcon from '@/assets/svg/log-detail/close.svg';

function BooleanLogAdder() {
  return (
    <>
      <div className="flex mx-5 gap-[2px] flex-none mt-5">
        <div className="text-caption-2-sb text-blue-300">12:34</div>
        <div className="text-caption-2-sb text-indigo-100">에 물 섭취 순간을 남길게요.</div>
      </div>

      <div className="flex gap-3 grow mx-5 py-6">
        <div className="flex items-center justify-center rounded-[12px] bg-[#A5D0FE] w-full">
          <CircleIcon width={64} height={64} />
        </div>

        <div className="flex items-center justify-center rounded-[12px] bg-[#EC7B8E] w-full">
          <CloseIcon width={64} height={64} />
        </div>
      </div>
    </>
  );
}

export default BooleanLogAdder;
