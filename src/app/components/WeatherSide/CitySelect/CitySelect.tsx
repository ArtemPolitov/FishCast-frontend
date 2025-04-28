import React, { ChangeEvent, useEffect, useState } from 'react';
import s from './CitySelect.module.css';
import { useDispatch } from 'react-redux';
import { setIsCitySelected, setSelectedCityData } from '../../../../store/citySelectionSlice';
import { useGetCityByIdQuery } from '@/services/cityApi';
import { useSelector } from 'react-redux';
import {RootState} from '@/store/store'

interface CitySelectProps {
  selectedRegionId: undefined | number;
}

interface CityByRegion {
  id: number;
  name: string;
}

const CitySelect: React.FC<CitySelectProps> = ({ selectedRegionId }) => {
  const [citiesByRegion, setCitiesByRegion] = useState<CityByRegion[]>([]);
  const dispatch = useDispatch();
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const globalSelectedCityId = useSelector((store:RootState)=>store.citySelection.selectedCityData?.id);

  const { data: cityData } = useGetCityByIdQuery(selectedCityId ?? 0, {
    skip: selectedCityId === null,
  });
  console.log(cityData);

  // Диспатчим данные о городе в стор ТОЛЬКО когда cityData обновляется
  useEffect(() => {
    if (cityData) {
      dispatch(setSelectedCityData(cityData));
      localStorage.setItem('selectedCityData',JSON.stringify(cityData));
    }
  }, [cityData, dispatch]);

  useEffect(() => {
    const getCitiesData = async () => {
      if (selectedRegionId) {
        const response = await fetch(`http://localhost:5000/api/cities/by-region/${selectedRegionId}`);
        const data = await response.json();
        setCitiesByRegion(data);
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
        name=""
        id=""
        disabled={!selectedRegionId}
        onChange={citySelectHandler}
        value={globalSelectedCityId ?? "default"}
      >
        <option value="default" disabled className={s.defaultOption}>
          Выберите нас. пункт
        </option>
        {citiesByRegion.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CitySelect;
