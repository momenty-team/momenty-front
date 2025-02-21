'use client';

import { usePathname, useRouter } from 'next/navigation';
import { suitFont } from '@/styles/font';
import TopNavigation from '@/components/TopNavigation';

function AlarmLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathName = usePathname();
  const onClickSetting = () => {
    router.push('alarm/setting');
  };

  const onClickNextBackButton = () => {
    router.back();
  }

  const isSettingsPage = pathName === '/alarm';

  const onClickBackButton = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ route: 'goBack' }));
    }
  };

  return (
    <html lang="ko">
      <body>
        <TopNavigation onClickBack={isSettingsPage ? onClickBackButton : onClickNextBackButton}>
          {isSettingsPage && (
            <button type="button" onClick={onClickSetting} className="flex text-black">
              설정
            </button>
          )}
        </TopNavigation>
        <main className={`${suitFont.className} pt-12`}>{children}</main>
      </body>
    </html>
  );
}

export default AlarmLayout;
