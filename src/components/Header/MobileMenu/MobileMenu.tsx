import React from 'react'
import { createPortal } from 'react-dom'
import s from './MobileMenu.module.css'
import Theme from '../Theme/Theme'
import Language from '../Language/Language'
import Menu from '../Menu/Menu'
import { useEffect,useState } from 'react'


interface MobileMenuProps {
  isMobileMenuOpen:boolean,
  setIsMobileMenuOpen:React.Dispatch<React.SetStateAction<boolean>>
}

const MobileMenu: React.FC<MobileMenuProps> = ({isMobileMenuOpen,setIsMobileMenuOpen}) =>{
  const modal = document.getElementById('modal-root');
  //const [isFirstRender,setIsFirstRender] = useState(true);
  
  useEffect(()=>{
    const clickOutsideMenu = () => setIsMobileMenuOpen(false);
    window.addEventListener('click',clickOutsideMenu);
    return()=>{
      window.removeEventListener('click',clickOutsideMenu)
    }
  },[]);

  return (
    modal&&isMobileMenuOpen?createPortal(
        <div className={s.menu} onClick={(e) => e.stopPropagation()}>
          <div className={s.themeLanguageBlock}>
            <Theme/>
            <Language/>
          </div>
          <Menu/>
        </div>,modal
    ):null
  )
}

export default MobileMenu;
