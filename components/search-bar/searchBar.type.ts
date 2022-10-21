export interface SearchBarProps {
  player: string;
  onChangePlayer: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submit: (e: React.SyntheticEvent) => void;
  more: More;
  setMore: (value: any) => void;
  open?: boolean;
}

export interface More {
  [x: string]: number[];
}
