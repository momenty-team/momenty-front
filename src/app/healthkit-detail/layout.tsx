import { suitFont } from '@/styles/font';

function LogDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <main className={`w-full flex h-full flex-col items-center gap-5 ${suitFont.className} scroll-smooth0`}>
          {children}
        </main>
      </body>
    </html>
  );
}

export default LogDetailLayout;
export const metadata = {
  title: 'Log Detail',
  description: 'Log Detail',
};
