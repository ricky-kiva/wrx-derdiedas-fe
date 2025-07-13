import ModalFooterWax from './ModalFooterWax';

interface LetterModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const LetterModal: React.FC<LetterModalProps> = ({ setShowModal }) => (
  <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-20'>
    <div className='relative w-3/4 md:w-1/2 lg:w-[29.15%] h-[81%] md:h-[75%] flex flex-col
      bg-old-paper-texture-1 bg-cover rounded-2xl shadow-xl text-sm text-txt-black'
    >
      <div className='w-full flex justify-end px-6 pt-5'>
        <button 
          className='hover:text-brdr-goldBrdrTop transition-colors duration-200'
          type='button'
          aria-label='Close Modal Box'
          onClick={() => setShowModal(false)}
        >
          x
        </button>
      </div>
      <div className='flex-1 flex flex-col justify-between px-12 py-10'>
        <h3 className="opacity-85 mb-4">MEANINGS.</h3>
        <div className="flex-1 overflow-y-auto scrollbar-custom-gold pacity-85">
          <p>
            Whispers dance upon the midnight air,
            Shadows weave the stories we all share.
            <br /><br />
            Hearts collide beneath the silver moon,
            Echoes hum an ancient, timeless tune.
            <br /><br />
            Dreams ignite in flames of quiet light,
            Guiding souls through darkness into flight.
          </p>
        </div>
        <ModalFooterWax />
      </div>
    </div>
  </div>
);
