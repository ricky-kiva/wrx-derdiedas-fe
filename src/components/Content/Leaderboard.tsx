import React, { useEffect, useState } from 'react';
import { getLeaderboard } from '../../services/leaderboard';
import type { LeaderboardEntryDTO } from '../../types/leaderboard/types';
import { syncUrlParams } from '../../utils/url';
import { TableNavigation } from './TableNavigation';
import { formatNumberSuffix, formatRankMedal, formatRelativeDate } from '../../utils/styler';
import LottieLoading from '../../assets/lottie/loading-1.json';
import Lottie from 'lottie-react';

export const Leaderboard: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  
  const initialPage = Number(params.get('page') ?? 1);
  const initialLimit = Number(params.get('limit') ?? 25);

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [items, setItems] = useState<LeaderboardEntryDTO[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const res = await getLeaderboard({ page, limit });
      
      if (res.data.status === 'success') {
        setItems(res.data.data.items);
        setTotalPages(res.data.data.totalPages);

        syncUrlParams(page, limit);
      }

      setIsLoading(false);
    };
    
    fetchData();
    
  }, [page, limit]);

  const onPrev = () => page > 1 && setPage(page - 1);
  const onNext = () => page < totalPages && setPage(page + 1);

  return (
  <div className='flex flex-col gap-4'>
    <p>Play the <b>game</b> and climb the leaderboard!</p>
    <p>Jump in <b>instantly as a guest</b>, or <b>sign in to keep your progress</b>!</p>
    <p className='text-[10px] italic'>*Keep your weekly streak alive! <u>Otherwise, your points shrink by 5 after 7 days</u></p>
    {isLoading 
      ? <Lottie 
        animationData={LottieLoading} 
        loop 
        autoplay 
        className='scale-[0.125] origin-center ml-1'
        style={{ filter: 'brightness(0) saturate(100%) invert(9%) sepia(1%) saturate(6422%) hue-rotate(197deg) brightness(91%) contrast(95%)' }}  
      />
      : <>
        <div className='overflow-x-auto mt-2'>
          <table className='min-w-full text-xs'>
            <thead>
              <tr className='base-table-row border-t'>
                <th className='base-table-heading-data text-center'>Rank</th>
                <th className='base-table-heading-data'>Name</th>
                <th className='base-table-heading-data text-center'>Point</th>
                <th className='base-table-heading-data'>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className='base-table-row'>
                  <td className='base-table-data text-center'>{formatRankMedal(item.rank)}</td>
                  <td className='pr-1 base-table-data'>{item.name}</td>
                  <td className='pr-1 base-table-data text-center'>{formatNumberSuffix(item.point)}</td>
                  <td className='pr-1 base-table-data'>{formatRelativeDate(item.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableNavigation isBottom={true} page={page} limit={limit} totalPages={totalPages} setPage={setPage} setLimit={setLimit} onPrev={onPrev} onNext={onNext} />
      </>
    }
  </div>
  );
};
