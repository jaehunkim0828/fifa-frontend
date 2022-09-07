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
