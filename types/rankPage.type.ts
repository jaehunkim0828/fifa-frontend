export interface RankPageProps {
  totalCount: number;
  playerRanks: PlayerRank[];
  count: number;
  isMobile: boolean;
}
export interface PlayerRank {
  name: string;
  id: string;
  season: {
    classname: string;
    seasonImg: string;
  };
}
