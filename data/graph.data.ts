import { GraphData } from "@components/graph/graph.type";
import { Stats } from "fs";

export const colors = [
  "#E99497",
  "#F3C583",
  "#E8E46E",
  "#B3E283",
  "#513252",
  "#7A4069",
];

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
    },
    legend: {
      position: "top" as const,
      display: false,
    },
  },
};

export const labels1 = [
  "드리블 거리",
  "드리블 성공",
  "드리블 시도",
  "패스 성공",
  "패스 시도",
];
export const labels2 = ["슛 시도", "유효슛", "골", "도움", "태클", "블락"];

export const mobileLabel = [
  { type: "shoot", kind: "슛 시도" },
  { type: "effectiveShoot", kind: "유효슛" },
  { type: "goal", kind: "골" },
  { type: "dribble", kind: "드리블 거리" },
  { type: "dribbleSuccess", kind: "드리블 성공" },
  { type: "dribbleTry", kind: "드리블 시도" },
  { type: "passSuccess", kind: "패스 성공" },
  { type: "passTry", kind: "패스 시도" },
  { type: "assist", kind: "도움" },
  { type: "tackle", kind: "태클" },
  { type: "block", kind: "블락" },
];

export const step1 = (data: GraphData[]) => ({
  labels: labels1,
  datasets: data.map((player: GraphData, i: number) => {
    return {
      data: [
        player.status.dribble,
        player.status.dribbleSuccess,
        player.status.dribbleTry,
        player.status.passSuccess,
        player.status.passTry,
      ],
      borderColor: colors[i],
      backgroundColor: colors[i],
    };
  }),
});

export const step2 = (data: GraphData[]) => ({
  labels: labels2,
  datasets: data.map((player: GraphData, i: number) => {
    return {
      label: `${i + 1}. ${player.name}`,
      data: [
        player.status.shoot,
        player.status.effectiveShoot,
        player.status.goal,
        player.status.assist,
        player.status.tackle,
        player.status.block,
      ],
      borderColor: `rgb(${255 - i * 10}, 99, 132)`,
      backgroundColor: colors[i],
    };
  }),
});

export const mobileStep = (data: GraphData[], type: string, kind: string) => ({
  labels: [kind],
  datasets: data.map((player: any, i: number) => {
    return {
      label: `${i + 1}. ${player.name}`,
      data: [player.status[type]],
      borderColor: `rgb(${255 - i * 10}, 99, 132)`,
      backgroundColor: colors[i],
    };
  }),
});
