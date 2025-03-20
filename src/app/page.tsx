import Image from "next/image";
import s from "./styles/page.module.css";
import { useState } from "react";
import TopContent from "./components/TopContent/TopContent";
import MainContent from "./components/MainContent/MainContent";

export default function Home() {
  return (
    <div className={s.mainPage}>
        <TopContent/>
        <MainContent/>
    </div>
  );
}
