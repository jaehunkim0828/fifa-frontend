/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, memo } from "react";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";

import useInput from "@hooks/useInput";
import { useAppDispatch } from "@store/index";
import { PlayerInfo, PlayerProps } from "@type/player.type";
import style from "./allPlayer.module.scss";
import PlayerInformation from "@components/player-information/PlayerInformation";
import PlayerService from "@services/player.api";
import useStats from "@hooks/useRank";
import { useAppSelector } from "@store/index";
import { RootState } from "@store/index";
import Pagination from "@components/pagination/Pagination";
import { resetSpidValue, setSpidValue } from "@store/slices/spidSlice";
import {
  PlayerStats,
  PositionPart,
  PositionStatus,
} from "@type/playerThumb.type";
import SearchBar from "@components/search-bar/SearchBar";
import PositionService from "@services/position.api";
import RankService from "@services/rank.api";

export default memo(function AllPlayer({
  playersInitial,
  count,
  current_page,
  average,
  name,
}: PlayerProps) {
  const playerService = new PlayerService();
  const rankService = new RankService();

  const router = useRouter();
  const dispatch = useAppDispatch();

  const playerName = router.query.search as string | undefined;

  const { value: players } = useAppSelector((state: RootState) => state.spid);

  const [player, setPlayer] = useInput({ player: "" });
  const [playersInfo, setPlayerInfo] = useState<PlayerInfo[]>([]);
  const [stats, setStats] = useStats({});
  const [totalCount, setCount] = useState(0);
  const [dLoading, setdLoading] = useState(false);

  const onChangePlayer = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    setPlayer("player", value);
  };

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!player.player.trim().length) {
      return;
    }

    if (current_page && count) {
      const data = await playerService.getPlayersByName(
        player["player"],
        current_page,
        count
      );
      setPlayerInfo(data === "" ? [] : data);
    }

    setPlayer("player", "");
    router.replace({
      pathname: `/search/${player.player}`,
    });
    dispatch(resetSpidValue());
  };

  const showPlayerGraph = async (position: number) => {
    const totalPlayerData: PlayerStats = {};
    for (const player in players) {
      const status = await rankService.getMyTotalRankByPo(player, position);
      totalPlayerData[player] = {
        name: players[player],
        status,
        seasonImg: status.seasonImg,
      };
    }
    setStats(totalPlayerData);
  };

  const getDefaultPlayer = async (id: string, name: string) => {
    if (name) {
      await rankService.create(id, name);
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
      const data = await playerService.totalPlayerCount(playerName ?? "");
      setCount(data);
    };

    getTotalCount();
    setPlayerInfo(playersInitial ?? []);
    getDefaultPlayer(playersInitial[0]?.id, playersInitial[0]?.name);
  }, [playersInitial]);

  useEffect(() => {
    showPlayerGraph(PositionStatus.TOTAL);
  }, [players]);

  return (
    <div className={style.playerContainer}>
      <div
        className={style.playerWrapper}
        style={dLoading ? { opacity: "0.4", filter: "alpha(opacity=40)" } : {}}
      >
        <SearchBar
          player={player.player}
          setPlayer={setPlayer}
          onChangePlayer={onChangePlayer}
          submit={submit}
        />
        <PlayerInformation
          stats={stats}
          showPlayerGraph={showPlayerGraph}
          ranks={playersInfo}
          average={average}
          setdLoading={setdLoading}
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
      {dLoading && (
        <div className={style.dLoading}>
          <CircularProgress color="success" />
        </div>
      )}
    </div>
  );
});
