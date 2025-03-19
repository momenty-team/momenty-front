'use client';

import TopNavigation from '@/common/components/TopNavigation';
import { postMessageToWebView } from '@/utils';

export default function ClientTopNavigation() {
  return <TopNavigation onClickBack={() => postMessageToWebView({ route: 'goBack' })} backGroundColor="transparent" />;
}
