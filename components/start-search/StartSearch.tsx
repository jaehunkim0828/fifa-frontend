import Image from "next/image";
import { useRouter } from "next/router";

import style from "./startSearch.module.scss";
import SearchImg from "@public/images/search.svg";
import useInput from "@hooks/useInput";
import { useState } from "react";
import { useEffect } from "react";
import SeasonService from "@services/season.api";
import Logo from "@public/images/logo.png";
import SearchBar from "@components/search-bar/SearchBar";

export default function StartSearch() {
  const router = useRouter();

  const [player, setPlayer] = useInput({ player: "" });
  const [more, setMore] = useState<{ season: number[]; position: number[] }>({
    season: [],
    position: [],
  });

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const m: { season?: string; name?: string; position?: string } = {};
    if (player.player) m.name = player.player;
    if (more.season.length) m.season = more.season.join(",");
    if (more.position.length) m.position = more.position.join(",");

    router.push({
      pathname: `/search`,
      query: m,
    });
  };

  const onChangePlayer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer("player", event.target.value);
  };

  return (
    <>
      <div className={style.searchContainer}>
        <div className={style.searchWapper}>
          <div className={style.title}>
            <div className={style.logo}>
              <Image
                src={Logo}
                alt="PickFA-Logo"
                layout="responsive"
                priority
              />
            </div>
            <span>선수 데이터 웹사이트 분석</span>
          </div>
          <SearchBar
            setMore={setMore}
            more={more}
            player={player.player}
            onChangePlayer={onChangePlayer}
            submit={submit}
          />
        </div>
      </div>
    </>
  );
}
