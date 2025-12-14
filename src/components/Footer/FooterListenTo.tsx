import LogoRammstein from '../../assets/images/logo-rammstein-1-1.svg?react';

const playlistLink = 'https://www.youtube.com/watch?v=StZcUAPRRac&list=PLqp1jEghmdpPGK0Nm2mHz3yxTve_64fnp&index=1';

const FooterListenTo = () => (
  <div className='flex flex-col items-center gap-y-2'>
    <span>Anhören</span>
    <a href={playlistLink} target='_blank' rel='noopener noreferrer'>
      <LogoRammstein className='w-auto h-4 fill-bg-indigo hover:fill-svg-redHvr duration-700'/>
    </a>
  </div>
);

export default FooterListenTo;
