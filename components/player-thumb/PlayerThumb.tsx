/* eslint-disable @next/next/no-img-element */
import { memo } from "react";
import { useAppSelector } from "@store/index";
import { useAppDispatch } from "@store/index";
import { resetSpidValue, setSpidValue } from "@store/slices/spidSlice";
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
}: PlayerThumbProps) {
  const positionService = new PositionService();
  const rankService = new RankService();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { value } = useAppSelector(state => state.spid);

  const openGraph = async () => {
    if (!value[spid]) {
      rankService.create(spid, name);
      await positionService.updatePoOfPlayer(spid);
    }

    dispatch(
      setSpidValue({
        spid,
        name,
      })
    );
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
      <div className={style.thumb} onClick={openGraph}>
        <div className={style.main}>
          <div className={style.info}>
            <img src={seasonImg} className={style.seasonImg} alt="seaon" />
            <p className={style.name}>{name}</p>
          </div>
          <div>
            <span>메인: </span>
            <span style={postionColor(position?.part)}>
              {position?.desc ?? "미정"}
            </span>
          </div>
        </div>
      </div>
      <button onClick={() => showDetail(spid, name)} className={style.detail}>
        상세정보
      </button>
    </div>
  );
});
