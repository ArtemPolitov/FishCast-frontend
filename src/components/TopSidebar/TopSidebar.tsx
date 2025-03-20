import React from 'react'
import s from './TopSidebar.module.css'

export default function TopSidebar() {
  return (
    <div className={s.topSidebar}>
      <h2 className={s.topSidebarTitle}>Лучший клев</h2>
      <div className={s.locations}></div>
    </div>
  )
}
