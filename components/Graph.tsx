import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
import style from '../styles/graph.module.scss';



export default function Graph(
  {name, status}: {
     name: string, 
     status: {
      matchCount: number,
      assist: number,
      block: number,
      dribble: number,
      dribbleSuccess: number,
      dribbleTry: number,
      effectiveShoot: number,
      goal: number,
      passSuccess: number,
      passTry: number,
      shoot: number,
      tackle: number,
     }
  }) {
  const options1 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `1경기당 평균 ${name} 선수의 그래프`,
      },
    },
  };

  const labels1 = ['드리블 거리', '드리블 성공', '드리블 시도', '패스 성공', '패스 시도'];
  const labels2 = ['슛 시도', '유효슛', '골', '도움', '태클', '블락'];

  const step1 = {
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
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };

    const step2 = {
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
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };

  return (
    <div className={style.graph}>
      <Bar options={options1} data={step1} />
      <Bar data={step2}/>
      <div>{`총 경기 수: ${status.matchCount}`}</div>
    </div>
  )
}