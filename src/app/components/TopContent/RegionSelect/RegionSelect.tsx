"use client";
import { ChangeEvent, useState, useEffect } from "react";
import React from "react";
import s from "./RegionSelect.module.css";
import { useGetRegionsQuery } from "../../../../services/regionsApi"; // Импортируем хук из API

interface RegionSelectProps {
  setSelectedRegionId: React.Dispatch<React.SetStateAction<number | null>>;
}

const RegionSelect: React.FC<RegionSelectProps> = ({ setSelectedRegionId }) => {
  const { data: regions } = useGetRegionsQuery();
  const [selectedRegion, setSelectedRegion] = useState<string | "">("");

  useEffect(() => {
    if (selectedRegion) {
      setSelectedRegionId(+selectedRegion);
    }
  }, [selectedRegion, setSelectedRegionId]);

  const regionSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
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
