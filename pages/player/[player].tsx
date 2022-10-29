import SinglePlayer from "@components/single-player/SinglePlayer";
import Layout from "@components/rest/Layout";
import { GetServerSidePropsContext } from "next";
import { Stats } from "@type/rank.type";
import { PositionMainPart } from "@type/position.type";

interface PlayterDetailProps {
  stats: Stats;
  name: string;
  part: PositionMainPart;
  average: Stats;
  spid: string;
  desc: string;
  isMobile: boolean;
  path: string;
}

export default function PlayerDetail({
  name,
  part,
  isMobile,
  spid,
  path,
  desc,
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
      path: resolvedUrl,
      desc,
    },
  };
};
