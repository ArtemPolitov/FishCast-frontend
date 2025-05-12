"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import s from "./RegionSelect.module.css";
import { useGetRegionsQuery, useGetRegionByIdQuery } from "../../../../services/regionsApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setIsCitySelected, setSelectedCityData } from "@/store/citySelectionSlice";
import { setSelectedRegionData } from "@/store/regionsDataSlice";

const RegionSelect = () => {
  const dispatch = useDispatch();
  const { data: regions } = useGetRegionsQuery();
  const [selectedRegionId,setSelectedRegionId] = useState<null|number>(null);
  const isCitySelected = useSelector((state: RootState) => state.citySelection.isCitySelected);
  const selectedRegionIdFromStore = useSelector((state:RootState)=>state.geoData.selectedRegionData?.id);
  const currentLanguage = useSelector((state:RootState)=>state.localization.currentLanguage);

  const { data: selectedRegionData } = useGetRegionByIdQuery(selectedRegionId!, {
    skip: selectedRegionId === null,
  });

  useEffect(() => {
    if (selectedRegionData) {
      dispatch(setSelectedRegionData(selectedRegionData));
      localStorage.setItem('selectedRegionData',JSON.stringify(selectedRegionData));
    }
  }, [selectedRegionData, dispatch]);

  const handleRegionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = +e.target.value;
    setSelectedRegionId(id);
    if (isCitySelected) {
      dispatch(setIsCitySelected(false));
      dispatch(setSelectedCityData(null));
    }
  };

  return (
    <div className={s.regionSelect}>
      <select
        value={selectedRegionIdFromStore ?? ""}  
        onChange={handleRegionChange}
        className={s.select}
        name="region"
        id="region-select"
      >
        <option value="" disabled className={s.defaultOption}>
          {currentLanguage==='ru'?'Выберите область':'Оберіть область'}
        </option>
        {regions?.map((region) => (
          <option key={region.id} value={region.id}>
            {currentLanguage==='ru'?region.name:region.name_uk} 
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegionSelect;
