export interface GetLeaderboardQuery {
  page?: number;
  limit?: number;
}

export interface LeaderboardEntryDTO {
  id: string;
  name: string;
  point: number;
  rank: number;
  updatedAt: string;
}
