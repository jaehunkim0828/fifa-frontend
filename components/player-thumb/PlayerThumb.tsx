/* eslint-disable @next/next/no-img-element */
import { memo } from "react";
import { useAppSelector } from "@store/index";
import { useAppDispatch } from "@store/index";
import { setSpidValue, resetSpidValue } from "@store/slices/spidSlice";
import style from "./playerThumb.module.scss";
import ThumbService from "@services/playerThumb.api";
import { PlayerThumbProps, PositionPart } from "@type/playerThumb.type";
import json from "@data/playerThumb.json";

export default memo(function PlayerThumb({
  spid,
  name,
  seasonImg,
  position,
}: PlayerThumbProps) {
  const thumbService = new ThumbService();
  const dispatch = useAppDispatch();

  const selectPostionColor = (part?: string) => {
    switch (part) {
      case PositionPart.GK:
        return "#FFD93D";
      case PositionPart.MF:
        return "#6BCB77";
      case PositionPart.DF:
        return "#4D96FF";
      case PositionPart.FW:
        return "#FF6B6B";
      case PositionPart.SUB:
        return "#2C3333";
      default:
        return "gray";
    }
  };

  const postionColor = {
    color: selectPostionColor(position?.part),
    fontWeight: "bold",
  };

  const { value } = useAppSelector(state => state.spid);

  const openGraph = async () => {
    dispatch(
      setSpidValue({
        spid,
        name,
      })
    );

    if (!value[spid]) {
      await thumbService.create(spid, name);
      await thumbService.updatePoOfPlayer(spid);
    }
  };

  return (
    <div
      className={style.thumb}
      style={value[spid] ? json.thumbstyle : {}}
      onClick={openGraph}
    >
      <div className={style.main}>
        <div className={style.info}>
          <img src={seasonImg} className={style.seasonImg} alt="seaon" />
          <p className={style.name}>{name}</p>
        </div>
        <div>
          <span>메인: </span>
          <span style={postionColor}>{position?.desc ?? "미정"}</span>
        </div>
      </div>
    </div>
  );
});
