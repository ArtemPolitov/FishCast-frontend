import React from 'react'
import s from './PeriodWeather.module.css'
import { useGetHourlyForecast4daysQuery } from '@/services/weatherApi'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { skipToken } from '@reduxjs/toolkit/query'
import PeriodWeatherItem from './PeriodWeatherItem/PeriodWeatherItem'
import { HourlyForecast4days } from '@/services/weatherApi'
import { TimestampForecast } from '@/services/weatherApi'

interface PeriodWeatherProps {
  weatherPeriod: string,
}

// Функция для конвертации метки времени в Киевский часовой пояс
const convertToKyivDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000); // Преобразуем метку времени в миллисекунды
  const kyivDate = new Date(date.toLocaleString('en-US', { timeZone: 'Europe/Kiev' }));
  return kyivDate;
};

export const getDayWeatherData = (forecast4daysData: HourlyForecast4days): TimestampForecast[] => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayDateStr = `${yyyy}-${mm}-${dd}`; // формат 'YYYY-MM-DD'

  if (forecast4daysData) {
    return forecast4daysData.list
      .filter(item => item.dt_txt.slice(0, 10) === todayDateStr) // Фильтрация по дате
      .slice(0, 8); // Ограничиваем результат первыми 8 отметками
  }

  return [];
};




export const getSecondDayWeatherData = (forecast4daysData: HourlyForecast4days): TimestampForecast[] => {
  const now = new Date();
  const secondDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1); // безопасное добавление

  const yyyy = secondDay.getFullYear();
  const mm = String(secondDay.getMonth() + 1).padStart(2, '0');
  const dd = String(secondDay.getDate()).padStart(2, '0');
  const secondDayDateStr = `${yyyy}-${mm}-${dd}`; // 'YYYY-MM-DD'

  if (forecast4daysData) {
    return forecast4daysData.list.filter(item => {
      const kyivDate = convertToKyivDate(item.dt); // Конвертируем в Киевское время
      const itemDateStr = `${kyivDate.getFullYear()}-${String(kyivDate.getMonth() + 1).padStart(2, '0')}-${String(kyivDate.getDate()).padStart(2, '0')}`;
      return itemDateStr === secondDayDateStr;
    });
  }

  return [];
};

export const getThirdDayWeatherData = (forecast4daysData: HourlyForecast4days): TimestampForecast[] => {
  const now = new Date();
  const thirdDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2); // безопасное добавление

  const yyyy = thirdDay.getFullYear();
  const mm = String(thirdDay.getMonth() + 1).padStart(2, '0');
  const dd = String(thirdDay.getDate()).padStart(2, '0');
  const thirdDayDateStr = `${yyyy}-${mm}-${dd}`; // 'YYYY-MM-DD'

  if (forecast4daysData) {
    return forecast4daysData.list.filter(item => {
      const kyivDate = convertToKyivDate(item.dt); // Конвертируем в Киевское время
      const itemDateStr = `${kyivDate.getFullYear()}-${String(kyivDate.getMonth() + 1).padStart(2, '0')}-${String(kyivDate.getDate()).padStart(2, '0')}`;
      return itemDateStr === thirdDayDateStr;
    });
  }

  return [];
};

export const getFourthDayWeatherData = (forecast4daysData: HourlyForecast4days): TimestampForecast[] => {
  const now = new Date();
  const fourthDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3); // безопасное добавление

  const yyyy = fourthDay.getFullYear();
  const mm = String(fourthDay.getMonth() + 1).padStart(2, '0');
  const dd = String(fourthDay.getDate()).padStart(2, '0');
  const fourthDayDateStr = `${yyyy}-${mm}-${dd}`;

  if (forecast4daysData) {
    return forecast4daysData.list.filter(item => {
      const kyivDate = convertToKyivDate(item.dt); // Конвертируем в Киевское время
      const itemDateStr = `${kyivDate.getFullYear()}-${String(kyivDate.getMonth() + 1).padStart(2, '0')}-${String(kyivDate.getDate()).padStart(2, '0')}`;
      return itemDateStr === fourthDayDateStr;
    });
  }

  return [];
};

export const getFifthDayWeatherData = (forecast4daysData: HourlyForecast4days): TimestampForecast[] => {
  const now = new Date();
  const fifthDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4); // безопасное добавление

  const yyyy = fifthDay.getFullYear();
  const mm = String(fifthDay.getMonth() + 1).padStart(2, '0');
  const dd = String(fifthDay.getDate()).padStart(2, '0');
  const fifthDayDateStr = `${yyyy}-${mm}-${dd}`;

  if (forecast4daysData) {
    return forecast4daysData.list.filter(item => {
      const kyivDate = convertToKyivDate(item.dt); // Конвертируем в Киевское время
      const itemDateStr = `${kyivDate.getFullYear()}-${String(kyivDate.getMonth() + 1).padStart(2, '0')}-${String(kyivDate.getDate()).padStart(2, '0')}`;
      return itemDateStr === fifthDayDateStr;
    });
  }

  return [];
};

const PeriodWeather: React.FC<PeriodWeatherProps> = ({ weatherPeriod }) => {
  const selectedCityLat = useSelector((state: RootState) => state.citySelection.selectedCityData?.lat);
  const selectedCityLon = useSelector((state: RootState) => state.citySelection.selectedCityData?.lon);

  const { data: hourlyForecast4daysData, isLoading: hourlyForecast4daysIsLoading, error: hourlyForecast4daysError } = useGetHourlyForecast4daysQuery(
    selectedCityLat && selectedCityLon ? { lat: selectedCityLat, lon: selectedCityLon } : skipToken,
  );

  return (
    <div className={s.periodWeather}>
      {hourlyForecast4daysIsLoading && <p className={s.loadingLabel}>Загрузка...</p>}
      {weatherPeriod === '24h' && hourlyForecast4daysData &&
        getDayWeatherData(hourlyForecast4daysData).map(weatherItem => (
          <PeriodWeatherItem key={weatherItem.dt} periodWeatherItemData={weatherItem} />
        ))}
      {weatherPeriod === 'secondDay' && hourlyForecast4daysData &&
        getSecondDayWeatherData(hourlyForecast4daysData).map(weatherItem => (
          <PeriodWeatherItem key={weatherItem.dt} periodWeatherItemData={weatherItem} />
        ))}
      {weatherPeriod === 'thirdDay' && hourlyForecast4daysData &&
        getThirdDayWeatherData(hourlyForecast4daysData).map(weatherItem => (
          <PeriodWeatherItem key={weatherItem.dt} periodWeatherItemData={weatherItem} />
        ))}
      {weatherPeriod === 'fourthDay' && hourlyForecast4daysData &&
        getFourthDayWeatherData(hourlyForecast4daysData).map(weatherItem => (
          <PeriodWeatherItem key={weatherItem.dt} periodWeatherItemData={weatherItem} />
        ))}
      {weatherPeriod === 'fifthDay' && hourlyForecast4daysData &&
        getFifthDayWeatherData(hourlyForecast4daysData).map(weatherItem => (
          <PeriodWeatherItem key={weatherItem.dt} periodWeatherItemData={weatherItem} />
        ))}
    </div>
  );
};

export default PeriodWeather;
