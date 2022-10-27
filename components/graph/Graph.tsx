/* eslint-disable @next/next/no-img-element */
import { Bar, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import style from "./graph.module.scss";
import { GraphData, GraphProps } from "@components/graph/graph.type";
import {
  colors,
  mobileStep,
  mobileLabel,
  options,
  step1,
  step2,
} from "@data/graph.data";
import { useEffect, useState } from "react";
import json from "@data/playerThumb.json";
import { Grid, Skeleton } from "@mui/material";
import { useResize } from "@hooks/useResize";

export default function Graph({ stats, seasonImg }: GraphProps) {
  const [players, setPlayers] = useState<GraphData[]>([
    { name: "", status: json.initialStatus, spid: "", seasonImg: "/" },
  ]);

  const { nowWidth } = useResize();

  const playerColor = (index: number) => {
    return {
      backgroundColor: colors[index],
    };
  };

  // rader 100% translate

  useEffect(() => {
    const result: GraphData[] = [];
    for (const spid in stats) {
      result.push({
        spid,
        name: stats[spid].name,
        status: stats[spid].status,
        seasonImg: stats[spid].seasonImg,
      });
    }
    setPlayers(result);
  }, [stats]);

  return (
    <div className={style.graph}>
      {!seasonImg ? (
        <Grid container spacing={0.5}>
          <Grid item xs style={{ textAlign: "center" }}>
            <Skeleton variant="text" width={"300px"} />
          </Grid>
          <Grid item xs>
            <Skeleton variant="rectangular" width={"480px"} height={"240px"} />
          </Grid>
          <Grid item xs>
            <Skeleton variant="rectangular" width={"480px"} height={"240px"} />
          </Grid>
          <Grid item xs={10}>
            <Skeleton variant="rectangular" width={"150px"} />
          </Grid>
          <Grid item xs>
            <Skeleton variant="rectangular" width={"150px"} />
          </Grid>
        </Grid>
      ) : (
        <>
          {nowWidth >= 650 ? (
            <>
              <Bar options={options} data={step1(players)} />
              <Bar options={options} data={step2(players)} />
            </>
          ) : (
            <div className={style.barContainer}>
              {mobileLabel.map((label, i) => (
                <Bar
                  key={`bar-graph: ${i}`}
                  options={options}
                  data={mobileStep(players, label.type, label.kind)}
                />
              ))}
            </div>
          )}
          {players.map((player, i: number) => {
            return (
              <div key={i} className={style.who}>
                <div className={style.box} style={playerColor(i)}></div>
                <img src={player.seasonImg} alt="선수 시즌 이미지" />
                <span>{`${player.name}의 경기 수: ${player.status.matchCount}`}</span>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
