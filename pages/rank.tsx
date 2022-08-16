import Seo from "@components/rest/Seo";
import { getMethod } from "@services/http";
import Rank from "@components/rank/Rank";
import { HomeProps } from "@type/Home.type";
import RankService from "@services/rank.api";

export default function Home({ playerRanks, totalCount, count }: HomeProps) {
  return (
    <>
      <Seo title={"Home"} />
      <Rank playerRanks={playerRanks} totalCount={totalCount} count={count} />
    </>
  );
}

export async function getServerSideProps() {
  const rankService = new RankService();

  const count = "9";
  const getFirstPage = async () => {
    return await rankService.getCurrentPage("1", count);
  };

  const countTotalRankPlayer = async () => {
    return await rankService.getTotalRankCount();
  };

  return {
    props: {
      playerRanks: await getFirstPage(),
      totalCount: await countTotalRankPlayer(),
      count,
    },
  };
}
