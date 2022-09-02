import PlayerService from "@services/player.api";
import { PositionPart, Stats } from "@type/playerThumb.type";
import { useRouter } from "next/router";

export default function PlayerDetail({
  states,
  name,
  part,
  average,
}: {
  states: Stats;
  name: string;
  part: string;
  average: Stats;
}) {
  console.log(states);
  console.log(name);
  console.log(part);
  console.log(average);
  /* 
    필요한 데이터
    1. 이름 -> o
    2. 스텟 -> o
    3. 평균 값 -> o
    4. 이미지
    5. 등급
  */

  return <div>{}</div>;
}

export const getServerSideProps = async ({
  query: { spid, player, part },
}: {
  query: { spid: string; player: string; part: PositionPart };
}) => {
  const playerServcie = new PlayerService();

  const states = await playerServcie.getMyTotalRankByPo(spid, 50);
  const average = await playerServcie.getAverageStates(part);

  return {
    props: {
      states,
      name: player,
      part,
      average,
    },
  };
};
