export interface PlayerCardProps {
  unit: PlayerCardStatus;
}

export interface PlayerCardStatus {
  border: string;
  ovr: number;
  position: string;
  image: string;
  nation: string;
  seasonImg: string;
  name: string;
  pay: string;
}
