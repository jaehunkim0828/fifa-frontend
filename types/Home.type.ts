export interface HomeProps {
  totalCount: number;
  playerRanks: PlayerRank[];
  count: number;
}
export interface PlayerRank {
  name: string;
  id: string;
  season: {
    classname: string;
    seasonImg: string;
  };
}
