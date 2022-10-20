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
  Stats,
} from "@type/playerThumb.type";
import SearchBar from "@components/search-bar/SearchBar";
import PositionService from "@services/position.api";
import RankService from "@services/rank.api";
import { position } from "position";

export default memo(function AllPlayer({
  playersInitial,
  count,
  current_page,
  average,
  search: { name, season, position },
}: PlayerProps) {
  const playerService = new PlayerService();
  const rankService = new RankService();

  const initialMore = {
    season: [],
    position: [],
  };

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { value: players } = useAppSelector((state: RootState) => state.spid);

  const [player, setPlayer] = useInput({ player: "" });
  const [playersInfo, setPlayerInfo] = useState<PlayerInfo[]>([]);
  const [stats, setStats] = useStats({});
  const [totalCount, setCount] = useState(0);
  const [dLoading, setdLoading] = useState(false);
  const [more, setMore] = useState<{ [x in string]: number[] }>(initialMore);
  const [open, setOpen] = useState(false);

  const onChangePlayer = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    setPlayer("player", value);
  };

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const m: { season?: string; name?: string; position?: string } = {};
    if (player.player) m.name = player.player;
    if (more.season.length) m.season = more.season.join(",");
    if (more.position.length) m.position = more.position.join(",");

    if (current_page && count) {
      const data = await playerService.getPlayers(
        { player: name, season: season, position: position },
        current_page,
        count
      );
      setPlayerInfo(data === "" ? [] : data);
    }

    setPlayer("player", "");
    router.replace({
      pathname: `/search`,
      query: m,
    });
    setMore(initialMore);
    dispatch(resetSpidValue());
  };

  const showPlayerGraph = async (position: number) => {
    const totalPlayerData: PlayerStats = {};
    for (const player in players) {
      const status = await rankService.getMyTotalRankByPo(player, position);
      totalPlayerData[player] = {
        name: players[player].name,
        status,
        seasonImg: status.seasonImg,
      };
    }
    setStats(totalPlayerData);
  };

  const getDefaultPlayer = async (id: string, name: string) => {
    const stats: Stats = await rankService.getMyTotalRankByPo(
      id,
      PositionStatus.TOTAL
    );
    if (name) {
      await rankService.create(id, name);
      dispatch(
        setSpidValue({
          spid: id,
          name,
          stats,
        })
      );
    }
  };

  useEffect(() => {
    const getTotalCount = async () => {
      const data = await playerService.totalPlayerCount({
        name,
        season,
        position,
      });
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
          onChangePlayer={onChangePlayer}
          submit={submit}
          more={more}
          setMore={setMore}
          open={open}
        />
        <PlayerInformation
          stats={stats}
          showPlayerGraph={showPlayerGraph}
          ranks={playersInfo}
          average={average}
          setdLoading={setdLoading}
          totalCount={totalCount}
          count={count}
          setRanks={setPlayerInfo}
          search={{ name, season, position }}
          detail={{ open, setOpen }}
        />
      </div>
      {dLoading && (
        <div className={style.dLoading}>
          <CircularProgress color="success" />
        </div>
      )}
    </div>
  );
});
