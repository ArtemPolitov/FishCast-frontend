import { Nunito } from 'next/font/google';
import '../styles/reset.css';
import '../styles/globals.css';
import StoreProvider from '../providers/StoreProvider';
import Header from '@/components/Header/Header';
import TopSidebar from '@/components/TopSidebar/TopSidebar';
import BottomSidebar from '@/components/BottomSidebar/BottomSidebar';
import StoreInitializer from '@/components/StoreInitializer/StoreInitializer';

const nunito = Nunito({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-nunito',
});

export const metadata = {
  title: 'FishCast',
  description: 'Прогноз погоди та кльову риби',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-96x96.png', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  other: {
    'apple-mobile-web-app-title': 'FishCast',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body suppressHydrationWarning className={nunito.variable}>
        <div id="modal-root"></div>
        <div className="fade-in">
          <div className='wrapper'>
            <StoreProvider>
              <StoreInitializer />
              <Header />
              <div className="content">
                <div className="sidebars">
                  <TopSidebar />
                  <BottomSidebar />
                </div>
                {children}
                <div className="sidebarsMobile">
                  <TopSidebar />
                  <BottomSidebar />
                </div>
              </div>
            </StoreProvider>
          </div>
        </div>
      </body>
    </html>
  );
}

