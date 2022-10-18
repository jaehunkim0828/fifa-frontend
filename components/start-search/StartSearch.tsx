import Image from "next/image";
import { useRouter } from "next/router";

import style from "./startSearch.module.scss";
import SearchImg from "@public/images/search.svg";
import useInput from "@hooks/useInput";
import { useState } from "react";
import { useEffect } from "react";
import SeasonService from "@services/season.api";

export default function StartSearch() {
  const router = useRouter();

  const [player, setPlayer] = useInput({ player: "" });
  const [focusInput, setFocuseInput] = useState(false);
  const [more, setMore] = useState<{ season: number[]; position: number[] }>({
    season: [],
    position: [],
  });

  const [seasons, setSeason] = useState<
    { seasonId: number; seasonImg: string }[]
  >([]);

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

  const selectSeason = (seasonId: number) => {
    if (more.season.includes(seasonId)) {
      const index = more.season.indexOf(seasonId);
      more.season.splice(index, 1);
      setMore(prev => ({
        ...prev,
        season: more.season,
      }));
      return;
    }
    setMore((prev: any) => ({
      ...prev,
      season: [...prev.season, seasonId],
    }));
  };

  useEffect(() => {
    const seasonService = new SeasonService();

    async function getMoreChoice() {
      const s = await seasonService.getSeason();
      setSeason(s);
    }

    getMoreChoice();
  }, []);

  return (
    <>
      <div className={style.searchContainer}>
        <div className={style.searchWapper}>
          <h1 className={style.title}>PickFA</h1>
          <div className={style.form}>
            <form
              className={style.searchForm}
              onMouseMove={() => setFocuseInput(true)}
              onMouseLeave={() => setFocuseInput(false)}
              onSubmit={submit}
              style={{ height: focusInput ? "15rem" : "100%" }}
            >
              <div className={style.search}>
                <div className={style.searchImg}>
                  <Image
                    src={SearchImg}
                    layout="responsive"
                    alt="선수 검색 이미지"
                  />
                </div>
                <input
                  className={style.input}
                  onChange={onChangePlayer}
                  placeholder="ex) 손흥민, 박주영"
                  value={player.player}
                  type="sumbit"
                />
              </div>
              {focusInput && (
                <div className={style.more}>
                  <div className={style.season}>
                    <div>시즌</div>
                    {seasons.map((season, i) => {
                      return (
                        <button
                          style={{
                            opacity: more.season.includes(season.seasonId)
                              ? "1"
                              : "0.3",
                          }}
                          onClick={() => selectSeason(season.seasonId)}
                          className={style.seasonBtn}
                          key={`시즌: ${i}`}
                          type="button"
                        >
                          <Image
                            src={season.seasonImg}
                            alt={"시즌이미지"}
                            width="100%"
                            height="100%"
                            layout="responsive"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
