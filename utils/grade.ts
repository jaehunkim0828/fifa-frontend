import { Grade } from "@components/table/table.type";
import { Stats } from "@type/rank.type";

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
      if (score >= cost) return Math.round(cost * 2);
      else if (score <= -cost) return 0;
      else return Math.round(score + cost);
    };

    switch (type) {
      case StatsType.dribble:
        const dribble = Math.round(stats[type] - average[type]) / 2;
        //8
        return getScore(dribble, 8);
      case StatsType.dribbleSuccess:
        const dribbleSuccess = Math.round(
          +(stats[type] - average[type]).toFixed(2) * 10
        );
        //8
        return getScore(dribbleSuccess, 8);
      case StatsType.dribbleTry:
        const dribbleTry = Math.round(
          +(stats[type] - average[type]).toFixed(2) * 10
        );
        //8
        return getScore(dribbleTry, 8);
      case StatsType.passSuccess:
        const passSuccess = Math.round(
          +(stats[type] - average[type]).toFixed(2) * 10
        );
        //9
        return getScore(passSuccess, 9);
      case StatsType.passTry:
        const passTry = Math.round(
          +(stats[type] - average[type]).toFixed(2) * 10
        );
        //9
        return getScore(passTry, 9);
      case StatsType.assist:
        //8
        const assist = Math.round(
          +(stats[type] - average[type]).toFixed(2) * 200
        );
        return getScore(assist, 8);
      case StatsType.block:
        // 20
        const block = (stats[type] - average[type]) * 100;
        return getScore(block, 20);
      case StatsType.tackle:
        //30
        const tackle = (stats[type] - average[type]) * 50;
        return getScore(tackle, 30);
      case StatsType.shoot:
        //10
        const shoot = Math.round(
          +(stats[type] - average[type]).toFixed(2) * 25
        );
        return getScore(shoot, 10);
      case StatsType.effectiveShoot:
        //17.5
        const effective = Math.round(
          +(stats[type] - average[type]).toFixed(2) * 50
        );
        return getScore(effective, 17.5);
      default:
        // goal
        // 22.5
        const rest = Math.round(+(stats[type] - average[type]).toFixed(2) * 75);
        return getScore(rest, 22.5);
    }
  };

  const getGrade = (score: number) => {
    switch (true) {
      case score >= 0 && score < 20:
        return Grade.F;
      case score >= 20 && score < 40:
        return Grade.D;
      case score >= 40 && score < 60:
        return Grade.C;
      case score >= 60 && score < 80:
        return Grade.B;
      case score >= 80 && score <= 100:
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

  return {
    attack: { score: attack, grade: getGrade(attack) },
    assist: { score: assist, grade: getGrade(assist) },
    defense: { score: defense, grade: getGrade(defense) },
  };
};
