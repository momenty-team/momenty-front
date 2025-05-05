interface NumberLogProps {
  MOCK_DATA: {
    startDate: string;
    endDate: string;
    data: {
      date: string;
      week: string;
      value: number;
    }[];
    maxValue: number;
  };
}

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

function NumberInfo({ MOCK_DATA }: NumberLogProps) {
  const changeIndexHeight = (value: number, maxValue: number) => {
    const height = (value / maxValue) * 100;
    return height;
  };

  return (
    <div className="flex flex-col gap-4 px-5 py-4 h-full">
      <div className="text-label-1-r text-indigo-300">
        {MOCK_DATA.startDate} ~ {MOCK_DATA.endDate}
      </div>

      <div className="w-full h-64 min-h-64 flex flex-col justify-between gap-2">
        <div className="flex items-center justify-between w-full flex-1">
          <div className="flex flex-1 items-end justify-around w-full h-full">
            {MOCK_DATA.data.map((data) => (
              <div
                key={data.date}
                className="flex w-5 bg-blue-400 rounded-t-[4px]"
                style={{
                  height: `${changeIndexHeight(data.value, MOCK_DATA.maxValue)}%`,
                }}
              />
            ))}
          </div>
          <div className="flex flex-col justify-between h-full w-8">
            <span className="text-caption-3-m text-indigo-100">{MOCK_DATA.maxValue}</span>{' '}
            <span className="text-caption-3-m text-indigo-100">{MOCK_DATA.maxValue / 2}</span>
            <span className="text-caption-3-m text-indigo-100">0</span>
          </div>
        </div>

        <div className="flex items-center w-[calc(100%-32px)] justify-around pt-3">
          {WEEK_DAYS.map((day, index) => (
            <span key={index} className="text-body-3-m text-indigo-200">
              {day}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col px-4 py-3 w-full bg-indigo-5 rounded-[8px]">
        <span className="text-body-3-m">지난 7일동안 하루 평균 걸음 수는</span>
        <span className="text-body-3-m">6,700 걸음 입니다.</span>
      </div>
      <div className="flex flex-col px-4 py-3 w-full bg-indigo-5 m-h-fit rounded-[8px] gap-4">
        {MOCK_DATA.data.map((data) => (
          <div key={data.date} className="flex items-center gap-5">
            <span className="text-body-3-m">{data.week}</span>
            <span className="text-body-3-m text-blue-400">{data.value} 걸음</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NumberInfo;
