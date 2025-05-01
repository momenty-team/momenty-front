interface OptionInfoProps {
  MOCK_DATA: {
    startDate: string;
    endDate: string;
    count: number;
    data: {
      date: string;
      week: string;
      count: number;
      optionList: string[];
    }[];
  };
}

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

function OptionInfo({ MOCK_DATA }: OptionInfoProps) {
  const changeIndexHeight = (value: number, maxValue: number) => {
    const height = (value / maxValue) * 100;
    return height;
  };

  return (
    <div className="flex flex-col gap-4 px-5 py-4 h-full">
      <div className="text-label-1-r text-indigo-300">
        {MOCK_DATA.startDate} ~ {MOCK_DATA.endDate}
      </div>

      <div className="w-full h-64 min-h-64 flex flex-col gap-4">
        <header className="flex items-center justify-between w-full gap-4">
          <span className="min-w-[28px] text-indigo-700 text-center text-body-3-m">요일</span>
          <span className="min-w-[56px] text-indigo-700 text-center text-body-3-m">기록횟수</span>
          <span className="w-full text-indigo-700 text-body-3-m">선택 옵션</span>
        </header>
        {/* <div className="flex items-center justify-between w-full gap-4"> */}
        {MOCK_DATA.data.map((data) => (
          <div className="flex items-center justify-between w-full gap-4">
            <div key={data.date} className="flex items-center justify-between w-full gap-4">
              <span className="min-w-[28px] text-indigo-700 text-center text-body-3-m">{data.week}</span>
              <span className="min-w-[56px] text-indigo-700 text-center text-body-3-m">{data.count}회</span>
              <div className="flex gap-1.5 w-full items-center overflow-x-auto">
                {data.optionList.map((option, index) => (
                  <span
                    key={index}
                    className="text-caption-2-sb text-indigo-5 flex px-2 py-1 bg-blue-400 rounded-[4px]"
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col px-4 py-3 w-full bg-indigo-5 rounded-[8px]">
        <span className="text-body-3-m">지난 7일동안 평균 기록 횟수는 28회입니다.</span>
      </div>
      <div className="flex flex-col px-4 py-3 w-full bg-indigo-5 rounded-[8px] gap-3">
        <span className="text-body-3-m text-black">많이 중복된 옵션</span>
        <div className="flex gap-2">
          <div className="text-caption-2-sb text-indigo-5 flex px-2 py-1 bg-blue-400 rounded-[4px]">200ml</div>
          <div className="text-caption-2-sb text-indigo-5 flex px-2 py-1 bg-blue-400 rounded-[4px]">800ml</div>
        </div>
      </div>
    </div>
  );
}

export default OptionInfo;
