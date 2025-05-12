import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import s from './MobileMenu.module.css';
import Theme from '../Theme/Theme';
import Language from '../Language/Language';
import Menu from '../Menu/Menu';

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [modal, setModal] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setModal(document.getElementById('modal-root'));
    }
  }, []);

  useEffect(() => {
    const clickOutsideMenu = () => setIsMobileMenuOpen(false);
    if (modal) {
      window.addEventListener('click', clickOutsideMenu);
    }
    return () => {
      if (modal) {
        window.removeEventListener('click', clickOutsideMenu);
      }
    };
  }, [modal, setIsMobileMenuOpen]);

  return (
    modal && isMobileMenuOpen
      ? createPortal(
          <div className={s.menu} onClick={(e) => e.stopPropagation()}>
            <div className={s.themeLanguageBlock}>
              <Theme />
              <Language />
            </div>
            <Menu />
          </div>,
          modal
        )
      : null
  );
};

export default MobileMenu;
