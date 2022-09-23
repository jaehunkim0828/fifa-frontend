import Graph from "@components/graph/Graph";
import { SinglePlayerProps } from "@type/singlePlayer.type";
import { useEffect, useState } from "react";
import style from "./singlePlayer.module.scss";
import { frontUrl } from "@services/http";
import Table from "@components/table/Table";
import {
  PlayerStats,
  PositionPart,
  PositionStatus,
  Stats,
} from "@type/playerThumb.type";
import { publicImage } from "@helpers/image";
import { Grade } from "@type/table.type";
import PlayerService from "@services/player.api";
import RankService from "@services/rank.api";
import PositionService from "@services/position.api";
import ValueService from "@services/value.api";

enum StatsType {
  assist = "assist",
  shoot = "shoot",
  effectiveShoot = "effectiveShoot",
  goal = "goal",
  dribble = "dribble",
  dribbleSuccess = "dribbleSuccess",
  dribbleTry = "dribbleTry",
  passSuccess = "passSuccess",
  passTry = "passTry",
  tackle = "tackle",
  block = "block",
}

export default function SinglePlayer(props: SinglePlayerProps) {
  const { name, part, spid, desc } = props;

  const [isImgLoding, setImgLogin] = useState(false);
  const [playerStats, setPlayerStats] = useState<PlayerStats>({});
  const [image, setImage] = useState(`${frontUrl}/images/nonperson.png`);
  const [power, setPower] = useState({
    attack: { score: 0, grade: Grade.C },
    assist: { score: 0, grade: Grade.C },
    defense: { score: 0, grade: Grade.C },
  });

  const calculatePower = (stats: Stats, average: Stats) => {
    // 공격: 슛시도, 유효슛, 골
    // 미드: 드리블 거리, 드리블 성공, 패스, 패스시도, 도움
    // 수비: 태클, 블락
    const compareStats = (arg: {
      stats: Stats;
      average: Stats;
      type: StatsType;
    }) => {
      const { stats, average, type } = arg;

      const getScore = (score: number, cost: number) => {
        if (score >= cost) return cost;
        else if (score <= -cost) return -cost;
        else return score;
      };

      switch (type) {
        case StatsType.dribble:
          const dribble = Math.round(
            Math.round(stats[type] - average[type]) / 5
          );
          return getScore(dribble, 2);
        case StatsType.dribbleSuccess:
          const dribbleSuccess = Math.round(
            Math.round(stats[type] - average[type]) * 10
          );
          return getScore(dribbleSuccess, 2);
        case StatsType.dribbleTry:
          const dribbleTry = Math.round(
            Math.round(stats[type] - average[type]) * 10
          );
          return getScore(dribbleTry, 2);
        case StatsType.passSuccess:
          const passSuccess = Math.round(
            Math.round(stats[type] - average[type]) * 10
          );
          return getScore(passSuccess, 2);
        case StatsType.passTry:
          const passTry = Math.round(
            Math.round(stats[type] - average[type]) * 10
          );
          return getScore(passTry, 2);
        case StatsType.assist:
          const assist = Math.round(
            Math.round(stats[type] - average[type]) * 10
          );
          return getScore(assist, 2);
        case StatsType.block:
          const block = Math.round((stats[type] - average[type]) * 100);
          return getScore(block, 4);
        case StatsType.tackle:
          const tackle = Math.round((stats[type] - average[type]) * 20);
          return getScore(tackle, 8);
        default:
          const rest = Math.round((stats[type] - average[type]) * 10);
          return getScore(rest, 4);
      }
    };

    const getGrade = (score: number) => {
      switch (true) {
        case score >= -12 && score < -8:
          return Grade.F;
        case score >= -8 && score < -4:
          return Grade.E;
        case score >= -4 && score < 0:
          return Grade.D;
        case score >= 0 && score < 4:
          return Grade.C;
        case score >= 4 && score < 8:
          return Grade.B;
        case score >= 8 && score <= 12:
          return Grade.A;
        default:
          return Grade.W;
      }
    };

    let attack =
      compareStats({ stats, average, type: StatsType.shoot }) +
      compareStats({ stats, average, type: StatsType.effectiveShoot }) +
      compareStats({ stats, average, type: StatsType.goal });
    let assist =
      compareStats({ stats, average, type: StatsType.dribble }) +
      compareStats({ stats, average, type: StatsType.dribbleSuccess }) +
      compareStats({ stats, average, type: StatsType.dribbleTry }) +
      compareStats({ stats, average, type: StatsType.passSuccess }) +
      compareStats({ stats, average, type: StatsType.passTry }) +
      compareStats({ stats, average, type: StatsType.assist });

    let defense =
      compareStats({ stats, average, type: StatsType.tackle }) +
      compareStats({ stats, average, type: StatsType.block });
    setPower({
      attack: { score: attack, grade: getGrade(attack) },
      assist: { score: assist, grade: getGrade(assist) },
      defense: { score: defense, grade: getGrade(defense) },
    });
  };

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
    const playerService = new PlayerService();
    const rankService = new RankService();
    const positionService = new PositionService();

    const createRank = async (spid: string, name: string) => {
      await rankService.create(spid, name);
    };

    const getPlayerImage = async (spid: string) => {
      await createRank(spid, name);
      setImgLogin(true);
      const result = await playerService.getPlayerImageUrl(spid);
      const stats = await rankService.getMyTotalRankByPo(
        spid,
        PositionStatus.TOTAL
      );
      const average = await positionService.getAveragestats(part);
      setPlayerStats(makePlayerStats(name, stats, average, part));
      calculatePower(stats, average);

      setImgLogin(false);
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
        <div className={style.intro}>
          <Table
            name={name}
            desc={desc}
            image={image}
            seasonImg={playerStats[name]?.seasonImg}
            power={power}
            spid={spid}
          />
        </div>
        <div className={style.graphContainer}>
          <Graph stats={playerStats} seasonImg={playerStats[name]?.seasonImg} />
        </div>
      </div>
    </div>
  );
}
