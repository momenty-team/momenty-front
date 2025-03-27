import type { BridgeData } from '@/types';
import { useEffect } from 'react';

type Callback = (message: BridgeData) => void;
type Dependency = React.DependencyList;

function useAppMessage(callback: Callback, dependency: Dependency = []) {
  
  const getMessageToApp = (e: MessageEvent) => {
    const message: BridgeData = JSON.parse(e.data);
    callback(message);
  }
  
  useEffect(() => {
    document.addEventListener('message', getMessageToApp as EventListener);
    window.addEventListener('message', getMessageToApp);

    return () => {
      document.removeEventListener('message', getMessageToApp as EventListener);
      window.removeEventListener('message', getMessageToApp);
    };
  }, dependency);
};

export default useAppMessage;