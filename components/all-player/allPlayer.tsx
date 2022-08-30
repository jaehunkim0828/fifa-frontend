/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, memo } from "react";
import { useRouter } from "next/router";

import useInput from "@hooks/useInput";
import { useAppDispatch } from "@store/index";
import PlayerService from "@services/player.api";
import { PlayerInfo, PlayerProps } from "@type/player.type";
import style from "./allPlayer.module.scss";
import PlayerInformation from "@components/player-information/PlayerInformation";
import json from "@data/playerThumb.json";
import AllPlayerService from "@services/allPlayer.api";
import useStats from "@hooks/useRank";
import { useAppSelector } from "@store/index";
import { RootState } from "@store/index";
import Pagination from "@components/pagination/Pagination";
import { resetSpidValue, setSpidValue } from "@store/slices/spidSlice";
import { PlayerStatses } from "@type/playerThumb.type";
import SearchBar from "@components/search-bar/SearchBar";

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

  const { value: players } = useAppSelector((state: RootState) => state.spid);

  const [player, setPlayer] = useInput("");
  const [playersInfo, setPlayerInfo] = useState<PlayerInfo[]>([]);
  const [statuses, setStatuses] = useStats({});
  const [totalCount, setCount] = useState(0);

  const onChangePlayer = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    setPlayer(value);
  };

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!player.trim().length) {
      return;
    }

    if (current_page && count) {
      const data = await playerService.getPlayersByName(
        player,
        current_page,
        count
      );
      setPlayerInfo(data === "" ? [] : data);
    }

    setPlayer("");
    router.replace({
      pathname: `/search/${player}`,
    });
    dispatch(resetSpidValue());
  };

  const showPlayerGraph = async (position: number) => {
    const totalPlayerData: PlayerStatses = {};
    for (const player in players) {
      const status = await allPlayerService.getMyTotalRankByPo(
        player,
        position
      );
      totalPlayerData[player] = {
        name: players[player],
        status,
        seasonImg: status.seasonImg,
      };
    }
    setStatuses(totalPlayerData);
  };

  const getDefaultPlayer = async () => {
    if (playersInitial[0]?.name) {
      const { id, name } = playersInitial[0];
      dispatch(
        setSpidValue({
          spid: id,
          name,
        })
      );
    }
  };

  useEffect(() => {
    const getTotalCount = async () => {
      const data = await allPlayerService.totalPlayerCount(playerName ?? "");
      setCount(data);
    };

    getTotalCount();
    setPlayerInfo(playersInitial ?? []);
    getDefaultPlayer();
  }, [playersInitial]);

  useEffect(() => {
    showPlayerGraph(50);
  }, [players]);

  return (
    <div className={style.playerContainer}>
      <SearchBar
        player={player}
        setPlayer={setPlayer}
        onChangePlayer={onChangePlayer}
        submit={submit}
      />
      <PlayerInformation
        statses={statuses}
        seleteOptions={json.seleteOptions}
        showPlayerGraph={showPlayerGraph}
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
