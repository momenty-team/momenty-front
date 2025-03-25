'use client';

import TopNavigation from '@/common/components/TopNavigation';
import { postMessageToWebView } from '@/utils/webview';

function NoticeTopNavigation() {
  return <TopNavigation onClickBack={() => postMessageToWebView({ route: 'goBack' })} />;
}

export default NoticeTopNavigation;
