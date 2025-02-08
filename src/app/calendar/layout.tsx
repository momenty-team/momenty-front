import type { ReactNode } from 'react';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ko">
      <body className="flex flex-col min-h-screen">
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
