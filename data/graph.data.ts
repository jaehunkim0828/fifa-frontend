import { PlayerRank } from "@type/rankUserResult.type";

export const options1 = (name: string) => ({
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: `1경기당 평균 ${name} 선수의 그래프`,
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

export const step1 = (name: string, status: PlayerRank) => ({
  labels: labels1,
  datasets: [
    {
      label: name,
      data: [
        status.dribble,
        status.dribbleSuccess,
        status.dribbleTry,
        status.passSuccess,
        status.passTry,
      ],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
});

export const step2 = (name: string, status: PlayerRank) => ({
  labels: labels2,
  datasets: [
    {
      label: name,
      data: [
        status.shoot,
        status.effectiveShoot,
        status.goal,
        status.assist,
        status.tackle,
        status.block,
      ],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
});
