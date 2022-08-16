/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import useThumb from "@hooks/useThumb";
import style from "./rank.module.scss";
import Pagination from "@components/pagination/Pagination";
import ThumbService from "@services/playerThumb.api";
import useStats from "@hooks/useRank";
import { initialStatus, seleteOptions } from "@data/playerThumb.data";
import { useAppSelector } from "@store/index";
import PlayerInformation from "@components/player-information/PlayerInformation";
import RankService from "@services/rank.api";
import { useAppDispatch } from "@store/index";
import { resetSpidValue } from "@store/slices/spidSlice";

export default function Rank({ playerRanks, totalCount, count }: any) {
  const rankService = new RankService();
  const {
    value: { spid, name },
  } = useAppSelector(state => state.spid);
  const dispatch = useAppDispatch();

  const [comparedThumb, setComparedThumb] = useThumb([]);
  const [ranks, setRanks] = useState(playerRanks);
  const [status, setStatus] = useStats(initialStatus);
  const showPlayerGraph = async (position: number) => {
    const totalPlayerData = await rankService.getMyTotalRankByPo(
      spid,
      position
    );
    setStatus(totalPlayerData);
  };

  useEffect(() => {
    showPlayerGraph(50);
  }, [setStatus, spid]);

  useEffect(() => {
    return () => {
      dispatch(resetSpidValue());
    };
  }, []);

  return (
    <div className={style.rankContainer}>
      <PlayerInformation
        spid={spid}
        seleteOptions={seleteOptions}
        showPlayerGraph={showPlayerGraph}
        name={name}
        status={status}
        ranks={ranks}
        comparedThumb={comparedThumb}
        setComparedThumb={setComparedThumb}
      />
      <Pagination totalCount={totalCount} count={count} setRanks={setRanks} />
    </div>
  );
}
