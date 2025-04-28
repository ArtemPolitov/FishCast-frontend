'use client';
import React from 'react';
import s from './MapFrame.module.css';

interface MapFrameProps {
  lat: number;
  lon: number;
}

const MapFrame: React.FC<MapFrameProps> = ({ lat, lon }) => {
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lon-0.005}%2C${lat-0.005}%2C${lon+0.005}%2C${lat+0.005}&layer=mapnik&marker=${lat}%2C${lon}`;

  return (
    <div className={s.mapFrame}>
      <iframe
        src={mapSrc}
        className={s.mapIframe}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export default MapFrame;