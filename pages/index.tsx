import Seo from "@components/Seo";
import { getMethod } from "@services/http";
import Rank from "@components/rank/Rank";
import { HomeProps } from "@type/Home.type";

export default function Home({ playerRanks, totalCount, count }: HomeProps) {
  return (
    <>
      <Seo title={"Home"} />
      <Rank playerRanks={playerRanks} totalCount={totalCount} count={count} />
    </>
  );
}

export async function getServerSideProps() {
  // 여기서 axios를 사용해주면 개꿀
  const count = 12;
  const getFirstPage = async () => {
    return await getMethod(`rank/all?current_page=1&count=${count}`);
  };

  const countTotalRankPlayer = async () => {
    return await getMethod("rank/player/count");
  };

  return {
    props: {
      playerRanks: await getFirstPage(),
      totalCount: await countTotalRankPlayer(),
      count,
    },
  };
}
