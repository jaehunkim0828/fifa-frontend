/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, memo, useRef } from "react";
import { useAppSelector } from "@store/index";

import { useAppDispatch } from "@store/index";
import { setSpidValue, resetSpidValue } from "@store/slices/spidSlice";
import style from "./playerThumb.module.scss";
import ThumbService from "@services/playerThumb.api";
import { PlayerThumbProps } from "@type/playerThumb.type";
import { thumbstyle } from "../../data/playerThumb.data";

export default memo(function PlayerThumb({
  spid,
  name,
  seasonImg,
  checkedList,
  setList,
}: PlayerThumbProps) {
  const dispatch = useAppDispatch();
  const thumbService = new ThumbService();

  const {
    value: { spid: id },
  } = useAppSelector(state => state.spid);

  const [graph, setGraph] = useState<boolean>(false);

  const openGraph = async (e: any) => {
    if (spid === id) {
      dispatch(resetSpidValue());
      return;
    }

    if (!checkedList.includes(spid)) {
      setList(prev => [...prev, spid]);
    } else {
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
    await thumbService.create(spid, name);
  };

  const closeGraph = () => {
    setGraph(false);
  };

  return (
    <div
      className={style.thumb}
      style={checkedList.includes(spid) ? thumbstyle : {}}
      onClick={e => (!graph ? openGraph(e) : closeGraph())}
    >
      <div className={style.main}>
        <div className={style.content}>
          <div>
            <div className={style.info}>
              <img src={seasonImg} className={style.seasonImg} alt="seaon" />
              <p className={style.name}>{name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
