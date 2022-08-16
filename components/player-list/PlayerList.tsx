import PlayerThumb from "@components/player-thumb/PlayerThumb";
import { PlayerInfo } from "@type/player.type";
import { PlayerListProps } from "@type/playerList.type";
import style from "./playerList.module.scss";

export default function PlayerList({
  players,
  comparedThumb,
  setComparedThumb,
}: PlayerListProps) {
  return (
    <div className={style.playerList}>
      {players.map(
        (
          { id, name, season: { classname, seasonImg } }: PlayerInfo,
          i: number
        ) => {
          return (
            <PlayerThumb
              key={i}
              spid={id}
              comparedThumb={comparedThumb}
              setComparedThumb={setComparedThumb}
              name={name}
              seasonImg={seasonImg}
              classname={classname}
            />
          );
        }
      )}
    </div>
  );
}
