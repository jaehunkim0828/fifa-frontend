import { useRouter } from "next/router";

import AllPlayer from "@components/all-player/allPlayer";
import Seo from "@components/rest/Seo";
import { useEffect, useState } from "react";
import PlayerService from "@services/player.api";
import { GetServerSideProps } from "next";
import { PlayerInfo } from "@type/player.type";

export default function Search({
  name,
  player,
}: {
  name: string;
  player: PlayerInfo[];
}) {
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
    <>
      <Seo title={name} />
      <div>
        <AllPlayer playersInitial={player} count={count} current_page={0} />
      </div>
    </>
  );
}

// 해준이유: query -> search undefined 이슈때문에 렌더링하기전에 쿼리값을 미리 받고 props보내주기위해
export const getServerSideProps: GetServerSideProps = async context => {
  const playerService = new PlayerService();

  const { query } = context;
  const { search: name } = query as { search: string };

  const player: PlayerInfo[] = await playerService.getPlayersByName(name, 0, 9);
  return {
    props: {
      name,
      player,
    },
  };
};
