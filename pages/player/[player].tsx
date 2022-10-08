import SinglePlayer from "@components/single-player/SinglePlayer";
import { PlayterDetailProps } from "@type/playerDetailPage";
import Layout from "@components/rest/Layout";
import { GetServerSidePropsContext } from "next";
import { useResize } from "@hooks/useResize";

export default function PlayerDetail({
  name,
  part,
  isMobile,
  spid,
  desc,
  path,
}: PlayterDetailProps) {
  const size = useResize();

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
