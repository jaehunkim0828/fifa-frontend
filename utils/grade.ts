import { Stats } from "@type/playerThumb.type";
import { Grade } from "@type/table.type";

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

export const calculatePower = (stats: Stats, average: Stats) => {
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
        const dribble = Math.round(Math.round(stats[type] - average[type]) / 5);
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
        const assist = Math.round(Math.round(stats[type] - average[type]) * 10);
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
      case score >= 0 && score < 4:
        return Grade.F;
      case score >= 4 && score < 8:
        return Grade.E;
      case score >= 8 && score < 12:
        return Grade.D;
      case score >= 12 && score < 16:
        return Grade.C;
      case score >= 16 && score < 20:
        return Grade.B;
      case score >= 20 && score <= 24:
        return Grade.A;
      default:
        return Grade.W;
    }
  };

  let attack =
    compareStats({ stats, average, type: StatsType.shoot }) +
    compareStats({ stats, average, type: StatsType.effectiveShoot }) +
    compareStats({ stats, average, type: StatsType.goal }) +
    12;
  let assist =
    compareStats({ stats, average, type: StatsType.dribble }) +
    compareStats({ stats, average, type: StatsType.dribbleSuccess }) +
    compareStats({ stats, average, type: StatsType.dribbleTry }) +
    compareStats({ stats, average, type: StatsType.passSuccess }) +
    compareStats({ stats, average, type: StatsType.passTry }) +
    compareStats({ stats, average, type: StatsType.assist }) +
    12;

  let defense =
    compareStats({ stats, average, type: StatsType.tackle }) +
    compareStats({ stats, average, type: StatsType.block }) +
    12;
  return {
    attack: { score: attack, grade: getGrade(attack) },
    assist: { score: assist, grade: getGrade(assist) },
    defense: { score: defense, grade: getGrade(defense) },
  };
};
