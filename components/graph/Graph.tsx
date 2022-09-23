/* eslint-disable @next/next/no-img-element */
import { Bar } from "react-chartjs-2";
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
import { GraphProps } from "@type/graph.type";
import { colors, options1, step1, step2 } from "@data/graph.data";
import { useEffect, useState } from "react";
import { GraphData } from "@type/rankUserResult.type";
import json from "@data/playerThumb.json";
import { Box, Grid, Skeleton } from "@mui/material";

export default function Graph({ stats, seasonImg }: GraphProps) {
  const [players, setPlayers] = useState<GraphData[]>([
    { name: "", status: json.initialStatus, spid: "", seasonImg: "/" },
  ]);

  const playerColor = (index: number) => {
    return {
      backgroundColor: colors[index],
      width: "2rem",
      height: "1rem",
    };
  };

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
          <Bar options={options1(players)} data={step1(players)} />
          <Bar data={step2(players)} />
          {players.map((player, i: number) => {
            return (
              <div key={i} className={style.who}>
                <div style={playerColor(i)}></div>
                <img src={player.seasonImg} alt="none" />
                <span>{`${player.name}의 경기 수: ${player.status.matchCount}`}</span>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
