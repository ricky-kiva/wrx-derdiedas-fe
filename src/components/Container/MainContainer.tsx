import React from 'react';
import ImgNeuschwanstein from '../../assets/images/bg-neuschwanstein-1-2x-c.jpg';
import { ImageBgLoadPulseContainer } from './ImageBgLoadPulseContainer';

interface MainContainerProps {
  children: React.ReactNode;
}

export const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  return (
    <div className="bg-bg-indigo h-screen flex justify-center items-center">
      <div className="relative w-[96%] md:w-[94%] h-[96%] md:h-[90%] p-6 lg:p-8 border-[5px] border-brdr-black rounded-[35px] shadow-2xl shadow-ctnr-blackOutShdw/75 overflow-hidden">
        <ImageBgLoadPulseContainer 
          children={children}
          img={ImgNeuschwanstein}
          imgAlt='Neuschwanstein Castle'
          bgColor='bg-brdr-black'
          bottomGradient={{
            color: 'var(--color-brdr-black)',
            transparentPercentage: 80,
            colorPercentage: 85
          }}
        />
      </div>
    </div>
  );
};
