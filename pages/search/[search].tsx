import { useRouter } from "next/router";
import { END } from "redux-saga";

import AllPlayer from "@components/all-player/allPlayer";
import { useEffect } from "react";
import PlayerService from "@services/player.api";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { PlayerInfo } from "@type/player.type";
import Layout from "@components/rest/Layout";
import { searchProps } from "@type/search.type";
import RankService from "@services/rank.api";
import { PositionPart } from "@type/playerThumb.type";
import { wrapper } from "@store/index";

export default function Search({
  name,
  player,
  isMobile,
  average,
}: searchProps) {
  const router = useRouter();
  const count = 9;

  useEffect(() => {
    if (player.length === 0) {
      window.alert("찾는 선수가 없습니다. 다시 검색해주세요");
      router.push("/");
      return;
    }
  }, [name, player, router]);

  return (
    <Layout page={"선수비교"} isMobile={isMobile}>
      <AllPlayer
        playersInitial={player}
        count={count}
        current_page={0}
        average={average}
        name={name}
      />
    </Layout>
  );
}

// 해준이유: query -> search undefined 이슈때문에 렌더링하기전에 쿼리값을 미리 받고 props보내주기위해
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    store => async (context: GetServerSidePropsContext) => {
      const playerService = new PlayerService();
      const rankService = new RankService();

      const { query } = context;
      const { search: name } = query as { search: string };
      const striker = await rankService.getAveragestats(PositionPart.FW);
      const midfielder = await rankService.getAveragestats(PositionPart.MF);
      const defender = await rankService.getAveragestats(PositionPart.DF);

      const player: PlayerInfo[] = await playerService.getPlayersByName(
        name,
        0,
        9
      );

      // 밑에 두 개는 REQUEST이후 SUCCESS가 될 때까지 기다려주게 해주는 코드
      store.dispatch(END);
      return {
        props: {
          name,
          player,
          average: { striker, midfielder, defender },
        },
      };
    }
  );
