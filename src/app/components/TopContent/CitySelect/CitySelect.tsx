import React, { ChangeEvent, useEffect,useState } from 'react'
import s from './CitySelect.module.css'
import { useDispatch, useSelector } from 'react-redux';
import {setIsCitySelected} from '../../../../store/citySelectionSlice';


interface CitySelectProps{
  selectedRegionId:null|number;
}

interface City{
  id:number,
  name:string,
}

const CitySelect:React.FC<CitySelectProps> = ({selectedRegionId}) => {
  const [citiesByRegion,setCitiesByRegion] = useState<City[]>([]);
  const dispatch = useDispatch();

  useEffect(()=>{
    const getCitiesData = async() =>{
      const responce = await fetch(`http://localhost:5000/api/cities/by-region/${selectedRegionId}`);
      const data = await responce.json();
      setCitiesByRegion(data);
    }
    if(selectedRegionId) getCitiesData();
  },[selectedRegionId]);

  const citySelectHandler = (e:ChangeEvent<HTMLSelectElement>) =>{
    dispatch(setIsCitySelected(true));
  }

  return (
    <div className={s.citySelect}>
      <select name="" id="" disabled={!selectedRegionId} onChange={citySelectHandler}>
        <option value="" disabled selected className={s.defaultOption}>Выберите нас. пункт</option>
        {citiesByRegion&&citiesByRegion.map(city=>{
          return <option key={city.id} value={city.id}>{city.name}</option>
        })}
      </select>
    </div>
  )
}

export default CitySelect;
