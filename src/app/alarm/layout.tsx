import { suitFont } from '@/styles/font';

function AlarmLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <main className={`${suitFont.className}`}>{children}</main>
      </body>
    </html>
  );
}

export default AlarmLayout;
