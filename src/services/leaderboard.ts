import { api } from '../lib/api/api';
import type { GetLeaderboardQuery, LeaderboardEntryDTO } from '../types/leaderboard/types';
import type { ApiResponse, PagedDTO } from '../types/shared/types';

const leaderboardRoute = '/leaderboard';

export const getLeaderboard = async(q: GetLeaderboardQuery={}) => {
  return api.get<ApiResponse<PagedDTO<LeaderboardEntryDTO>>>(leaderboardRoute, { params: q });
};
