import React, { useState, useEffect } from 'react';

interface PreloadBgImageProps {
  preloadBgImage: string;
  defaultImage?: string;
  fallbackImage?: string;
}

const PreloadBgImage: React.FC<PreloadBgImageProps> = ({ preloadBgImage, defaultImage, fallbackImage }) => {
  const [bgImage, setBgImage] = useState<string>(defaultImage || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wEWEygNWiLqlwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAMSURBVAjXY/j//z8ABf4C/tzMWecAAAAASUVORK5CYII=');

  useEffect(() => {
    const img = new Image();
    img.src = preloadBgImage;

    img.onload = () => {
      setBgImage(preloadBgImage);
    };

    img.onerror = () => {
      if (fallbackImage) {
        setBgImage(fallbackImage);
      }
    };
  }, [preloadBgImage, fallbackImage]);

  return (
    <div style={{ backgroundImage: `url(${bgImage})` }}>
{children}
    </div>
  );
};

export default PreloadBgImage;