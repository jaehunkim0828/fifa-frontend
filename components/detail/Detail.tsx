import Graph from "@components/graph/Graph";
import Select from "react-select";

import style from "./detail.module.scss";
import { DetailProps } from "@type/detail.type";
import { useState } from "react";
import Randar from "@components/radar/Radar";

export default function Detail({
  seleteOptions,
  showPlayerGraph,
  stats,
  isGraph,
  setisGraph,
}: DetailProps) {
  return (
    <div className={style.playerContainer}>
      <div className={style.graph}>
        <div className={style.select}>
          <button onClick={() => setisGraph(true)}>Bar</button>
          <button onClick={() => setisGraph(false)}>Radar</button>
          <Select
            defaultValue={seleteOptions[0]}
            options={seleteOptions}
            onChange={(e: any) => showPlayerGraph(e.value)}
          />
        </div>
        {isGraph ? (
          <Graph stats={stats} seasonImg={"1"} />
        ) : (
          <Randar stats={stats} />
        )}
      </div>
    </div>
  );
}
