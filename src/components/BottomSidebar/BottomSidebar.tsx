import React from 'react'
import s from './BottomSidebar.module.css'

export default function BottomSidebar() {
  return (
    <div className={s.bottomSidebar}>
      <h2 className={s.bottomSidebarTitle}>Локации поблизости</h2>
      <div className={s.nearestLocations}></div>
    </div>
  )
}
