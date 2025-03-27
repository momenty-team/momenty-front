'use client';

import useAppMessage from '@/common/hooks/useAppMessage';
import { useRouter } from 'next/navigation';

function BridgeConnection() {
  const route = useRouter();

  useAppMessage(({ route: routePath }) => {
    alert(routePath);
    if (routePath) {
      route.push(routePath);
    }
  }, []);

  return <></>;
}

export default BridgeConnection;
