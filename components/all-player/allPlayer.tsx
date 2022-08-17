/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, memo } from "react";
import { useRouter } from "next/router";

import useInput from "@hooks/useInput";
import { useAppDispatch } from "@store/index";
import PlayerService from "@services/player.api";
import { PlayerInfo, PlayerProps } from "@type/player.type";
import style from "./allPlayer.module.scss";
import ComparedGraph from "../compared-graph/ComparedGraph";
import PlayerInformation from "@components/player-information/PlayerInformation";
import { initialStatus, seleteOptions } from "@data/playerThumb.data";
import AllPlayerService from "@services/allPlayer.api";
import useStats from "@hooks/useRank";
import { useAppSelector } from "@store/index";
import { RootState } from "@store/index";
import Pagination from "@components/pagination/Pagination";
import { resetSpidValue } from "@store/slices/spidSlice";

export default memo(function AllPlayer({
  playersInitial,
  count,
  current_page,
}: PlayerProps) {
  const allPlayerService = new AllPlayerService();
  const playerService = new PlayerService();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const playerName = router.query.search as string | undefined;

  const graphRef = useRef<HTMLDivElement>(null);

  const {
    value: { spid, name },
  } = useAppSelector((state: RootState) => state.spid);

  const [player, setPlayer] = useInput("");
  const [playersInfo, setPlayerInfo] = useState<PlayerInfo[]>([]);
  const [status, setStatus] = useStats(initialStatus);
  const [totalCount, setCount] = useState(0);

  const onChangePlayer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer(event);
  };

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (current_page && count) {
      const data = await playerService.getPlayersByName(
        player,
        current_page,
        count
      );
      setPlayerInfo(data === "" ? [] : data);
    }

    router.push({
      pathname: `/search/${player}`,
    });
  };

  const showPlayerGraph = async (position: number) => {
    const totalPlayerData = await allPlayerService.getMyTotalRankByPo(
      spid,
      position
    );
    setStatus(totalPlayerData);
  };

  useEffect(() => {
    const getTotalCount = async () => {
      const data = await allPlayerService.totalPlayerCount(playerName ?? "");
      setCount(data);
    };

    getTotalCount();
    setPlayerInfo(playersInitial ?? []);
    return () => {
      dispatch(resetSpidValue());
    };
  }, [playersInitial]);

  useEffect(() => {
    showPlayerGraph(50);
  }, [spid]);

  return (
    <div className={style.playerContainer}>
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
          검색
        </button>
      </form>
      <PlayerInformation
        spid={spid}
        seleteOptions={seleteOptions}
        showPlayerGraph={showPlayerGraph}
        name={name}
        status={status}
        ranks={playersInfo}
      />
      {count && (
        <Pagination
          totalCount={totalCount}
          count={count}
          setRanks={setPlayerInfo}
          player={playerName}
        />
      )}
    </div>
  );
});
