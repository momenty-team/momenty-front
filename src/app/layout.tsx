import '@/styles/globals.css';
import localFont from 'next/font/local';

export const metadata = {
  title: 'My App',
  description: '모바일 기기에 최적화된 웹사이트',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
};

const suitVariable = localFont({
  src: '../assets/fonts/SUIT-Variable.woff2',
  variable: '--font-suit',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={suitVariable.variable}>
      <body>{children}</body>
    </html>
  );
}
