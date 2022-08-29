/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import useThumb from "@hooks/useThumb";
import style from "./rank.module.scss";
import Pagination from "@components/pagination/Pagination";
import ThumbService from "@services/playerThumb.api";
import useStats from "@hooks/useRank";
import json from "@data/playerThumb.json";
import { useAppSelector } from "@store/index";
import PlayerInformation from "@components/player-information/PlayerInformation";
import RankService from "@services/rank.api";
import { useAppDispatch } from "@store/index";
import { resetSpidValue, setSpidValue } from "@store/slices/spidSlice";
import { PlayerStatses } from "@type/playerThumb.type";

export default function Rank({ playerRanks, totalCount, count }: any) {
  const rankService = new RankService();
  const { value: players } = useAppSelector(state => state.spid);
  const dispatch = useAppDispatch();

  const [ranks, setRanks] = useState(playerRanks);
  const [statuses, setStatuses] = useStats({});
  const showPlayerGraph = async (position: number) => {
    const totalPlayerData: PlayerStatses = {};
    for (const player in players) {
      const status = await rankService.getMyTotalRankByPo(player, position);
      totalPlayerData[player] = { name: players[player], status };
    }
    setStatuses(totalPlayerData);
  };

  const getDefaultPlayer = async () => {
    const { id, name } = playerRanks[0];
    dispatch(
      setSpidValue({
        spid: id,
        name,
      })
    );
  };

  useEffect(() => {
    getDefaultPlayer();
    return () => {
      dispatch(resetSpidValue());
    };
  }, [playerRanks]);

  useEffect(() => {
    showPlayerGraph(50);
  }, [players]);

  return (
    <div className={style.rankContainer}>
      <PlayerInformation
        statses={statuses}
        seleteOptions={json.seleteOptions}
        showPlayerGraph={showPlayerGraph}
        ranks={ranks}
      />
      <Pagination totalCount={totalCount} count={count} setRanks={setRanks} />
    </div>
  );
}
