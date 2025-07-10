import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  viewportFit: 'cover',
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'Momenty',
  description: '당신의 순간을 기록하고 공유하는 공간',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
