import { CurrentWeatherData,TimestampForecast } from "@/services/weatherApi";

import { FishGroup } from "@/store/fishDataSlice";


export const calculateFishBite = (fishGroup:FishGroup,waterTemperature: number,pressure: number,windSpeed: number,cloudiness: number,isRain: boolean,time: number) =>{
  let fishBite = 0;
  switch(fishGroup){
    case 'peaceful':
      if(waterTemperature>=11&&waterTemperature<=20){
        fishBite++;
      }else fishBite--;
      if(pressure>=740&&pressure<=770){
        fishBite++;
      }else fishBite--;
      if(windSpeed>=1&&windSpeed<3){
        fishBite++;
      }if(windSpeed>3){
        fishBite--;
      }
      if(cloudiness>=50&&cloudiness<=100){
        fishBite+=0.5;
      }
      if(isRain===true){
        fishBite+=0.5;
      }
      if((time>=5&&time<10)||(time>=18&&time<22)){
        fishBite++;
      }if(time>11&&time<16){
        fishBite--;
      }
      break;

    case 'predatory':
      if(waterTemperature>=10&&waterTemperature<=20){
        fishBite++;
      }if(waterTemperature>23||waterTemperature<8){
        fishBite--;
      }
      if(pressure>=740&&pressure<=770){
        fishBite++;
      }else fishBite--;
      if(windSpeed>=1&&windSpeed<=3){
        fishBite++;
      }if(windSpeed>3){
        fishBite--;
      }
      if(cloudiness>=10&&cloudiness<=60){
        fishBite+=0.5;
      }
      if(isRain===true){
        fishBite+=0.5;
      }
      if((time>=5&&time<10)||(time>=18&&time<22)){
        fishBite++;
      }if((time>10&&time<18)||time>22&&time<5){
        fishBite--;
      }
      break;
    case 'catfish':
      if(waterTemperature>=20&&waterTemperature<=29){
        fishBite++;
      }if(waterTemperature<18||waterTemperature>29){
        fishBite--;
      }
      if(pressure>=740&&pressure<=770){
        fishBite++;
      }else fishBite--;
      if(windSpeed<=2){
        fishBite+=0.5;
      }
      if(isRain===true){
        fishBite+=0.5;
      }
      if((time>=21&&time<=23)||(time>=0&&time<5)){
        fishBite+=2;
      }if(time>=10&&time<=18){
        fishBite--;
      }
      break;
    case 'carp':
      if(waterTemperature>=17&&waterTemperature<=27){
        fishBite++;
      }else fishBite--;
      if(pressure>=740&&pressure<=770){
        fishBite++;
      }else fishBite--;
      if(windSpeed<=2){
        fishBite++;
      }else fishBite--;
      if(cloudiness>=30&&cloudiness<=80){
        fishBite+=0.5;
      }
      if(isRain===true){
        fishBite+=0.5;
      }
      if((time>=5&&time<12)||(time>=17&&time<22)){
        fishBite++;
      }
      break;
    case 'northern':
      if(waterTemperature>=1&&waterTemperature<=14){
        fishBite++;
      }else fishBite--;
      if(pressure>=740&&pressure<=770){
        fishBite++;
      }else fishBite--;
      if(windSpeed<=2){
        fishBite++;
      }else fishBite--;
      if(cloudiness>=50&&cloudiness<=100){
        fishBite+=0.5;
      }if(isRain===true){
        fishBite+=0.5;
      }if((time>=5&&time<9)||(time>=18&&time<22)){
        fishBite++;
      }
      break;
  }
  return fishBite>=0?Math.round(fishBite):0;
} 

export const getWaterTemperature = (tempCelsius:number):number =>{
  let waterTemp = tempCelsius*0.9+0.1*30;
  return Math.round(waterTemp>0?waterTemp:1);
}

export const getCurrentHourNum = () =>{
  const currentDate = new Date();
  return currentDate.getHours()
}

export const checkRain = (weatherData: CurrentWeatherData | TimestampForecast): boolean => {
  if ('rain' in weatherData && weatherData.rain) { // Проверяем, что rain существует и не undefined
    const rainAmount = weatherData.rain['3h'] || weatherData.rain['1h'];
    return rainAmount !== undefined && rainAmount <= 2.5;
  }
  return false;
};