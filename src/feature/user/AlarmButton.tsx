'use client';

import { postMessageToWebView } from '@/utils/webview';
import BellIcon from '@/assets/svg/bell.svg';

function AlarmButton() {
  const routeAlarm = () => {
    postMessageToWebView({ route: '/alarm' });
  };

  return (
    <button onClick={routeAlarm} type="button">
      <BellIcon width={26} height={26} />
    </button>
  );
}

export default AlarmButton;
