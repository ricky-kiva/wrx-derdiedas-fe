import ModalFooterWax from './ModalFooterWax';

export interface LetterModalContent {
  title: string;
  body: React.ReactNode;
}

interface LetterModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  content?: LetterModalContent;
}

export const LetterModal: React.FC<LetterModalProps> = ({ setShowModal, content }) => {
  if (content === undefined) return null;

  return (
    <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-20'>
      <div className='relative w-3/4 md:w-1/2 lg:w-[29.15%] h-[81%] md:h-[75%] flex flex-col
        bg-bg-indigo bg-old-paper-texture-1 bg-cover rounded-2xl shadow-xl text-sm text-txt-black'
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
        <div className='flex-1 flex flex-col min-h-0 px-12 py-10'>
          <h3 className="mb-4 opacity-85 uppercase">{content?.title}</h3>
          <div className="flex-1 overflow-y-auto min-h-0 scrollbar-custom-gold opacity-85">
            {content?.body}
          </div>
          <ModalFooterWax />
        </div>
      </div>
    </div>
  );
};
