import Graph from "@components/graph/Graph";
import Select from "react-select";

import style from "./detail.module.scss";
import { DetailProps } from "@type/detail.type";

export default function Detail({
  seleteOptions,
  showPlayerGraph,
  name,
  status,
}: DetailProps) {
  return (
    <div className={style.playerContainer}>
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
    </div>
  );
}
