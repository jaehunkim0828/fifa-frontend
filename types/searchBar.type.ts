export interface SearchBarProps {
  player: string;
  onChangePlayer: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submit: (e: React.SyntheticEvent) => void;
  setPlayer: (value: string) => void;
}
