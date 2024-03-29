import PlayerThumb from "@components/player-thumb/PlayerThumb";
import { PlayerInfo } from "@type/player.type";
import { PlayerListProps } from "@components/player-list/playerList.type";
import { useState } from "react";
import style from "./playerList.module.scss";

export default function PlayerList({
  players,
  loading,
  setLoading,
  setdLoading,
}: PlayerListProps) {
  return (
    <div className={style.playerList}>
      {players.map(
        (
          {
            id,
            name,
            ovr,
            season: { classname, seasonImg },
            position,
          }: PlayerInfo,
          i: number
        ) => {
          return (
            <PlayerThumb
              key={i}
              spid={id}
              name={name}
              position={position}
              seasonImg={seasonImg}
              classname={classname}
              loading={loading}
              setdLoading={setdLoading}
              setLoading={setLoading}
              ovr={ovr}
            />
          );
        }
      )}
    </div>
  );
}
