import { MoreType } from "@hooks/useMore";

export interface SearchBarProps {
  player: string;
  onChangePlayer: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submit: (e: React.SyntheticEvent) => void;
  more: More;
  setMore: (m: { type: MoreType; value: any }) => void;
  open?: boolean;
}

export interface More {
  season: string[];
  position: string[];
  nation: string;
  team: string;
}
