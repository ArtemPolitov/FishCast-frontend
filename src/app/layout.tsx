import { Nunito } from 'next/font/google';
import '../styles/reset.css';
import '../styles/globals.css';
import StoreProvider from '../providers/StoreProvider';
import Header from '@/components/Header/Header';

const nunito = Nunito({
  subsets: ['latin', 'cyrillic'], // Подключаем поддержку кириллицы
  weight: ['300', '400', '500', '700'], // Выбираем нужные толщины
  variable: '--font-nunito', // Переменная CSS для шрифта
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={nunito.variable}>
        <div className='content'>
          <StoreProvider>
            <div id="modal-root"></div>
            <Header/>
            {children}
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
