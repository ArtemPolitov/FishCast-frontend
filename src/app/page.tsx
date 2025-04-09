import Image from "next/image";
import s from "./styles/page.module.css";
import { useState } from "react";
import TestApi from "@/components/TestApi/TestApi";
import WeatherSide from "./components/WeatherSide/WeatherSide";
import FishSide from "./components/FishSide/FishSide";

export default function Home() {
  return (
    <div className={s.mainPage}>
      <WeatherSide/>
      <FishSide/>
    </div>
  );
}
