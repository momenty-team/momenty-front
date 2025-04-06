import WritingLog from './WritingLog';
import BooleanLog from './BooleanLog';
import NumberLog from './NumberLog';
import OptionLog from './OptionLog';
import NotFound from './NotFound';
import useAppMessage from '@/common/hooks/useAppMessage';
import type { LogRecord, RecordDetail } from '@/types/apis/records';

interface TodayLogProps {
  option: LogRecord['method'];
  title: LogRecord['title'];
  unit?: string;
  changeSnapIndex: (index: number) => void;
  moveLogAdder: VoidFunction;
  logDetailList: RecordDetail[];
}

function TodayLog({ option, changeSnapIndex, title, moveLogAdder, logDetailList, unit }: TodayLogProps) {
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

  if (logDetailList.length === 0) {
    return <NotFound title={title} moveLogAdder={moveLogAdder} />;
  }

  if (option === 'TEXT_TYPE') {
    return <WritingLog logDetailList={logDetailList} />;
  }

  if (option === 'BOOLEAN_TYPE') {
    return <BooleanLog logDetailList={logDetailList} />;
  }

  if (option === 'OPTION_TYPE') {
    return <OptionLog logDetailList={logDetailList} />;
  }

  if (option === 'NUMBER_TYPE') {
    return <NumberLog logDetailList={logDetailList} unit={unit!} />;
  }

  return <div>올바르지 않은 옵션이에요.</div>;
}

export default TodayLog;
