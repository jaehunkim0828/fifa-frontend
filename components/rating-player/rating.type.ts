import { PlayerCardStatus } from "@components/player-card/playerCard.type";
import { Stats } from "@type/rank.type";

export interface RatingTable extends PlayerCardStatus {
  assist: { score: number; best: boolean };
  attack: { score: number; best: boolean };
  defense: { score: number; best: boolean };
  kipping: { score: number; best: boolean };
  matchCount: string;
}

export interface RatingProps {
  loading: boolean;
  position: string;
  setLoading: (v: boolean) => void;
  setOpen: (v: boolean) => void;
}
