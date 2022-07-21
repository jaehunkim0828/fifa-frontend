import { useState } from "react";

import useThumb from "@hooks/useThumb";
import style from "./rank.module.scss";
import PlayerThumb from "@components/playerThumb/PlayerThumb";
import Pagination from "@components/pagination/Pagination";
import RankService from "@services/rank.api";
import { PlayerRank } from "@type/Home.type";

export default function Rank({ playerRanks, totalCount, count }: any) {
  const rankService = new RankService();

  const [comparedThumb, setComparedThumb] = useThumb([]);
  const [ranks, setRanks] = useState<PlayerRank[]>(playerRanks);

  const getCurrentPage = async (cur_page: number) => {
    let c = count;
    const ranksData: PlayerRank[] = await rankService.getCurrentPage(
      cur_page,
      c
    );
    setRanks(ranksData);
  };

  return (
    <div className={style.rankContainer}>
      <div className={style.playerRanks}>
        {ranks.map(
          ({ id, name, season: { className, seasonImg } }: PlayerRank, i) => {
            return (
              <PlayerThumb
                key={i}
                spid={id}
                comparedThumb={comparedThumb}
                setComparedThumb={setComparedThumb}
                name={name}
                seasonImg={seasonImg}
                classname={className}
              />
            );
          }
        )}
      </div>
      <Pagination
        totalCount={totalCount}
        count={count}
        getCurrentPage={getCurrentPage}
      />
    </div>
  );
}
