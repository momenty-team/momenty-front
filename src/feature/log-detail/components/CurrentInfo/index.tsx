import useAppMessage from '@/common/hooks/useAppMessage';
import type { LogRecord } from '@/types/apis/records';
import NumberInfo from './NumberInfo';
import WritingInfo from './WritingInfo';
import BooleanInfo from './BooleanInfo';
import OptionInfo from './OptionInfo';

interface TodayLogProps {
  option: LogRecord['method'];
  changeSnapIndex: (index: number) => void;
  id: string;
}

const NUMBER_MOCK_DATA = {
  startDate: '2025-04-01',
  endDate: '2025-04-20',
  data: [
    { date: '2025-04-01', week: '월', value: 10 },
    { date: '2025-04-02', week: '화', value: 55 },
    { date: '2025-04-03', week: '수', value: 20 },
    { date: '2025-04-04', week: '목', value: 15 },
    { date: '2025-04-05', week: '금', value: 30 },
    { date: '2025-04-06', week: '토', value: 85 },
    { date: '2025-04-07', week: '일', value: 40 },
  ],
  maxValue: 85,
};

function CurrentInfo({ changeSnapIndex, option, id }: TodayLogProps) {
  useAppMessage(
    ({ bottomSheet }) => {
      if (!bottomSheet) return;

      if (bottomSheet?.state === 'close') {
        changeSnapIndex(-1);
      }

      if (bottomSheet?.state === 'hold' && bottomSheet.snapIndex) {
        changeSnapIndex(bottomSheet.snapIndex);
      }
    },
    [option]
  );

  if (option === 'TEXT_TYPE') {
    return <WritingInfo recordsId={id} />;
  }

  if (option === 'BOOLEAN_TYPE') {
    return <BooleanInfo recordsId={id} />;
  }

  if (option === 'OPTION_TYPE') {
    return <OptionInfo recordsId={id} />;
  }

  if (option === 'NUMBER_TYPE') {
    return <NumberInfo recordsId={id} />;
  }
}

export default CurrentInfo;
