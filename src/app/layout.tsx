import '@/styles/globals.css';

export const metadata = {
  title: 'My App',
  description: '모바일 기기에 최적화된 웹사이트',
  viewport: 'width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
