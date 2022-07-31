import { useState } from "react";

import useThumb from "@hooks/useThumb";
import style from "./rank.module.scss";
import PlayerThumb from "@components/playerThumb/PlayerThumb";
import Pagination from "@components/pagination/Pagination";
import { PlayerRank } from "@type/Home.type";

export default function Rank({ playerRanks, totalCount, count }: any) {
  const [comparedThumb, setComparedThumb] = useThumb([]);
  const [ranks, setRanks] = useState(playerRanks);

  return (
    <div className={style.rankContainer}>
      <div className={style.playerRanks}>
        {ranks.map(
          (
            { id, name, season: { className, seasonImg } }: PlayerRank,
            i: number
          ) => {
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
      <Pagination totalCount={totalCount} count={count} setRanks={setRanks} />
    </div>
  );
}
