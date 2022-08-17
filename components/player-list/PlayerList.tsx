import PlayerThumb from "@components/player-thumb/PlayerThumb";
import { PlayerInfo } from "@type/player.type";
import { PlayerListProps } from "@type/playerList.type";
import style from "./playerList.module.scss";

export default function PlayerList({ players }: PlayerListProps) {
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
