interface NotFoundProps {
  moveLogAdder: VoidFunction;
}

function NotFound({ moveLogAdder }: NotFoundProps) {
  return (
    <div className="flex flex-col justify-evenly h-full">
      <div className="w-[102px] h-[102px] bg-indigo-50 rounded-[12px] mx-auto" />
      <div className="text-body-3-sb text-indigo-400 text-center">최근동향은 준비중!</div>
      <button
        className="py-2 px-6 rounded-[8px] bg-indigo-700 text-indigo-5 text-body-3-b w-fit mx-auto"
        onClick={moveLogAdder}
      >
        기록 남기기
      </button>
    </div>
  );
}

export default NotFound;
