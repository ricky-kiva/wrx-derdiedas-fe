interface MeaningExcerptProps {
  meanings?: string[]
}

export const MeaningExcerpt: React.FC<MeaningExcerptProps> = ({ meanings }) => {
  if (!meanings || meanings.length === 0) return null;

  const meaningsAmount = 3;
  const showSeeAll = meanings.length > meaningsAmount;
  const meaningsPreview = meanings
    .slice(0, meaningsAmount)
    .map((m) => m.charAt(0).toUpperCase() + m.slice(1))
    .join(' • ');
  
  return (
    <div className='w-full flex flex-col gap-y-3 px-6 drop-shadow-txt-black'>
      <h3>MEANINGS</h3>
      <p>
        { meaningsPreview }
        { showSeeAll && (
          <>
            {' • '}
            <button
              onClick={() => {}}
              className='underline duration-300 hover:shadow-out-a-gold hover:text-shadow-a-gold'
              type='button'
              aria-label='See all meanings'>
              See All
            </button>
          </>
        )}
      </p>
    </div>
  );
};
