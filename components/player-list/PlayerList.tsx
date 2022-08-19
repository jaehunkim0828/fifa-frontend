import PlayerThumb from "@components/player-thumb/PlayerThumb";
import { PlayerInfo } from "@type/player.type";
import { PlayerListProps } from "@type/playerList.type";
import { useState } from "react";
import style from "./playerList.module.scss";

export default function PlayerList({ players }: PlayerListProps) {
  const [checkedList, setList] = useState<Array<string>>([]);

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
              checkedList={checkedList}
              setList={setList}
            />
          );
        }
      )}
    </div>
  );
}
