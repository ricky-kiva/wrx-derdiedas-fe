import React from 'react';

interface MainContainerProps {
  children: React.ReactNode;
}

export const MainContainer: React.FC<MainContainerProps> = ({ children }) => (
  <div
    className='bg-bg-indigo h-screen flex justify-center items-center'
  >
    <div 
      className='flex flex-col justify-between items-center bg-brdr-black bg-neuschwanstein-1-mobile-grad 
      md:bg-neuschwanstein-1-grad bg-cover bg-[center_left_42%] md:bg-center w-[96%] md:w-[94%] h-[96%] md:h-[90%] 
      p-6 lg:p-8  border-[5px] border-brdr-black rounded-[35px] shadow-2xl shadow-ctnr-blackOutShdw/75'
    >
      {children}
    </div>
  </div>
);
