interface NotFoundProps {
  title: string;
  moveLogAdder: VoidFunction;
}

function NotFound({ title, moveLogAdder }: NotFoundProps) {
  return (
    <div className="flex justify-evenly h-full">
      <div className="flex flex-col gap-4 items-center justify-center">
        <div className="w-[102px] h-[102px] bg-indigo-50 rounded-[12px] mx-auto" />
        <div className="text-body-3-sb text-indigo-400 text-center">
          오늘 {title} 기록이 없어요.
          <br />
          바로 첫 기록을 남겨볼까요?
        </div>
        <div className="flex gap-5">
          <button
            className="py-2 px-6 rounded-[8px] bg-indigo-700 text-indigo-5 text-body-3-b w-fit mx-auto"
            onClick={moveLogAdder}
          >
            기록 남기기
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
