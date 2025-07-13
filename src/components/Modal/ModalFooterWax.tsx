import ImgWaxStamp from '../../assets/images/wax-stamp-d-1-c.png';

const ModalFooterWax = () => (
  <div className='w-full flex gap-5 justify-between items-center'>
    <p className='leading-4 text-txt-black opacity-85 py-4'>Mit treuem Herzen,<br />Dein Rickyslash</p>
    <img src={ImgWaxStamp} className='w-20 h-20 -mt-4 drop-shadow-out-img-black'/>
  </div>
);

export default ModalFooterWax;
