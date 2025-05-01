function WeekAnalysis() {
  return (
    <div className="flex flex-col gap-4 px-6 py-6 h-[100vh] items-center justify-between pb-[42px]">
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="text-subtitle-1-b w-full">미래 조언/피드백 받기</h1>
        <div className="w-[210px] h-[280px] bg-blue-400 my-[80px]" />
        <div className="text-body-2-m text-indigo-300">
          최근 기록을 보면 수면 시간이 불규칙한 경향이 있어요. 자기 전 스크린 타임을 줄이는 것부터 시도해볼까요?
        </div>
      </div>
      <button type="button" className="bg-indigo-25 rounded-[8px] w-full py-[14px]">
        <span className="text-body-1-b text-indigo-300">AI 피드백 생성중..</span>
      </button>
    </div>
  );
}

export default WeekAnalysis;
