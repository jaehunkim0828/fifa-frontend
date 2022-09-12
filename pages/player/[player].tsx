import Seo from "@components/rest/Seo";
import SinglePlayer from "@components/single-player/SinglePlayer";
import { PlayterDetailProps, PrevPlayerDetail } from "@type/playerDetailPage";
import { PlayerStats, PositionPart, Stats } from "@type/playerThumb.type";
import { publicImage } from "@helpers/image";
import Layout from "@components/rest/Layout";

export default function PlayerDetail({
  name,
  part,
  isMobile,
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
    <Layout page={name} isMobile={isMobile}>
      <SinglePlayer name={name} part={part} desc={desc} spid={spid} />
    </Layout>
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
