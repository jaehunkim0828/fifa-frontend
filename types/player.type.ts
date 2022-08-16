export interface CompareThumb {
  spid?: string;
  name?: string;
  seasonImg?: string;
}

export interface PlayerInfo {
  name: string;
  id: string;
  season: { classname: string; seasonImg: string; id: number };
}

export interface PlayerProps {
  playersInitial?: Array<PlayerInfo>;
  count?: number;
  current_page?: number;
  players?: any;
}
