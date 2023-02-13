import Graph from "@components/graph/Graph";
import { SinglePlayerProps } from "@components/single-player/singlePlayer.type";
import { useEffect, useState } from "react";
import style from "./singlePlayer.module.scss";
import { frontUrl } from "@services/http";
import Table from "@components/table/Table";
import { PositionStatus } from "@components/player-thumb/playerThumb.type";
import { publicImage } from "@helpers/image";
import { Grade } from "@components/table/table.type";
import PlayerService from "@services/player.api";
import RankService from "@services/rank.api";
import { calculatePower } from "../../utils/grade";
import { PlayerStats } from "@type/player.type";
import { Stats } from "@type/rank.type";
import { PositionMainPart } from "@type/position.type";
import json from "@data/average.json";

export default function SinglePlayer(props: SinglePlayerProps) {
  const { name, part, spid, desc } = props;

  const [playerStats, setPlayerStats] = useState<PlayerStats>({});
  const [image, setImage] = useState(`${frontUrl}/images/nonperson.png`);
  const [power, setPower] = useState({
    attack: { score: 0, grade: Grade.C },
    assist: { score: 0, grade: Grade.C },
    defense: { score: 0, grade: Grade.C },
  });

  const makePlayerStats = (
    name: string,
    stats: Stats,
    average: Stats,
    part: PositionMainPart
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
    const playerService = new PlayerService();
    const rankService = new RankService();

    const createRank = async (spid: string, name: string) => {
      await rankService.create(spid, name);
    };

    const getPlayerImage = async (spid: string) => {
      await createRank(spid, name);
      const result = await playerService.getPlayerImageUrl(spid);
      const stats = await rankService.getMyTotalRankByPo(
        spid,
        PositionStatus.TOTAL
      );
      const average = json.avg[part];
      setPlayerStats(makePlayerStats(name, stats, average, part));
      setPower(calculatePower(stats, average));

      setImage(prev => {
        if (!result) return prev;
        return result;
      });
    };

    getPlayerImage(spid);
  }, [name, part, spid]);

  return (
    <div className={style.singlePlayerContainer}>
      <div className={style.singlePlayerWapper}>
        <h1>
          <strong>{`"${name}"`}</strong>
          <span> 선수의 상세정보</span>
        </h1>
        <div className={style.contents}>
          <Table
            name={name}
            desc={desc}
            image={image}
            seasonImg={playerStats[name]?.seasonImg}
            power={power}
            spid={spid}
          />
          <div className={style.graphContainer}>
            <Graph
              stats={playerStats}
              seasonImg={playerStats[name]?.seasonImg}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
