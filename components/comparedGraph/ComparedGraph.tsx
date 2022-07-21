import { useEffect, useState } from "react";
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
import Image from "next/image";
import Select from "react-select";

import style from "../graph.module.scss";
import { ComparedGraphProps, PlayerStatus } from "@type/comparedGraph.type";
import { options, options1, step1, step2 } from "@data/comparedGraph.data";
import ComparedGraphService from "@services/comparedGraph.api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ComparedGraph({
  player1,
  player2,
}: ComparedGraphProps) {
  const comparedGraphService = new ComparedGraphService();

  const [comparedStatus, setStatus] = useState<PlayerStatus[]>([]);

  const showPlayerGraph = async (value: number) => {
    const player1PositionData = await comparedGraphService.getPlayer(
      player1,
      value
    );
    const player2PositionData = await comparedGraphService.getPlayer(
      player2,
      value
    );
    setStatus([player1PositionData, player2PositionData]);
  };

  useEffect(() => {
    const showPlayersData = async () => {
      const player1Data = await comparedGraphService.getTotalRank(player1.spid);
      const player2Data = await comparedGraphService.getTotalRank(player2.spid);
      setStatus([player1Data, player2Data]);
    };
    showPlayersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player1.spid, player2.spid]);

  return (
    <div className={style.graph}>
      <Select
        defaultValue={options[0]}
        options={options}
        onChange={(e: any) => showPlayerGraph(e.value)}
      />
      <Bar
        options={options1(player1, player2)}
        data={step1(player1, player2, comparedStatus)}
      />
      <Bar data={step2(player1, player2, comparedStatus)} />
      <div>
        <Image src={player1.seasonImg} width="20" height="14" alt="season" />
        {`1. ${player1.name}의 경기 수: ${comparedStatus[0]?.matchCount}`}
      </div>
      <div>
        <Image src={player2.seasonImg} width="20" height="14" alt="season" />
        {`2. ${player2.name}의 경기 수: ${comparedStatus[1]?.matchCount}`}
      </div>
    </div>
  );
}
