import { CurrentWeatherData,TimestampForecast } from "@/services/weatherApi";

import { FishGroup } from "@/store/fishDataSlice";

export const calculateFishBite = (fishGroup:FishGroup,waterTemperature: number,pressure: number,windSpeed: number,cloudiness: number,isRain: boolean, time: number) =>{
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
      }if(windSpeed>=4){
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
      }if((time>11&&time<16)||(time>=22&&time<=23)||(time>=0&&time<4)){
        fishBite--;
      }
      break;

    case 'predatory':
      if(waterTemperature>=10&&waterTemperature<=20){
        fishBite++;
      }if(waterTemperature>23||waterTemperature<6){
        fishBite--;
      }
      if(pressure>=740&&pressure<=770){
        fishBite++;
      }else fishBite--;
      if(windSpeed>=1&&windSpeed<=3){
        fishBite++;
      }if(windSpeed>=4){
        fishBite--;
      }
      if(cloudiness>=10&&cloudiness<=60){
        fishBite+=0.5;
      }
      if(isRain===true){
        fishBite+=0.5;
      }
      if((time>=5&&time<10)||(time>=18&&time<=21)){
        fishBite++;
      }if(time>10&&time<18){
        fishBite-=2;
      }if((time>=22&&time<=23)||(time>=0&&time<4)){
        fishBite=0;
      }
      break;
    case 'catfish':
      if(waterTemperature>=20&&waterTemperature<=29){
        fishBite++;
      }if(waterTemperature<18||waterTemperature>29){
        fishBite--;
      }if(waterTemperature<9){
        fishBite-=2;
      }
      if(pressure>=740&&pressure<=770){
        fishBite++;
      }else fishBite--;
      if(windSpeed<=3){
        fishBite+=0.5;
      }if(windSpeed>6){
        fishBite-=1;
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
      }if(windSpeed>=5){
        fishBite--;
      };
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
    case 'bleak':
      if(waterTemperature>=18&&waterTemperature<=24){
        fishBite++;
      }if(waterTemperature>26){
        fishBite--;
      }if(waterTemperature<13){
        fishBite-=2;
      }
      if(pressure>=740&&pressure<=770){
        fishBite++;
      }else fishBite--;
      if(windSpeed<4){
        fishBite++;
      }if(windSpeed>=5){
        fishBite--;
      };
      if(cloudiness>=0&&cloudiness<=70){
        fishBite+=0.5;
      }if(isRain===true){
        fishBite-=0.5;
      }if((time>=5&&time<=9)||(time>=17&&time<20)){
        fishBite++;
      }if((time>=10&&time<17)||time===4){
        fishBite--;
      }if((time>21&&time<=23)||(time>=0&&time<4)){
        fishBite=0;
      }
      break;
      case 'bream':
        if(waterTemperature>=15&&waterTemperature<=22){
          fishBite++;
        }if(waterTemperature>26||waterTemperature<10){
          fishBite--;
        }
        if(pressure>=740&&pressure<=770){
          fishBite++;
        }else fishBite--;
        if(windSpeed<=2&&windSpeed<5){
          fishBite++;
        }if(windSpeed>=6){
          fishBite--;
        };
        if(cloudiness>=30&&cloudiness<=90){
          fishBite+=0.5;
        }if(isRain===true){
          fishBite-=0.5;
        }if((time>=4&&time<=8)||(time>=19&&time<22)){
          fishBite++;
        }if(time>=10&&time<17){
          fishBite--;
        }
        break;
      case 'pike':
        if(waterTemperature>=1&&waterTemperature<=19){
          fishBite++;
        }if(waterTemperature>23){
          fishBite--;
        }
        if(pressure>=740&&pressure<=770){
          fishBite++;
        }else fishBite--;
        if(windSpeed<=2&&windSpeed<=5){
          fishBite++;
        }if(windSpeed>7){
          fishBite--;
        };
        if(cloudiness>=30&&cloudiness<=80){
          fishBite+=0.5;
        }if(isRain===true){
          fishBite-=0.5;
        }if((time>=4&&time<=8)||(time>=18&&time<21)){
          fishBite++;
        }if(time>=10&&time<16){
          fishBite--;
        }if((time>=22&&time<=23)||(time>=0&&time<4)){
          fishBite-=2;
        }
        break;
      case 'rudd':
        if(waterTemperature>=15&&waterTemperature<=25){
          fishBite++;
        }if(waterTemperature>28||waterTemperature<14){
          fishBite--;
        }
        if(pressure>=740&&pressure<=770){
          fishBite++;
        }else fishBite--;
        if(windSpeed<=2){
          fishBite++;
        }if(windSpeed>6){
          fishBite--;
        };
        if(cloudiness<=40){
          fishBite+=0.5;
        }if(isRain===true){
          fishBite-=0.5;
        }if((time>=6&&time<=18)){
          fishBite++;
        }if((time>=21&&time<=23)||(time>=0&&time<=4)){
          fishBite=0;
        }
        break;
      case 'silver carp':
        if(waterTemperature>=18&&waterTemperature<=25){
          fishBite++;
        }if(waterTemperature<15||waterTemperature>29){
          fishBite--;
        }
        if(pressure>=740&&pressure<=770){
          fishBite++;
        }else fishBite--;
        if(windSpeed<=2){
          fishBite++;
        }if(windSpeed>6){
          fishBite--;
        };
        if(cloudiness<=30){
          fishBite+=0.5;
        }if(isRain===false){
          fishBite+=0.5;
        }if((time>=6&&time<=16)){
          fishBite++;
        }if(time>20&&time<4){
          fishBite--;
        }
        break;
      case 'tench':
        if(waterTemperature>=18&&waterTemperature<=25){
          fishBite++;
        }if(waterTemperature<15||waterTemperature>29){
          fishBite--;
        }
        if(pressure>=740&&pressure<=770){
          fishBite++;
        }else fishBite--;
        if(windSpeed<=2){
          fishBite++;
        }if(windSpeed>6){
          fishBite--;
        };
        if(cloudiness<=50){
          fishBite+=0.5;
        }if(isRain===false){
          fishBite+=0.5;
        }if((time>=5&&time<=9)||(time>=18&&time<=21)){
          fishBite++;
        }if(time>22&&time<4){
          fishBite--;
        }
        break;
      case 'zander':
        if(waterTemperature>=12&&waterTemperature<=20){
          fishBite++;
        }if(waterTemperature>24){
          fishBite--;
        }
        if(pressure>=740&&pressure<=770){
          fishBite++;
        }else fishBite--;
        if(windSpeed>=2&&windSpeed<=7){
          fishBite++;
        }if(windSpeed>8){
          fishBite--;
        };
        if(cloudiness>=60){
          fishBite+=0.5;
        }if(cloudiness<15){
          fishBite-=0.5
        }
        if(isRain===true){
          fishBite+=0.5;
        }if((time>=0&&time<=7)||(time>=18&&time<=0)){
          fishBite++;
        }
        break;
      case 'goby':
        if(waterTemperature>=16&&waterTemperature<=24){
          fishBite++;
        }if(waterTemperature<7){
          fishBite--;
        }
        if(pressure>=740&&pressure<=770){
          fishBite++;
        }else fishBite--;
        if(windSpeed<=4){
          fishBite++;
        }if(windSpeed>9){
          fishBite--;
        };
        if(cloudiness>=40&&cloudiness<=80){
          fishBite+=0.5;
        }
        if(isRain===true){
          fishBite+=0.5;
        }if((time>=6&&time<=11)||(time>=15&&time<=20)){
          fishBite++;
        }if((time>21&&time<=23)||(time>=0&&time<4)){
          fishBite=0;
        }
        break;
      case 'saberfish':
        if(waterTemperature>=18&&waterTemperature<=24){
          fishBite++;
        }if(waterTemperature<12){
          fishBite--;
        }
        if(pressure>=740&&pressure<=770){
          fishBite++;
        }else fishBite--;
        if(windSpeed>=2&&windSpeed<=5){
          fishBite++;
        }if(windSpeed>8){
          fishBite--;
        };
        if(cloudiness>=10&&cloudiness<=70){
          fishBite+=0.5;
        }
        if(isRain===true){
          fishBite+=0.5;
        }if((time>=4&&time<=8)||(time>=17&&time<=20)){
          fishBite++;
        }if((time>=21&&time<=23)||(time>=0&&time<4)){
          fishBite=0;
        }if(time>=12&&time<=16){
          fishBite--;
        }
        break;
      case 'ide':
        if(waterTemperature>=14&&waterTemperature<=22){
          fishBite++;
        }if(waterTemperature>=25){
          fishBite--;
        }if(waterTemperature<6){
          fishBite--;
        }
        if(pressure>=740&&pressure<=770){
          fishBite++;
        }else fishBite--;
        if(windSpeed>=2&&windSpeed<=5){
          fishBite++;
        }if(windSpeed>8){
          fishBite--;
        };
        if(cloudiness>=30&&cloudiness<=80){
          fishBite+=0.5;
        }
        if(isRain===true){
          fishBite+=0.5;
        }if((time>=4&&time<=8)||(time>=18&&time<=20)){
          fishBite++;
        }if((time>=21&&time<=23)||(time>=0&&time<4)){
          fishBite=0;
        }if(time>=12&&time<=16){
          fishBite--;
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
  if ('rain' in weatherData && weatherData.rain) { 
    const rainAmount = weatherData.rain['3h'] || weatherData.rain['1h'];
    return rainAmount !== undefined && rainAmount <= 2.5;
  }
  return false;
};