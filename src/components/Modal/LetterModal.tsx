import { fadeBlur, slideYBlur } from '../../utils/animation';
import ModalFooterWax from './ModalFooterWax';
import { motion } from 'framer-motion';

export interface LetterModalContent {
  title: string;
  body: React.ReactNode;
}

interface LetterModalProps {
  onClose: () => void;
  content?: LetterModalContent;
  isCompact?: boolean;
  isWider?: boolean;
}

export const LetterModal: React.FC<LetterModalProps> = (props) => {
  const { onClose, content, isCompact=false, isWider=false } = props;
  
  if (content === undefined) return null;

  return (
    <motion.div 
      onClick={onClose} 
      {...fadeBlur()}
      className='fixed inset-0 z-20 bg-black/40 flex items-center justify-center'
    >
      <motion.div
        onClick={(e) => e.stopPropagation()} 
        {...slideYBlur({ y: -24 })}
        className={`relative flex flex-col
          bg-bg-indigo bg-old-paper-texture-1 bg-cover rounded-t-2xl rounded-b-[4rem] shadow-xl text-sm text-txt-black 
          ${isCompact ? '' : 'h-[81%] md:h-[75%]'} ${isWider ? 'w-[90%] md:w-[75%] lg:w-[42.5%]' : 'w-[88.5%] md:w-1/2 lg:w-[29.15%]'}`}
      >
        <div className='w-full flex justify-end px-6 pt-5'>
          <button 
            className='hover:text-brdr-goldBrdrTop transition-colors duration-200'
            type='button'
            aria-label='Close Modal Box'
            onClick={onClose}
          >
            x
          </button>
        </div>
        <div className='flex-1 flex flex-col gap-3 min-h-0 px-12 py-10'>
          <h3 className="mb-1 opacity-85 uppercase">{content?.title}</h3>
          <div className="flex-1 overflow-y-auto min-h-0 scrollbar-custom-gold opacity-85">
            {content?.body}
          </div>
          <ModalFooterWax />
        </div>
      </motion.div>
    </motion.div>
  );
};
