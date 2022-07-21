import React, { useState, useRef } from "react";

import useInput from "../hooks/useInput";
import style from "../styles/player.module.scss";
import PlayerThumb from "./PlayerThumb";
import ComparedGraph from "./comparedGraph/ComparedGraph";
import useThumb from "../hooks/useThumb";
import { PlayerInfo } from "@type/player.type";
import PlayerService from "@services/player.api";

export default function Player() {
  const playerService = new PlayerService();

  const graphRef = useRef<HTMLDivElement>(null);

  const [player, setPlayer] = useInput("");
  const [playersInfo, setPlayerInfo] = useState<PlayerInfo[]>([]);
  const [comparedThumb, setComparedThumb] = useThumb([]);

  const onChangePlayer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer(event);
  };

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = await playerService.getPlayersByName(player);

    setPlayerInfo(data === "" ? [] : data);
  };

  const handleClickBackground = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === graphRef.current) {
      setComparedThumb({});
    }
  };

  return (
    <div className={style.playerContainer}>
      {comparedThumb.length === 2 && (
        <div
          className={style.playerBackground}
          ref={graphRef}
          onClick={handleClickBackground}
        >
          <div className={style.comparedGraph}>
            <ComparedGraph
              player1={comparedThumb[0]}
              player2={comparedThumb[1]}
            />
          </div>
        </div>
      )}
      <form
        className={style.searchbar}
        onSubmit={async (e: React.SyntheticEvent) => submit(e)}
      >
        <input
          value={player}
          placeholder="선수이름"
          onChange={onChangePlayer}
          className={style.input}
        />
        <button className={style.button} type="submit">
          플레이정보 얻기
        </button>
      </form>
      <div className={style.players}>
        {playersInfo.map((player: PlayerInfo, i: number) => (
          <div key={i}>
            <PlayerThumb
              comparedThumb={comparedThumb}
              setComparedThumb={setComparedThumb}
              spid={player.id}
              name={player.name}
              classname={player.season.classname}
              seasonImg={player.season.seasonImg}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
