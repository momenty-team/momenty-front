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
