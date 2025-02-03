import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';

export const metadata = {
  title: 'My App',
  description: '모바일 기기에 최적화된 웹사이트',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
};

// const suitVariable = localFont({
//   src: '../assets/fonts/SUIT-Variable.woff2',
//   variable: '--font-suit',
// });

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body>{children}</body>
    </html>
  );
}
