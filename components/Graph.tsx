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
import style from "../styles/graph.module.scss";
import { GraphProps } from "@type/graph.type";
import { options1, step1, step2 } from "@data/graph.data";

export default function Graph({ name, status }: GraphProps) {
  return (
    <div className={style.graph}>
      <Bar options={options1} data={step1(name, status)} />
      <Bar data={step2(name, status)} />
      <div>{`총 경기 수: ${status.matchCount}`}</div>
    </div>
  );
}
