export interface HomeProps {
  totalCount: number;
  playerRanks: PlayerRank[];
  count: number;
}
export interface PlayerRank {
  name: string;
  id: string;
  season: {
    className: string;
    seasonImg: string;
  };
}
