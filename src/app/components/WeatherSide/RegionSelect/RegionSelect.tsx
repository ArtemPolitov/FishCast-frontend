"use client";
import { ChangeEvent, useState, useEffect } from "react";
import React from "react";
import s from "./RegionSelect.module.css";
import { useGetRegionsQuery } from "../../../../services/regionsApi"; // Импортируем хук из API
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { setIsCitySelected,setSelectedCityData } from "@/store/citySelectionSlice";

interface RegionSelectProps {
  setSelectedRegionId: React.Dispatch<React.SetStateAction<number | null>>;
}

const RegionSelect: React.FC<RegionSelectProps> = ({ setSelectedRegionId }) => {
  const dispatch = useDispatch();
  const { data: regions } = useGetRegionsQuery();
  const [selectedRegion, setSelectedRegion] = useState<string | "">("");
  const isCitySelected = useSelector((state:RootState)=>state.citySelection.isCitySelected);
  useEffect(() => {
    if (selectedRegion) {
      setSelectedRegionId(+selectedRegion);
    }
  }, [selectedRegion, setSelectedRegionId]);

  const regionSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if(isCitySelected){
      dispatch(setIsCitySelected(false));
      dispatch(setSelectedCityData(null));
    }
    setSelectedRegion(e.target.value);
  };

  return (
    <div className={s.regionSelect}>
      <select
        value={selectedRegion}
        onChange={regionSelectHandler}
        name="region"
        id="region-select"
      >
        <option value="" disabled className={s.defaultOption}>
          Выберите область
        </option>
        {regions &&
          regions.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default RegionSelect;
