import { useFormContext, useWatch } from 'react-hook-form';

interface StepCreateProps {
  onNext: React.MouseEventHandler<HTMLButtonElement>;
}

function StepCustomUnit({ onNext }: StepCreateProps) {
  const { register, control } = useFormContext();
  const unit = useWatch({ control, name: 'unit' });

  return (
    <div className="flex w-full h-[calc(100vh-48px)] flex-col justify-between bg-indigo-5 pt-4 px-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <span className="text-subtitle-1-b">단위를 정해볼까요?</span>
          <span className="text-label-1-r text-indigo-100">원하는 단위를 입력해주세요.</span>
        </div>
        <input
          type="text"
          enterKeyHint="done"
          placeholder="단위를 입력해주세요."
          {...register('unit', { required: '단위를 입력해주세요.' })}
          className="flex w-full h-14 border-b-[4px] border-indigo-200 bg-transparent rounded-none subtitle-3-sb"
        />
      </div>
      <button
        onClick={onNext}
        className={
          'w-full flex justify-center items-center bg-[#021730] text-indigo-5 py-[14px] text-body-1-b h-14 rounded-[8px] disabled:bg-indigo-50'
        }
        disabled={!unit}
      >
        확인
      </button>
    </div>
  );
}

export default StepCustomUnit;
