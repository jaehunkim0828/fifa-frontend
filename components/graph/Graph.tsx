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
import { options1, step1, step2 } from "@data/graph.data";
import { useEffect, useState } from "react";
import { GraphData } from "@type/rankUserResult.type";
import json from "@data/playerThumb.json";

export default function Graph({ statses }: GraphProps) {
  const [players, setPlayers] = useState<GraphData[]>([
    { name: "", status: json.initialStatus, spid: "" },
  ]);

  useEffect(() => {
    const result: GraphData[] = [];
    for (const spid in statses) {
      result.push({
        spid,
        name: statses[spid].name,
        status: statses[spid].status,
      });
    }
    setPlayers(result);
  }, [statses]);

  return (
    <div className={style.graph}>
      <Bar options={options1(players)} data={step1(players)} />
      <Bar data={step2(players)} />
      {players.map((player, i: number) => {
        return (
          <div key={i}>{`${i + 1}. ${player.name}의 경기 수: ${
            player.status.matchCount
          }`}</div>
        );
      })}
    </div>
  );
}
