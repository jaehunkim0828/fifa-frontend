/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, memo } from "react";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";

import useInput from "@hooks/useInput";
import { useAppDispatch } from "@store/index";
import { PlayerInfo, PlayerStats } from "@type/player.type";
import style from "./allPlayer.module.scss";
import PlayerInformation from "@components/player-information/PlayerInformation";
import PlayerService from "@services/player.api";
import useStats from "@hooks/useRank";
import { useAppSelector } from "@store/index";
import { RootState } from "@store/index";
import { resetSpidValue, spidRequest } from "@store/slices/spidSlice";
import { PositionStatus } from "@components/player-thumb/playerThumb.type";
import SearchBar from "@components/search-bar/SearchBar";
import RankService from "@services/rank.api";
import { PlayerProps } from "./allPlayer.type";
import { Stats } from "@type/rank.type";
import { More } from "@components/search-bar/searchBar.type";
import CardService from "@services/card.api";
import { Card } from "@type/card.type";
import useMore, { initialMore } from "@hooks/useMore";

export default memo(function AllPlayer({
  playersInitial,
  count,
  current_page,
  average,
  search: { name, season, position, nation, team },
}: PlayerProps) {
  const playerService = new PlayerService();
  const rankService = new RankService();
  const cardService = new CardService();

  const dispatch = useAppDispatch();

  const { value: players } = useAppSelector((state: RootState) => state.spid);

  const [playersInfo, setPlayerInfo] = useState<PlayerInfo[]>([]);
  const [stats, setStats] = useStats({});
  const [totalCount, setCount] = useState(0);
  const [dLoading, setdLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showPlayerGraph = async (position: PositionStatus) => {
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
    await rankService.create(id, name);
    const card: Card = await cardService.findCard(id);
    if (name) {
      const stats: Stats = await rankService.getMyTotalRankByPo(
        id,
        PositionStatus.TOTAL
      );
      dispatch(
        spidRequest({
          spid: id,
          name,
          stats,
          card,
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
        nation,
        team,
      });
      setCount(data);
    };
    getTotalCount();
    setPlayerInfo(playersInitial ?? []);
    getDefaultPlayer(playersInitial[0]?.id, playersInitial[0]?.name);
  }, [playersInitial]);

  useEffect(() => {
    showPlayerGraph(PositionStatus.TOTAL);
  }, [Object.keys(players).length]);

  return (
    <div className={style.playerContainer}>
      <div
        className={style.playerWrapper}
        style={dLoading ? { opacity: "0.4", filter: "alpha(opacity=40)" } : {}}
      >
        <SearchBar open={open} />
        <PlayerInformation
          stats={stats}
          showPlayerGraph={showPlayerGraph}
          ranks={playersInfo}
          average={average}
          setdLoading={setdLoading}
          totalCount={totalCount}
          count={count}
          setRanks={setPlayerInfo}
          search={{ name, season, position, nation, team }}
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
