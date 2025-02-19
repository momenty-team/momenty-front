'use client';

import { usePathname, useRouter } from 'next/navigation';
import ChevronLeftIcon from '@/assets/svg/chevron-left.svg';
import { suitFont } from '@/styles/font';

export default function AlarmLayout({ children }: { children: React.ReactNode }) {
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
        <header className="width-full justify-between flex py-3 px-4">
          <button type="button" onClick={isSettingsPage ? onClickBackButton : onClickNextBackButton}>
            <ChevronLeftIcon />
          </button>
          {isSettingsPage && (
            <button type="button" onClick={onClickSetting} className="flex text-black">
              설정
            </button>
          )}
        </header>
        <main className={`${suitFont.className}`}>{children}</main>
      </body>
    </html>
  );
}
