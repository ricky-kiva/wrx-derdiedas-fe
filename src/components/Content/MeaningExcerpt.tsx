import type { LetterModalContent } from '../Modal';

interface MeaningExcerptProps {
  meanings?: string[];
  setModalContent: React.Dispatch<React.SetStateAction<LetterModalContent | undefined>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MeaningExcerpt: React.FC<MeaningExcerptProps> = ({ meanings, setModalContent, setShowModal }) => {
  if (!meanings || meanings.length === 0) return null;

  const previewCount = 3;
  const showSeeAll = meanings.length > previewCount;

  const joinMeanings = (arr: string[]) => arr
    .map(m => m[0].toUpperCase() + m.slice(1))
    .join(' • ');

  const meaningsPreview = joinMeanings(meanings.slice(0, previewCount));
  const meaningsFull = (
    <ul className="list-disc list-inside">
      {meanings.map((m, i) => (
        <li key={i}>{m[0].toUpperCase() + m.slice(1)}</li>
      ))}
    </ul>
  );
  
  return (
    <div className='w-full flex flex-col gap-y-3 drop-shadow-txt-black'>
      <h3>MEANINGS</h3>
      <p>
        { meaningsPreview }
        { showSeeAll && (
          <>
            {' • '}
            <button
              className='underline duration-300 hover:shadow-out-a-gold hover:text-shadow-a-gold'
              type='button'
              aria-label='See all meanings'
              onClick={() => {
                setShowModal(true);
                setModalContent({
                  title: 'MEANINGS',
                  body: meaningsFull
                });
              }}>
              See All
            </button>
          </>
        )}
      </p>
    </div>
  );
};
