import { Nunito } from 'next/font/google';
import '../styles/reset.css';
import '../styles/globals.css';
import StoreProvider from '../providers/StoreProvider';
import Header from '@/components/Header/Header';
import TopSidebar from '@/components/TopSidebar/TopSidebar';
import BottomSidebar from '@/components/BottomSidebar/BottomSidebar';
import Footer from '@/components/Footer/Footer';

const nunito = Nunito({
  subsets: ['latin', 'cyrillic'], // Подключаем поддержку кириллицы
  weight: ['300', '400', '500', '700'], // Выбираем нужные толщины
  variable: '--font-nunito', // Переменная CSS для шрифта
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={nunito.variable}>
        <div id="modal-root"></div>
        <div className='wrapper'>
          <StoreProvider>
            <Header/>
            <div className='content'>
              <div className='sidebars'>
                <TopSidebar/>
                <BottomSidebar/>
              </div>
              <div className='page'>
                {children}
              </div>
            </div>
            <Footer/>
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
