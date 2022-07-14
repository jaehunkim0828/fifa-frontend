import { ComparedStatus } from "@type/comparedGraph.type";
import { Thumb } from "@type/playerThumb.type";

export const options1 = (player1: Thumb, player2: Thumb) => ({
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: `1경기당 평균 ${player1.name}, ${player2.name} 선수들의 비교 그래프`,
    },
  },
});

export const labels1 = [
  "드리블 거리",
  "드리블 성공",
  "드리블 시도",
  "패스 성공",
  "패스 시도",
];
export const labels2 = ["슛 시도", "유효슛", "골", "도움", "태클", "블락"];

export const options = [
  { value: 50, label: "TOTAL" },
  { value: 0, label: "GK" },
  { value: 1, label: "SW" },
  { value: 2, label: "RWB" },
  { value: 3, label: "RB" },
  { value: 4, label: "RCB" },
  { value: 5, label: "CB" },
  { value: 6, label: "LCB" },
  { value: 7, label: "LB" },
  { value: 8, label: "LWB" },
  { value: 9, label: "RDM" },
  { value: 10, label: "CDM" },
  { value: 11, label: "LDM" },
  { value: 12, label: "RM" },
  { value: 13, label: "RCM" },
  { value: 14, label: "CM" },
  { value: 15, label: "LCM" },
  { value: 16, label: "LM" },
  { value: 17, label: "RAM" },
  { value: 18, label: "CAM" },
  { value: 19, label: "LAM" },
  { value: 20, label: "RF" },
  { value: 21, label: "CF" },
  { value: 22, label: "LF" },
  { value: 23, label: "RW" },
  { value: 24, label: "RS" },
  { value: 25, label: "ST" },
  { value: 26, label: "LS" },
  { value: 27, label: "LW" },
  { value: 28, label: "SUB" },
];

export const step1 = (player1: Thumb, player2: Thumb, comparedStatus: any) => ({
  labels: labels1,
  datasets: [
    {
      label: `1. ${player1.name}`,
      data: [
        comparedStatus[0]?.dribble,
        comparedStatus[0]?.dribbleSuccess,
        comparedStatus[0]?.dribbleTry,
        comparedStatus[0]?.passSuccess,
        comparedStatus[0]?.passTry,
      ],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: `2. ${player2.name}`,
      data: [
        comparedStatus[1]?.dribble,
        comparedStatus[1]?.dribbleSuccess,
        comparedStatus[1]?.dribbleTry,
        comparedStatus[1]?.passSuccess,
        comparedStatus[1]?.passTry,
      ],
      borderColor: "rgb(99, 146, 255)",
      backgroundColor: "rgba(120, 99, 255, 0.5)",
    },
  ],
});

export const step2 = (
  player1: Thumb,
  player2: Thumb,
  comparedStatus: ComparedStatus[]
) => ({
  labels: labels2,
  datasets: [
    {
      label: `1. ${player1.name}`,
      data: [
        comparedStatus[0]?.shoot,
        comparedStatus[0]?.effectiveShoot,
        comparedStatus[0]?.goal,
        comparedStatus[0]?.assist,
        comparedStatus[0]?.tackle,
        comparedStatus[0]?.block,
      ],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: `2. ${player2.name}`,
      data: [
        comparedStatus[1]?.shoot,
        comparedStatus[1]?.effectiveShoot,
        comparedStatus[1]?.goal,
        comparedStatus[1]?.assist,
        comparedStatus[1]?.tackle,
        comparedStatus[1]?.block,
      ],
      borderColor: "rgb(99, 146, 255)",
      backgroundColor: "rgba(120, 99, 255, 0.5)",
    },
  ],
});
