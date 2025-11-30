import type React from 'react';
import { useState } from 'react';
import { createTempInputHandler } from '../../utils/form';

interface TableNavigationProps {
  page: number;
  limit: number;
  totalPages: number;
  isBottom?: boolean;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const TableNavigation: React.FC<TableNavigationProps> = (props) => {
  const { isBottom=false, page, limit, totalPages, setPage, setLimit, onPrev, onNext } = props;

  const LIMIT_MIN = 10;
  const LIMIT_MAX = 150;
  const PAGE_MIN = 1;
  const PAGE_MAX = (totalPages: number) => totalPages;

  const [tempPage, setTempPage] = useState(page);
  const [tempLimit, setTempLimit] = useState(limit);

  const handleLimitEnter = createTempInputHandler<number>(setLimit, setTempLimit, {
    min: LIMIT_MIN,
    max: LIMIT_MAX,
    key: 'Enter',
  });

  const handlePageEnter = createTempInputHandler<number>(setPage, setTempPage, {
    min: PAGE_MIN,
    max: PAGE_MAX(totalPages),
    key: 'Enter',
  });

  const handleLimitBlur = createTempInputHandler<number>(setLimit, setTempLimit, {
    min: LIMIT_MIN,
    max: LIMIT_MAX,
  });

  const handlePageBlur = createTempInputHandler<number>(setPage, setTempPage, {
    min: PAGE_MIN,
    max: PAGE_MAX(totalPages),
  });

  return (
    <div className={`flex justify-between items-center px-2
      ${isBottom ? 'mb-4' : ''}`}
    >
      <div className='flex items-center gap-2 text-[10px]'>
        <span>Records / Page</span>
        <input 
          type='number'
          value={tempLimit}
          min={10}
          max={150}
          onChange={(e) => setTempLimit(Number(e.target.value))}
          onKeyDown={handleLimitEnter}
          onBlur={handleLimitBlur}
          className='w-9 text-[10px] text-bg-indigo text-center bg-form-black rounded-full outline-none
            [&::-webkit-inner-spin-button]:appearance-none
            [&::-webkit-outer-spin-button]:appearance-none
            [-moz-appearance:textfield]'
        />
        <span className='hidden sm:block'>from {totalPages} pages</span>
      </div>

      <div className='flex items-center gap-2'>
        <button 
          disabled={page <= 1}
          onClick={onPrev}
          className='disabled:opacity-40 disabled:text-txt-black hover:text-brdr-goldBrdrTop transition-colors duration-200'
        >
          {'<'}
        </button>
        <input 
          type='number'
          value={tempPage}
          min={1}
          max={totalPages}
          onChange={(e) => setTempPage(Number(e.target.value))}
          onKeyDown={handlePageEnter}
          onBlur={handlePageBlur}
          className='w-9 text-[10px] text-bg-indigo text-center bg-form-black rounded-full outline-none
            [&::-webkit-inner-spin-button]:appearance-none
            [&::-webkit-outer-spin-button]:appearance-none
            [-moz-appearance:textfield]'
        />
        <button 
          disabled={page >= totalPages}
          onClick={onNext}
          className='disabled:opacity-40 disabled:text-txt-black hover:text-brdr-goldBrdrTop transition-colors duration-200'
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};
