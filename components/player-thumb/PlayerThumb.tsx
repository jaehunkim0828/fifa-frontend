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
  checkedList,
  setList,
  position,
}: PlayerThumbProps) {
  const dispatch = useAppDispatch();
  const thumbService = new ThumbService();

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

  const {
    value: { spid: id },
  } = useAppSelector(state => state.spid);

  const openGraph = async () => {
    if (spid === id) {
      dispatch(resetSpidValue());
      return;
    }

    if (!checkedList.includes(spid)) {
      // open
      setList(prev => [...prev, spid]);
      await thumbService.create(spid, name);
      await thumbService.updatePoOfPlayer(spid);
    } else {
      //close
      setList(prev => {
        prev.splice(prev.indexOf(spid), 1);
        return prev;
      });
    }
    dispatch(
      setSpidValue({
        spid,
        name,
      })
    );
  };

  return (
    <div
      className={style.thumb}
      style={checkedList.includes(spid) ? json.thumbstyle : {}}
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
