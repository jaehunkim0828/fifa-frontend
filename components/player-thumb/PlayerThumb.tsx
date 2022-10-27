/* eslint-disable @next/next/no-img-element */
import { memo, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { useAppSelector } from "@store/index";
import { useAppDispatch } from "@store/index";
import { resetSpidValue, spidRequest } from "@store/slices/spidSlice";
import style from "./playerThumb.module.scss";
import PositionService from "@services/position.api";
import {
  PlayerThumbProps,
  PositionStatus,
} from "@components/player-thumb/playerThumb.type";
import json from "@data/playerThumb.json";
import { postionColor } from "@data/playerThumb.data";
import RankService from "@services/rank.api";
import Search from "@public/images/search.svg";
import { Stats } from "@type/rank.type";
import CardService from "@services/card.api";

export default memo(function PlayerThumb({
  spid,
  name,
  seasonImg,
  position,
  loading,
  setdLoading,
  setLoading,
  ovr,
}: PlayerThumbProps) {
  const positionService = new PositionService();
  const rankService = new RankService();
  const cardService = new CardService();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const detailRef = useRef<HTMLDivElement>(null);

  const { value } = useAppSelector(state => state.spid);

  const [isFocus, setIsFocus] = useState(false);

  const openGraph = async (e: any) => {
    if (detailRef.current?.contains(e.target)) return;
    setLoading(true);

    if (!value[spid]) {
      await rankService.create(spid, name);
    }

    // 최대 3명까지
    if (value[spid] || Object.keys(value).length < 3) {
      const card = await cardService.findCard(spid);
      const stats = await rankService.getMyTotalRankByPo(
        spid,
        PositionStatus.TOTAL
      );
      dispatch(
        spidRequest({
          spid,
          name,
          stats: stats,
          card,
        })
      );
    } else {
      window.alert("선수는 3명까지 비교 가능합니다.");
      setLoading(false);
    }
  };

  const showDetail = async (spid: string, name: string) => {
    setdLoading(true);
    await positionService.updatePoOfPlayer(spid);
    const position = await positionService.findPartByPlayer(spid);
    dispatch(resetSpidValue());

    router.push({
      pathname: `/player/${name}`,
      query: {
        spid,
        part: position.part,
        desc: position.desc,
      },
    });
    setdLoading(false);
  };

  return (
    <div
      style={value[spid] ? json.thumbstyle : {}}
      className={style.thumbContainer}
      onMouseEnter={() => setIsFocus(true)}
      onMouseLeave={() => setIsFocus(false)}
    >
      <button disabled={loading} className={style.thumb} onClick={openGraph}>
        <div className={style.main}>
          <div className={style.info}>
            <img
              src={seasonImg}
              className={style.seasonImg}
              alt="선수 시즌 이미지"
            />
            <p
              className={style.name}
              style={value[spid] ? { fontWeight: "bold", color: "black" } : {}}
            >
              {name}
            </p>
            {(value[spid] || isFocus) && (
              <div
                ref={detailRef}
                onClick={() => showDetail(spid, name)}
                className={style.detail}
              >
                <Image
                  src={Search}
                  alt="상세정보"
                  layout="fixed"
                  width="30px"
                  height="30px"
                />
              </div>
            )}
          </div>
          <div className={style.more}>
            <span className={style.ovr}>{ovr ?? "?"}</span>
            <span style={postionColor(position?.part)}>
              {position?.desc ?? "미정"}
            </span>
          </div>
        </div>
      </button>
    </div>
  );
});
