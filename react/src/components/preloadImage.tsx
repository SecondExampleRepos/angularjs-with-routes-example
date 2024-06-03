import React, { useState, useEffect } from 'react';

interface PreloadImageProps {
  ngSrc: string;
  defaultImage?: string;
  fallbackImage?: string;
}

const PreloadImage: React.FC<PreloadImageProps> = ({ ngSrc, defaultImage, fallbackImage }) => {
  const [src, setSrc] = useState<string>(defaultImage || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wEWEygNWiLqlwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAMSURBVAjXY/j//z8ABf4C/tzMWecAAAAASUVORK5CYII=');

  useEffect(() => {
    const img = new Image();
    img.src = ngSrc;
    img.onload = () => setSrc(ngSrc);
    img.onerror = () => {
      if (fallbackImage) {
        setSrc(fallbackImage);
      }
    };
  }, [ngSrc, fallbackImage]);

  return <img src={src} alt="Preloaded" />;
};

export default PreloadImage;