import type { LogOption } from '..';

import WritingLog from './WritingLog';
import BooleanLog from './BooleanLog';
import NumberLog from './NumberLog';
import OptionLog from './OptionLog';
import NotFound from './NotFound';
import { useEffect } from 'react';

interface TodayLogProps {
  option: LogOption;
  changeSnapIndex: (index: number) => void;
}

function TodayLog({ option, changeSnapIndex }: TodayLogProps) {
  const getMessageToApp = (e: MessageEvent) => {
    const { bottomSheet } = JSON.parse(e.data);

    if (bottomSheet?.state === 'close') {
      changeSnapIndex(-1);
    }

    if (bottomSheet?.state === 'hold') {
      changeSnapIndex(bottomSheet.snapIndex);
    }
  };

  useEffect(() => {
    document.addEventListener('message', getMessageToApp as EventListener);
    window.addEventListener('message', getMessageToApp);

    return () => {
      document.removeEventListener('message', getMessageToApp as EventListener);
      window.removeEventListener('message', getMessageToApp);
    };
  }, [option]);

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
