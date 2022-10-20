import Image from "next/image";

import PlayerService from "@services/player.api";
import RankService from "@services/rank.api";
import { PositionStatus, Stats } from "@type/playerThumb.type";
import { useEffect, useState } from "react";
import { RootState, useAppSelector } from "@store/index";
import { calculatePower } from "@utils/grade";
import PlayerCard from "@components/player-card/PlayerCard";
import { PlayerCardStatus } from "@type/playerCard";
import style from "./ratingPlayer.module.scss";
import One from "@public/images/one.png";
import Two from "@public/images/two.png";
import Three from "@public/images/three.png";
import { CircularProgress } from "@mui/material";
import None from "@public/images/nonperson.png";
import { useResize } from "@hooks/useResize";

interface RatingTable extends PlayerCardStatus {
  assist: { score: number; best: boolean };
  attack: { score: number; best: boolean };
  defense: { score: number; best: boolean };
  matchCount: string;
}

interface RatingProps {
  average: { striker: Stats; midfielder: Stats; defender: Stats };
  loading: boolean;
  setLoading: (v: boolean) => void;
  setOpen: (v: boolean) => void;
}

export default function RatingPlayer({
  average,
  loading,
  setOpen,
  setLoading,
}: RatingProps) {
  const { value: players } = useAppSelector((state: RootState) => state.spid);

  const regex = /[a-zA-Z]/;
  const [ps, setPs] = useState<RatingTable[]>([]);
  const [secIndex, setSecIndex] = useState(0);
  const [nowAvg, setNowAvg] = useState(average.striker);
  const [pl, setP] = useState<any>({});

  const window = useResize();

  const order = [One, Two, Three];

  const sections: {
    name: string;
    label: "striker" | "midfielder" | "defender";
  }[] = [
    {
      name: window.nowWidth > 650 ? "공격수 기준" : "공격수",
      label: "striker",
    },
    {
      name: window.nowWidth > 650 ? "미드필더 기준" : "미드필더",
      label: "midfielder",
    },
    {
      name: window.nowWidth > 650 ? "수비수 기준" : "수비수",
      label: "defender",
    },
  ];

  useEffect(() => {
    setLoading(true);
    if (!Object.keys(players).length) return;

    const playerService = new PlayerService();

    const getPlayers = async (
      players: { [spid: string]: { name: string; stats: Stats } },
      average: Stats,
      section?: string
    ) => {
      setPs([]);
      const powers = [];
      for (const spid in players) {
        powers.push({
          ...calculatePower(players[spid].stats, average),
          spid,
          name: players[spid].name,
          matchCount: players[spid].stats.matchCount,
        });
      }

      // sorting
      function sortingPlayer(powers: any[], p: string = "attack") {
        return powers.sort((a, b) => {
          //총합 비교
          let prev: number = a.assist.score + a.attack.score + a.defense.score;
          let cur: number = b.assist.score + b.attack.score + b.defense.score;
          if (cur === prev) {
            //특정 스탯 순위
            return b[p].score - a[p].score;
          }
          return cur - prev;
        });
      }

      sortingPlayer(powers, section);

      function getBestScore(powers: any[], kind: string) {
        const item = powers
          .map(power => power[kind].score)
          .reduce((prev, cur: number, index, arr) => {
            return prev < cur ? cur : prev;
          });
        return powers.map(e => e[kind].score).indexOf(item);
      }

      let atB = getBestScore(powers, "attack");
      let asB = getBestScore(powers, "assist");
      let deB = getBestScore(powers, "defense");

      for (let i = 0; i < powers.length; i += 1) {
        const playerStandard = await playerService.getPlayerByCr(
          powers[i].spid
        );

        const { name, matchCount, attack, assist, defense } = powers[i];
        playerStandard.name = name;
        playerStandard.matchCount = matchCount;
        playerStandard.attack = {
          score: attack.score,
          best: i === atB ? true : false,
        };
        playerStandard.assist = {
          score: assist.score,
          best: i === asB ? true : false,
        };
        playerStandard.defense = {
          score: defense.score,
          best: i === deB ? true : false,
        };

        setPs(prev => [...prev, playerStandard]);
      }
      setLoading(false);
    };

    getPlayers(players, nowAvg);
  }, [players, average, nowAvg, setLoading]);

  return (
    <div className={style.rating}>
      {!loading ? (
        <>
          <div className={style.row1}>
            <div className={style.section}>
              {sections.map((section, i: number) => (
                <button
                  style={
                    i === secIndex
                      ? {
                          borderBottom: "2px solid black",
                          fontWeight: "bold",
                          color: "black",
                        }
                      : {}
                  }
                  key={`기준: ${i}`}
                  onClick={() => {
                    setNowAvg(average[`${section.label}`]);
                    setSecIndex(i);
                  }}
                >
                  {section.name}
                </button>
              ))}
            </div>
            <button className={style.detail} onClick={() => setOpen(true)}>
              {window.nowWidth > 650 ? "상세 차트 분석" : "상세 분석"}
            </button>
          </div>
          <div className={style.first}>
            <span>총합 1등 지표: </span>
            <Image
              src={ps[0]?.seasonImg ?? None}
              width="30px"
              height="15px"
              objectFit="contain"
              layout="fixed"
              alt="1등 시즌 이미지"
            />
            <h1>{ps[0]?.name}</h1>
          </div>
          <div className={style.players}>
            {ps.map(
              (
                {
                  border,
                  ovr,
                  position,
                  image,
                  nation,
                  seasonImg,
                  name,
                  pay,
                  matchCount,
                }: RatingTable,
                i
              ) => (
                <div className={style.player} key={`player_card: ${i}`}>
                  <PlayerCard
                    unit={{
                      border,
                      ovr,
                      position,
                      image,
                      nation,
                      seasonImg,
                      name,
                      pay,
                    }}
                  />
                  <br />
                  <Image
                    src={order[i]}
                    alt="선수비교 순위"
                    width="30px"
                    height="30px"
                    layout="fixed"
                  />
                  <br />
                  <div
                    className={style.matchCount}
                  >{`(${matchCount}경기 데이터)`}</div>
                </div>
              )
            )}
          </div>

          <table className={style.table}>
            <thead>
              <tr>
                <th>선수 정보</th>
                <th>{window.nowWidth > 650 ? "공격지수" : "공격"}</th>
                <th>{window.nowWidth > 650 ? "도움지수" : "도움"}</th>
                <th>{window.nowWidth > 650 ? "수비지수" : "수비"}</th>
              </tr>
            </thead>
            <tbody>
              {ps.map(
                (
                  { name, attack, assist, defense, seasonImg }: RatingTable,
                  i: number
                ) => (
                  <tr key={i}>
                    <td>
                      <span className={style.seasonImage}>
                        <Image
                          src={seasonImg}
                          alt="시즌 이미지"
                          width="15px"
                          height="12px"
                        />
                      </span>
                      {window.nowWidth <= 650
                        ? regex.test(name.split(" ")[0])
                          ? name.split(" ")[1]
                          : name.split(" ")[0]
                        : name}
                    </td>
                    <td
                      style={
                        attack.best
                          ? { color: "#FF1E1E", fontWeight: "bold" }
                          : {}
                      }
                    >{`${attack.score}점`}</td>
                    <td
                      style={
                        assist.best
                          ? { color: "#FF1E1E", fontWeight: "bold" }
                          : {}
                      }
                    >{`${assist.score}점`}</td>
                    <td
                      style={
                        defense.best
                          ? { color: "#FF1E1E", fontWeight: "bold" }
                          : {}
                      }
                    >{`${defense.score}점`}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
