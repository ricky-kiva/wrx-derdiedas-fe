interface MeaningExcerptProps {
  meanings?: string[]
}

export const MeaningExcerpt: React.FC<MeaningExcerptProps> = ({ meanings }) => {
  if (!meanings || meanings.length === 0) return null;
  
  return (
    <div className='w-full flex flex-col gap-y-3 px-6 drop-shadow-txt-black'>
      <h3>MEANINGS</h3>
      <p>
        { meanings
        .slice(0, 3)
        .map((m) => m.charAt(0).toUpperCase() + m.slice(1))
        .join(' • ') }
      </p>
    </div>
  );
};
