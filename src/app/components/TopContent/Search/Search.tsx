import React from 'react'
import s from './Search.module.css'
import Image from 'next/image'

export default function Search() {
  return (
    <div className={s.searchBlock}>
      <input type="text" className={s.searchInput}/>
      <button className={s.searchButton}><div className={s.buttonImage}><Image src='/images/search_icon.png' alt='search' height={30} width={30}/></div></button>
    </div>
  )
}
