import Image from "next/image";

import Graph from "@components/graph/Graph";
import { SinglePlayerProps } from "@type/singlePlayer.type";
import { useEffect, useState } from "react";
import style from "./singlePlayer.module.scss";
import SinglePlayerService from "@services/singlePlayer.api";
import { CircularProgress } from "@mui/material";
import { frontUrl } from "@services/http";
import Table from "@components/table/Table";
import {
  PlayerStats,
  PositionPart,
  PositionStatus,
  Stats,
} from "@type/playerThumb.type";
import { publicImage } from "@helpers/image";

export default function SinglePlayer(props: SinglePlayerProps) {
  const { name, part, spid, desc } = props;

  const [isImgLoding, setImgLogin] = useState(false);
  const [playerStats, setPlayerStats] = useState<PlayerStats>({});
  const [image, setImage] = useState(`${frontUrl}/images/nonperson.png`);

  const makePlayerStats = (
    name: string,
    stats: Stats,
    average: Stats,
    part: PositionPart
  ): PlayerStats => ({
    [name]: {
      status: stats,
      name: name,
      seasonImg: stats.seasonImg ?? "none",
    },
    [part]: {
      status: average,
      name: "평균",
      seasonImg: publicImage(part),
    },
  });

  useEffect(() => {
    const singlePlayerService = new SinglePlayerService();

    const getPlayerImage = async (spid: string) => {
      setImgLogin(true);
      const result = await singlePlayerService.getPlayerImageUrl(spid);
      const stats = await singlePlayerService.getMyTotalRankByPo(
        spid,
        PositionStatus.TOTAL
      );
      const average = await singlePlayerService.getAveragestats(part);
      setPlayerStats(makePlayerStats(name, stats, average, part));

      setImgLogin(false);
      setImage(result);
    };

    getPlayerImage(spid);
  }, [name, part, spid]);

  return (
    <div className={style.singlePlayerContainer}>
      <div className={style.singlePlayerWapper}>
        <div className={style.intro}>
          <Table
            name={name}
            part={part}
            desc={desc}
            isImgLoding={isImgLoding}
            image={image}
            seasonImg={playerStats[name]?.seasonImg}
          />
        </div>
        <div className={style.graphContainer}>
          <Graph stats={playerStats} />
        </div>
      </div>
    </div>
  );
}
