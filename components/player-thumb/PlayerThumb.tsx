/* eslint-disable @next/next/no-img-element */
import { memo } from "react";
import { useAppSelector } from "@store/index";
import { useAppDispatch } from "@store/index";
import { resetSpidValue, spidRequest } from "@store/slices/spidSlice";
import style from "./playerThumb.module.scss";
import PositionService from "@services/position.api";
import { PlayerThumbProps, PositionPart } from "@type/playerThumb.type";
import json from "@data/playerThumb.json";
import { postionColor } from "@data/playerThumb.data";
import { useRouter } from "next/router";
import RankService from "@services/rank.api";

export default memo(function PlayerThumb({
  spid,
  name,
  seasonImg,
  position,
  loading,
}: PlayerThumbProps) {
  const positionService = new PositionService();
  const rankService = new RankService();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { value } = useAppSelector(state => state.spid);

  const openGraph = async () => {
    if (!value[spid]) {
      await rankService.create(spid, name);
    }

    // 최대 3명까지
    if (value[spid] || Object.keys(value).length < 3) {
      dispatch(
        spidRequest({
          spid,
          name,
        })
      );
    } else {
      window.alert("선수는 3명까지 비교 가능합니다.");
    }
  };

  const showDetail = async (spid: string, name: string) => {
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
  };

  return (
    <div
      style={value[spid] ? json.thumbstyle : {}}
      className={style.thumbContainer}
    >
      <button disabled={loading} className={style.thumb} onClick={openGraph}>
        <div className={style.main}>
          <div className={style.info}>
            <img
              src={seasonImg}
              className={style.seasonImg}
              alt="선수 시즌 이미지"
            />
            <p className={style.name}>{name}</p>
          </div>
          <div>
            <span>메인: </span>
            <span style={postionColor(position?.part)}>
              {position?.desc ?? "미정"}
            </span>
          </div>
        </div>
      </button>
      <button
        disabled={loading}
        onClick={() => showDetail(spid, name)}
        className={style.detail}
      >
        상세정보
      </button>
    </div>
  );
});
