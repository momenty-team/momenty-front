function Alarm() {

  const ALARM_CONTENT = [
    {
      id: 1,
      title: '박다희님의 팔로우 신청!',
      content: '박다희님의 신청을 받아주세요.',
      time: '10분전',
    },
    {
      id: 2,
      title: '물 먹을 시간이 됐다냥',
      content: '김혜준님, 규칙적인 습관은 중요하다옹',
      time: '20분전',
    },
    {
      id: 3,
      title: '어제의 수면 패턴 분석 보러가기',
      content:
        '김혜준님, 지난 밤의 수면 패턴 분석이 완료 되었어요. 김혜준님, 지난 밤의 수면 패턴 분석이 완료 되었어요. 지난 밤의 수면 패턴 분석이 완료 되었어요.',
      time: '32분전',
    },
    {
      id: 4,
      title: '새롭게 만들고 싶은 기록이 있나요?',
      content: '김혜준님, 새롭게 만들어 보고 싶으신 기록이 있으신가요?',
      time: '60분전',
    },
    {
      id: 5,
      title: '어제의 수면 패턴 분석 보러가기',
      content:
        '김혜준님, 지난 밤의 수면 패턴 분석이 완료 되었어요. 김혜준님, 지난 밤의 수면 패턴 분석이 완료 되었어요. 지난 밤의 수면 패턴 분석이 완료 되었어요.',
      time: '00분전',
    },
    {
      id: 6,
      title: '어제의 수면 패턴 분석 보러가기',
      content:
        '김혜준님, 지난 밤의 수면 패턴 분석이 완료 되었어요. 김혜준님, 지난 밤의 수면 패턴 분석이 완료 되었어요. 지난 밤의 수면 패턴 분석이 완료 되었어요.',
      time: '00분전',
    },
    {
      id: 7,
      title: '어제의 수면 패턴 분석 보러가기',
      content:
        '김혜준님, 지난 밤의 수면 패턴 분석이 완료 되었어요. 김혜준님, 지난 밤의 수면 패턴 분석이 완료 되었어요. 지난 밤의 수면 패턴 분석이 완료 되었어요.',
      time: '00분전',
    },
    {
      id: 8,
      title: '어제의 수면 패턴 분석 보러가기',
      content:
        '김혜준님, 지난 밤의 수면 패턴 분석이 완료 되었어요. 김혜준님, 지난 밤의 수면 패턴 분석이 완료 되었어요. 지난 밤의 수면 패턴 분석이 완료 되었어요.',
      time: '00분전',
    },
    {
      id: 9,
      title: '어제의 수면 패턴 분석 보러가기',
      content:
        '김혜준님, 지난 밤의 수면 패턴 분석이 완료 되었어요. 김혜준님, 지난 밤의 수면 패턴 분석이 완료 되었어요. 지난 밤의 수면 패턴 분석이 완료 되었어요.',
      time: '00분전',
    },
    {
      id: 10,
      title: '어제의 수면 패턴 분석 보러가기',
      content:
        '김혜준님, 지난 밤의 수면 패턴 분석이 완료 되었어요. 김혜준님, 지난 밤의 수면 패턴 분석이 완료 되었어요. 지난 밤의 수면 패턴 분석이 완료 되었어요.',
      time: '00분전',
    },
    {
      id: 11,
      title: '어제의 수면 패턴 분석 보러가기',
      content:
        '김혜준님, 지난 밤의 수면 패턴 분석이 완료 되었어요. 김혜준님, 지난 밤의 수면 패턴 분석이 완료 되었어요. 지난 밤의 수면 패턴 분석이 완료 되었어요.',
      time: '00분전',
    },
    {
      id: 12,
      title: '어제의 수면 패턴 분석 보러가기',
      content:
        '김혜준님, 지난 밤의 수면 패턴 분석이 완료 되었어요. 김혜준님, 지난 밤의 수면 패턴 분석이 완료 되었어요. 지난 밤의 수면 패턴 분석이 완료 되었어요.',
      time: '00분전',
    },
  ];

  return (
    <div className="bg-indigo-700">
      {ALARM_CONTENT.map((alarm) => (
        <div key={alarm.id} className="flex gap-3 px-4 py-3 bg-indigo-5 w-full">
          <div className="min-w-4 h-4 bg-indigo-700 rounded-[2px]" />
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-1 min-w-full gap-3 items-center justify-between">
              <span className="flex text-label-1-r">{alarm.title}</span>
              <div className="flex text-label-1-r">{alarm.time}</div>
            </div>
            <div className="flex text-label-1-r">{alarm.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Alarm;
