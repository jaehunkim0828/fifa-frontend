import { useEffect, useState } from "react";
import style from "../styles/rank.module.scss";
import { postMethod } from "../services/http";
import { position } from "../position";
import date from "../helpers/date";
import { RankDetail, RankUserResultProps } from "@type/rankUserResult.type";

export default function RankUserResult({ spid, name }: RankUserResultProps) {
  const [detail, setDedetail] = useState<RankDetail[]>([]);

  useEffect(() => {
    const rankInfo = async () => {
      const data: { data: any[] } = await postMethod("rank", {
        matchtype: 50,
        spid,
      });
      data.data.forEach(async (e: any, i: number) => {
        try {
          const {
            spId,
            spPosition,
            createDate,
            status: {
              assist,
              block,
              dribble,
              dribbleSuccess,
              dribbleTry,
              effectiveShoot,
              goal,
              matchCount,
              passSuccess,
              passTry,
              shoot,
              tackle,
            },
          } = e;

          const playerRankResult = await postMethod("rank/potential", {
            spid: spId,
            position: spPosition,
            name,
            assist,
            block,
            dribble,
            dribbleSuccess,
            dribbleTry,
            effectiveShoot,
            goal,
            matchCount,
            passSuccess,
            passTry,
            shoot,
            tackle,
            createDate,
          });
          console.log(playerRankResult.data);
        } catch (e) {
          console.log(e);
        }
      });
      setDedetail(prev => {
        console.log(data.data);
        return [...prev, ...data.data];
      });
    };

    rankInfo();
  }, [spid]);

  return (
    <div className={style.rankContainer}>
      {detail.map((e: RankDetail, i: number) => (
        <div key={i}>
          <div className={style.name}>{position[e.spPosition]}</div>
          <div>경기 횟수 : {e.status.matchCount}</div>
          <div>평균 도움 : {e.status.assist}</div>
          <div>평균 블록킹 성공수 : {e.status.block}</div>
          <div>평균 드리블 거리 : {e.status.dribble}</div>
          <div>평균 드리블 성공수 : {e.status.dribbleSuccess}</div>
          <div>평균 드리블 시도수 : {e.status.dribbleTry}</div>
          <div>평균 요휴 슈팅 : {e.status.effectiveShoot}</div>
          <div>평균 골 : {e.status.goal}</div>
          <div>
            골 성공율 :{" "}
            {(
              (e.status.goal / (e.status.shoot === 0 ? 1 : e.status.shoot)) *
              100
            ).toFixed() + "%"}
          </div>
          <div>평균 패스 성공수 : {e.status.passSuccess}</div>
          <div>평균 패스 시도수 : {e.status.passTry}</div>
          <div>평균 슛 : {e.status.shoot}</div>
          <div>평균 태클 성공수 : {e.status.tackle}</div>
          <div>평균 생성일 : {date(e.createDate)}</div>
        </div>
      ))}
    </div>
  );
}
