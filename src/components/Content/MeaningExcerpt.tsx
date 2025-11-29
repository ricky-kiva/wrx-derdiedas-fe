import { useModal } from '../../hooks/useModal';
import { motion, useAnimation } from 'framer-motion';
import { slideYBlur } from '../../utils/animation';
import { useEffect } from 'react';

interface MeaningExcerptProps {
  meanings?: string[];
}

export const MeaningExcerpt: React.FC<MeaningExcerptProps> = ({ meanings }) => {
  const { openModal } = useModal();

  const animControls = useAnimation();

  useEffect(() => {
    animControls.set("initial");
    animControls.start("animate");
  }, [meanings, animControls]);

  if (!meanings || meanings.length === 0) return null;

  const PREVIEW_COUNT = 3;
  const SHOW_SEE_ALL = meanings.length > PREVIEW_COUNT;

  const joinMeanings = (arr: string[]) => arr
    .map(m => m[0].toUpperCase() + m.slice(1))
    .join(' • ');

  const meaningsPreview = joinMeanings(meanings.slice(0, PREVIEW_COUNT));
  const meaningsFull = (
    <ul className="list-disc list-inside">
      {meanings.map((m, i) => (
        <li key={i}>{m[0].toUpperCase() + m.slice(1)}</li>
      ))}
    </ul>
  );
  
  return (
    <motion.div
      variants={slideYBlur()}
      animate={animControls}
      className='w-full flex flex-col gap-y-3 anim-drop-shadow-txt-black'>
      <h3>MEANINGS</h3>
      <p>
        { meaningsPreview }
        { SHOW_SEE_ALL && (
          <>
            {' • '}
            <button
              className='underline duration-300 hover:shadow-out-a-gold hover:text-shadow-a-gold'
              type='button'
              aria-label='See all meanings'
              onClick={ () => openModal({ title: 'MEANINGS', body: meaningsFull }) }>
              See All
            </button>
          </>
        )}
      </p>
    </motion.div>
  );
};
