import Seo from "@components/rest/Seo";
import SinglePlayer from "@components/single-player/SinglePlayer";
import { PlayterDetailProps } from "@type/playerDetailPage";
import { PlayerStats, PositionPart, Stats } from "@type/playerThumb.type";
import { publicImage } from "@helpers/image";
import Layout from "@components/rest/Layout";
import { GetServerSidePropsContext } from "next";

export default function PlayerDetail({
  name,
  part,
  isMobile,
  spid,
  desc,
  path,
}: PlayterDetailProps) {
  return (
    <Layout page={`${name}의 상세정보`} isMobile={isMobile} path={path}>
      <SinglePlayer name={name} part={part} desc={desc} spid={spid} />
    </Layout>
  );
}

export const getServerSideProps = async ({
  query: { spid, player, part, desc },
  resolvedUrl,
}: GetServerSidePropsContext) => {
  return {
    props: {
      name: player,
      part,
      spid,
      desc,
      path: resolvedUrl,
    },
  };
};
