import Seo from "@components/rest/Seo";
import SinglePlayer from "@components/single-player/SinglePlayer";
import { PlayterDetailProps, PrevPlayerDetail } from "@type/playerDetailPage";
import SinglePlayerService from "@services/singlePlayer.api";
import {
  PlayerStats,
  PositionPart,
  PositionStatus,
  Stats,
} from "@type/playerThumb.type";
import { publicImage } from "@helpers/image";

export default function PlayerDetail({
  stats,
  name,
  part,
  average,
  spid,
  desc,
}: PlayterDetailProps) {
  /* 
    필요한 데이터
    1. 이름 -> o
    2. 스텟 -> o
    3. 평균 값 -> o
    4. 이미지
    5. 등급 -> 직접 계산
  */

  const playerStats = (
    name: string,
    stats: Stats,
    average: Stats,
    part: PositionPart
  ): PlayerStats => ({
    [name]: {
      status: stats,
      name: name,
      seasonImg: stats.seasonImg ?? "none",
    },
    [part]: {
      status: average,
      name: "평균",
      seasonImg: publicImage(part),
    },
  });

  return (
    <>
      <Seo title={name} />
      <SinglePlayer
        playerStats={playerStats(name, stats, average, part)}
        name={name}
        part={part}
        desc={desc}
        spid={spid}
      />
    </>
  );
}

export const getServerSideProps = async ({
  query: { spid, player, part, desc },
}: PrevPlayerDetail) => {
  const singlePlayerService = new SinglePlayerService();

  const stats = await singlePlayerService.getMyTotalRankByPo(
    spid,
    PositionStatus.TOTAL
  );
  const average = await singlePlayerService.getAveragestats(part);

  return {
    props: {
      stats,
      name: player,
      part,
      average,
      spid,
      desc,
    },
  };
};
