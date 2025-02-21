import type { Metadata } from 'next';
import type { Viewport } from 'next';

export const viewport: Viewport = {};

export const metadata: Metadata = {};

function AddLogLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

export default AddLogLayout;
