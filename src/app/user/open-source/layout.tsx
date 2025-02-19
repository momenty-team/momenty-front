'use client';

import { useRouter } from 'next/navigation';
import { suitFont } from '@/styles/font';
import TopNavigation from '@/components/TopNavigation';

export default function OpenSourceLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const onClickNextBackButton = () => {
    router.back();
  };

  return (
    <html lang="ko">
      <body>
        <TopNavigation onClickBack={onClickNextBackButton} />
        <main className={`${suitFont.className} pt-12`}>{children}</main>
      </body>
    </html>
  );
}
