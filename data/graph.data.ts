import { GraphData, PlayerRank } from "@type/rankUserResult.type";

const colors = [
  "#E99497",
  "#F3C583",
  "#E8E46E",
  "#B3E283",
  "#513252",
  "#7A4069",
];

export const options1 = (players: GraphData[]) => ({
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: `1경기당 평균 ${players
        .map(player => player.name)
        .join(", ")} 선수의 그래프`,
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

export const step1 = (data: GraphData[]) => ({
  labels: labels1,
  datasets: data.map((player: GraphData, i: number) => {
    return {
      label: `${i + 1}. ${player.name}`,
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
