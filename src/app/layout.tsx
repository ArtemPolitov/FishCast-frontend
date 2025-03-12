import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/globals.css';
import '../styles/reset.css';
import StoreProvider from '../providers/StoreProvider';

const geistSans = Geist({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} ${geistMono.className}`} suppressHydrationWarning>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
