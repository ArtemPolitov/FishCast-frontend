import React, { ChangeEvent, useEffect, useState } from 'react';
import s from './CitySelect.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCitySelected, setSelectedCityData } from '../../../../store/citySelectionSlice';
import { useGetCityByIdQuery } from '@/services/cityApi';
import { RootState } from '@/store/store';

interface CitySelectProps {
  selectedRegionId: undefined | number;
}

interface CityByRegion {
  id: number;
  name: string;
  name_uk: string;
}

const CitySelect: React.FC<CitySelectProps> = ({ selectedRegionId }) => {
  const [citiesByRegion, setCitiesByRegion] = useState<CityByRegion[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const dispatch = useDispatch();

  const globalSelectedCityId = useSelector((store: RootState) => store.citySelection.selectedCityData?.id);
  const currentLanguage = useSelector((store: RootState) => store.localization.currentLanguage);

  const { data: cityData } = useGetCityByIdQuery(selectedCityId ?? 0, {
    skip: selectedCityId === null,
  });

  useEffect(() => {
    if (cityData) {
      dispatch(setSelectedCityData(cityData));
      localStorage.setItem('selectedCityData', JSON.stringify(cityData));
    }
  }, [cityData, dispatch]);

  useEffect(() => {
    const getCitiesData = async () => {
      if (selectedRegionId) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cities/by-region/${selectedRegionId}`);
          if (!response.ok) {
            throw new Error(`Ошибка запроса: ${response.status}`);
          }
          const data = await response.json();
          setCitiesByRegion(data);
        } catch (error) {
          console.error('Ошибка при загрузке городов:', error);
          setCitiesByRegion([]); 
        }
      } else {
        setCitiesByRegion([]);
      }
    };

    getCitiesData();
  }, [selectedRegionId]);

  const citySelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const cityId = +e.target.value;
    dispatch(setIsCitySelected(true));
    setSelectedCityId(cityId);
  };

  return (
    <div className={s.citySelect}>
      <select
        name="city"
        id="city-select"
        disabled={!selectedRegionId}
        onChange={citySelectHandler}
        value={globalSelectedCityId ?? 'default'}
        className={s.select}
      >
        <option value="default" disabled className={s.defaultOption}>
          {currentLanguage === 'ru' ? 'Выберите нас. пункт' : 'Оберіть нас. пункт'}
        </option>
        {citiesByRegion.map((city) => (
          <option key={city.id} value={city.id}>
            {currentLanguage === 'ru' ? city.name : city.name_uk}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CitySelect;
