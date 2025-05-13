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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
              </div>
            </StoreProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
