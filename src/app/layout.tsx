import '@/styles/globals.css';
import localFont from 'next/font/local';

export const metadata = {
  title: 'My App',
  description: '모바일 기기에 최적화된 웹사이트',
  viewport: 'width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no',
};

const suitVariable = localFont({
  src: [
    {
      path: '../assets/fonts/SUIT-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../assets/fonts/SUIT-ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../assets/fonts/SUIT-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/SUIT-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/SUIT-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/SUIT-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/SUIT-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/SUIT-ExtraBold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={suitVariable.className}>
      <body>{children}</body>
    </html>
  );
}
