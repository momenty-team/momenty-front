'use client';

import { usePathname, useRouter } from 'next/navigation';
import ChevronLeftIcon from '@/assets/svg/chevron-left.svg';

export default function AlarmLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathName = usePathname();
  const onClickBack = () => {
    router.back();
  };
  const onClickSetting = () => {
    router.push('/alarm/setting');
  };

  const isSettingsPage = pathName === '/alarm';

  return (
    <html lang="ko">
      <body className="bg-gray-100">
        <header className="width-full justify-between flex py-3 px-4">
          <button type="button" onClick={onClickBack}>
            <ChevronLeftIcon />
          </button>
          {isSettingsPage && (
            <button type="button" onClick={onClickSetting} className="flex text-black">
              설정
            </button>
          )}
        </header>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
