export interface SearchBarProps {
  player: string;
  onChangePlayer: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submit: (e: React.SyntheticEvent) => void;
  setPlayer: (key: string, value: string) => void;
}
