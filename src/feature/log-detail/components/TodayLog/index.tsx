import type { LogOption } from '..';

import WritingLog from './WritingLog';
import BooleanLog from './BooleanLog';
import NumberLog from './NumberLog';
import OptionLog from './OptionLog';
import NotFound from './NotFound';

interface TodayLogProps {
  option: LogOption;
}

function TodayLog({ option }: TodayLogProps) {
  if (option === 'string') {
    return <WritingLog />;
  }

  if (option === 'boolean') {
    return <BooleanLog />;
  }

  if (option === 'option') {
    return <OptionLog />;
  }

  if (option === 'number') {
    return <NumberLog />;
  }

  return <NotFound goToLogAdder={() => {}} />;
}

export default TodayLog;
