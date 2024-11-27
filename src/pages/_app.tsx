import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';

const suitVariable = localFont({
  src: '../assets/fonts/SUIT-Variable.woff2',
  variable: '--font-suit',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={suitVariable.className}>
      <Component {...pageProps} />
    </main>
  );
}
