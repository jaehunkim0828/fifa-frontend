import Seo from "@components/rest/Seo";
import SinglePlayer from "@components/single-player/SinglePlayer";
import { PlayterDetailProps, PrevPlayerDetail } from "@type/playerDetailPage";
import { PlayerStats, PositionPart, Stats } from "@type/playerThumb.type";
import { publicImage } from "@helpers/image";

export default function PlayerDetail({
  name,
  part,

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
      <SinglePlayer name={name} part={part} desc={desc} spid={spid} />
    </>
  );
}

export const getServerSideProps = async ({
  query: { spid, player, part, desc },
}: PrevPlayerDetail) => {
  return {
    props: {
      name: player,
      part,
      spid,
      desc,
    },
  };
};
