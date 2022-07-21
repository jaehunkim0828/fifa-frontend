import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useEffect, useState, memo, useRef } from "react";
import Select from "react-select";

import style from "../styles/playerThumb.module.scss";
import Graph from "@components/graph/Graph";
import up from "../public/images/up.png";
import down from "../public/images/down.png";
import ThumbService from "@services/playerThumb.api";
import { PlayerThumbProps } from "@type/playerThumb.type";
import {
  seleteOptions,
  thumbstyle,
  initialStatus,
} from "../data/playerThumb.data";
import useStats from "../hooks/useRank";

export default memo(function PlayerThumb({
  comparedThumb,
  setComparedThumb,
  spid,
  name,
  seasonImg,
  classname,
}: PlayerThumbProps) {
  const thumbService = new ThumbService();

  const btnRef = useRef<HTMLButtonElement>(null);

  const [graph, setGraph] = useState<boolean>(false);
  const [thumb, setThumb] = useState<boolean>(false);
  const [loding, setLoding] = useState<boolean>(false);
  const [status, setStatus] = useStats(initialStatus);

  const onClickThumb = (e: any) => {
    if (e.target.localName !== "img") {
      if (!thumb) {
        setComparedThumb({ spid, name, seasonImg });
      } else {
        setComparedThumb({});
      }
      setThumb(!thumb);
    }
  };

  const openGraph = async (value: number) => {
    try {
      setLoding(true);
      await thumbService.create(spid, name);
      const totalPlayerData = await thumbService.getMyTotalRankByPo(
        spid,
        value
      );
      setGraph(true);
      setStatus(totalPlayerData);
      setLoding(false);
    } catch (err) {
      setLoding(false);
      window.alert("데이터를 받아오는 과정에서 에러가 생겼습니다.");
      if (err instanceof Error) console.log(err);
    }
  };
  const closeGraph = () => {
    setLoding(false);
    setGraph(false);
  };

  const showPlayerGraph = async (value: number) => {
    const totalPlayerData = await thumbService.getMyTotalRankByPo(spid, value);
    setGraph(true);
    setStatus(totalPlayerData);
  };

  useEffect(() => {
    if (!comparedThumb.length) setThumb(false);
  }, [comparedThumb]);

  return (
    <div
      className={style.thumb}
      style={thumb ? thumbstyle : {}}
      onClick={onClickThumb}
    >
      <div className={style.main}>
        <div>
          <div>
            <div className={style.info}>
              <div>{name}</div>
            </div>
          </div>
          <div className={style.season}>
            <Image src={seasonImg} width="30" height="21" alt="none" />
            <div>{classname}</div>
          </div>
        </div>
        <button
          ref={btnRef}
          className={style.btn}
          onClick={() => (!graph ? openGraph(50) : closeGraph())}
        >
          <Image src={graph ? up : down} alt="btn" layout="fill" />
        </button>
      </div>
      {loding && <CircularProgress />}
      {graph && (
        <div className={style.graph}>
          <div className={style.select}>
            <Select
              defaultValue={seleteOptions[0]}
              options={seleteOptions}
              onChange={(e: any) => showPlayerGraph(e.value)}
            />
          </div>
          <Graph name={name} status={status} />
        </div>
      )}
    </div>
  );
});
