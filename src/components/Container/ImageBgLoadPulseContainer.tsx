import type React from 'react';
import { useState } from 'react';

interface BottomGradient {
  color: string;
  transparentPercentage: number;
  colorPercentage: number;
}

interface ImageBgLoadPulseContainer {
  children: React.ReactNode;
  img: string;
  bgColor: string;
  imgAlt?: string;
  pulseOpacity?: number;
  bottomGradient?: BottomGradient;
}

export const ImageBgLoadPulseContainer: React.FC<ImageBgLoadPulseContainer> = (props) => {
  const { children, img, bgColor, imgAlt="", pulseOpacity=95, bottomGradient } = props;

  const [bgLoaded, setBgLoaded] = useState(false);

  let gradTransparentPercentage;
  let gradColorPercentage;

  const TAILWIND_BG_PREFIX = 'bg-';
  const bgClassName = bgColor.startsWith(TAILWIND_BG_PREFIX) ? bgColor : "";
  const bgStyle = bgColor.startsWith(TAILWIND_BG_PREFIX) ? {} : { backgroundColor: bgColor };

  if (bottomGradient) {
    gradTransparentPercentage = `${bottomGradient.transparentPercentage}%`;
    gradColorPercentage = `${bottomGradient.colorPercentage}%`;
  }

  return (
    <>
      <div 
        className={`absolute inset-0 ${bgClassName}`}
        style={{ ...bgStyle, opacity: pulseOpacity / 100 }}
      />
        <img
          src={img}
          alt={imgAlt}
          className={`absolute inset-0 w-full h-full object-cover object-[37.5%_center] sm:object-center transition-opacity duration-700 ${bgLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => { setBgLoaded(true); }}
        />
        {bottomGradient && <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, transparent ${gradTransparentPercentage}, ${bottomGradient.color} ${gradColorPercentage})` }}
        />}
        {!bgLoaded && <div 
          className={`absolute inset-0 animate-bg-pulse`}
          style={{ ...bgStyle }}></div>}
        <div className="relative flex flex-col justify-between items-center w-full h-full">
          {children}
        </div>
    </>
  );
};
