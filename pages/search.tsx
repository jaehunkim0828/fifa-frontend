import { useRouter } from "next/router";
import { END } from "redux-saga";

import AllPlayer from "@components/all-player/allPlayer";
import { useEffect } from "react";
import PlayerService from "@services/player.api";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { PlayerInfo } from "@type/player.type";
import Layout from "@components/rest/Layout";
import RankService from "@services/rank.api";
import { wrapper } from "@store/index";
import { useAppDispatch } from "@store/index";
import { resetSpidValue } from "@store/slices/spidSlice";
import { Stats } from "@type/rank.type";
import { PositionMainPart } from "@type/position.type";

interface searchProps {
  search: {
    name: string;
    season: string;
    position: string;
    nation: string;
    team: string;
  };
  player: PlayerInfo[];
  path: any;
}

export default function Search({
  search: { name, season, position, nation, team },
  player,
  path,
}: searchProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const count = 9;

  useEffect(() => {
    if (player.length === 0) {
      window.alert("찾는 선수가 없습니다. 다시 검색해주세요");
      router.push("/");
      return;
    }
  }, [name, position, season, nation, player.length, router]);

  useEffect(() => {
    dispatch(resetSpidValue());
  }, [dispatch]);

  return (
    <Layout page={"선수비교"} path={path}>
      <AllPlayer
        playersInitial={player}
        count={count}
        current_page={0}
        search={{ name, season, position, nation, team }}
      />
    </Layout>
  );
}

// 해준이유: query -> search undefined 이슈때문에 렌더링하기전에 쿼리값을 미리 받고 props보내주기위해
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    store => async (context: GetServerSidePropsContext) => {
      const playerService = new PlayerService();

      const { query } = context;
      const { name, season, position, nation, team } = query as {
        name: string;
        season: string;
        position: string;
        nation: string;
        team: string;
      };

      const player: PlayerInfo[] = await playerService.getPlayers(
        { player: name, season, position, nation, team },
        0,
        9
      );

      // 밑에 두 개는 REQUEST이후 SUCCESS가 될 때까지 기다려주게 해주는 코드
      store.dispatch(END);
      return {
        props: {
          search: {
            season: season ?? null,
            name: name ?? null,
            position: position ?? null,
            nation: nation ?? null,
            team: team ?? null,
          },
          player,
          path: context.resolvedUrl,
        },
      };
    }
  );
