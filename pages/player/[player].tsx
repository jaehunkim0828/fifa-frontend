import Seo from "@components/rest/Seo";
import SinglePlayer from "@components/single-player/SinglePlayer";
import { PlayterDetailProps, PrevPlayerDetail } from "@type/playerDetailPage";
import SinglePlayerService from "@services/singlePlayer.api";

export default function PlayerDetail({
  stats,
  name,
  part,
  average,
}: PlayterDetailProps) {
  /* 
    필요한 데이터
    1. 이름 -> o
    2. 스텟 -> o
    3. 평균 값 -> o
    4. 이미지
    5. 등급
  */

  return (
    <>
      <Seo title={name} />
      <SinglePlayer stats={stats} name={name} part={part} average={average} />
    </>
  );
}

export const getServerSideProps = async ({
  query: { spid, player, part },
}: PrevPlayerDetail) => {
  const singlePlayerService = new SinglePlayerService();

  const stats = await singlePlayerService.getMyTotalRankByPo(spid, 50);
  const average = await singlePlayerService.getAveragestats(part);

  return {
    props: {
      stats,
      name: player,
      part,
      average,
    },
  };
};
