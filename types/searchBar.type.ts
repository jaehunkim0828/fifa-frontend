export interface SearchBarProps {
  player: string;
  onChangePlayer: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submit: (e: React.SyntheticEvent) => void;
  more: {
    [x in string]: number[];
  };
  setMore: (value: any) => void;
  open?: boolean;
}
