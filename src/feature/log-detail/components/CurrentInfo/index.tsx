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

const BOOLEAN_MOCK_DATA = {
  startDate: '2025-04-01',
  endDate: '2025-04-20',
  data: [
    { date: '2025-04-01', week: '월', OValue: 1, XValue: 0 },
    { date: '2025-04-02', week: '화', OValue: 8, XValue: 1 },
    { date: '2025-04-03', week: '수', OValue: 2, XValue: 3 },
    { date: '2025-04-04', week: '목', OValue: 4, XValue: 1 },
    { date: '2025-04-05', week: '금', OValue: 3, XValue: 2 },
    { date: '2025-04-06', week: '토', OValue: 7, XValue: 1 },
    { date: '2025-04-07', week: '일', OValue: 4, XValue: 0 },
  ],
  maxValue: 8,
};

const OPTION_MOCK_DATA = {
  startDate: '2025-04-01',
  endDate: '2025-04-20',
  data: [
    { date: '2025-04-01', week: '월', count: 1, optionList: ['기록1', '기록2'] },
    { date: '2025-04-02', week: '화', count: 2, optionList: ['기록1'] },
    { date: '2025-04-03', week: '수', count: 3, optionList: ['기록1', '기록2', '기록3'] },
    { date: '2025-04-04', week: '목', count: 1, optionList: ['기록1', '기록2', '기록3', '기록4'] },
    { date: '2025-04-05', week: '금', count: 2, optionList: ['기록1', '기록2'] },
    { date: '2025-04-06', week: '토', count: 1, optionList: ['기록1'] },
    { date: '2025-04-07', week: '일', count: 0, optionList: [] },
  ],
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
    return <WritingInfo MOCK_DATA={NUMBER_MOCK_DATA} recordsId={id} />;
  }

  if (option === 'BOOLEAN_TYPE') {
    return <BooleanInfo MOCK_DATA={BOOLEAN_MOCK_DATA} recordsId={id} />;
  }

  if (option === 'OPTION_TYPE') {
    return <OptionInfo MOCK_DATA={OPTION_MOCK_DATA} recordsId={id} />;
  }

  if (option === 'NUMBER_TYPE') {
    return <NumberInfo MOCK_DATA={NUMBER_MOCK_DATA} recordsId={id} />;
  }
}

export default CurrentInfo;
