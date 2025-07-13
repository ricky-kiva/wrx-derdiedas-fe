import ImgWaxStamp from '../../assets/images/wax-stamp-r-1-c.png';

const ModalFooterWax = () => (
  <div className='w-full flex gap-5 justify-between items-center'>
    <p className='text-xs opacity-85 py-4'>
      Mit treuem Herzen,
      <br />Dein <a 
        href='https://rickyslash.my.id/' 
        target='_blank' 
        rel='noopener noreferrer' 
        className='hover:text-brdr-goldBrdrTop transition-colors duration-200'
      >
        <u>Rickyslash</u>
      </a>
    </p>
    <img src={ImgWaxStamp} className='w-20 h-20 -mt-4 drop-shadow-out-img-black 
      hover:rotate-6 duration-500 transition-transform'
    />
  </div>
);

export default ModalFooterWax;
