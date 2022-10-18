import { SearchBarProps } from "@type/searchBar.type";
import Image from "next/image";
import style from "./searchBar.module.scss";
import Search from "@public/images/search.svg";
import Clean from "@public/images/clean.svg";
import { useEffect, useRef, useState, forwardRef, ForwardedRef } from "react";
import SeasonService from "@services/season.api";
import positionJSON from "@data/position.json";
import { json } from "stream/consumers";

export default function SearchBar({
  player,
  setPlayer,
  onChangePlayer,
  submit,
  more,
  setMore,
  open,
}: SearchBarProps) {
  const [seasons, setSeason] = useState<
    { seasonId: number; seasonImg: string }[]
  >([]);

  const [focusInput, setFocusInput] = useState(false);

  const selectMore = (kind: string, kindId: number) => {
    if (more[kind].includes(kindId)) {
      const index = more[kind].indexOf(kindId);
      more[kind].splice(index, 1);
      setMore((prev: any) => ({
        ...prev,
        [kind]: more[kind],
      }));
      return;
    }
    setMore((prev: any) => ({
      ...prev,
      [kind]: [...prev[kind], kindId],
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
    <div
      className={style.container}
      style={{
        height: focusInput ? "15rem" : "3rem",
        zIndex: open ? "10" : "10000",
      }}
    >
      <form
        onMouseEnter={() => setFocusInput(true)}
        onMouseLeave={() => setFocusInput(false)}
        className={style.searchbar}
        onSubmit={async (e: React.SyntheticEvent) => submit(e)}
      >
        <div className={style.searchForm}>
          <span className={style.name}>선수이름</span>
          <input
            value={player}
            placeholder="ex)손흥민, 박주영"
            onChange={onChangePlayer}
            className={style.input}
          />
          {player.length ? (
            <div className={style.clean}>
              <button
                className={style.cleanBtn}
                type="button"
                onClick={() => setPlayer("player", "")}
              >
                <Image
                  src={Clean}
                  alt="선수 이름 전체 삭제하기"
                  layout="responsive"
                />
              </button>
              <span className={style.span}></span>
            </div>
          ) : (
            <></>
          )}
          <button className={style.button} type="submit">
            <Image
              src={Search}
              alt="선수 검색하기"
              width="30px"
              height="30px"
              layout="responsive"
            />
          </button>
        </div>
        {focusInput && (
          <More seasons={seasons} more={more} selectMore={selectMore} />
        )}
      </form>
    </div>
  );
}

const More = ({
  seasons,
  more,
  selectMore,
}: {
  seasons: { seasonId: number; seasonImg: string }[];
  more: {
    [x in string]: number[];
  };
  selectMore: (kind: string, value: number) => void;
}) => {
  return (
    <div className={style.more}>
      <div className={style.season}>
        <div className={style.moreTitle}>시즌</div>
        {seasons.map((season, i: any) => {
          return (
            <button
              style={{
                opacity: more.season.includes(season.seasonId) ? "1" : "0.3",
              }}
              onClick={() => selectMore("season", season.seasonId)}
              className={` ${style.seasonBtn}`}
              key={`시즌: ${i}-1`}
              type="button"
            >
              <Image
                src={season.seasonImg}
                className={""}
                alt={"시즌이미지"}
                width="100%"
                height="100%"
                layout="responsive"
              />
            </button>
          );
        })}
      </div>
      <div className={style.moreP}>
        <div className={style.moreTitle}>포지션</div>
        {positionJSON.kind.map((position, i) => (
          <div key={`포지션: ${i}`} className={` ${style.part}`}>
            <span>{positionJSON.part[i]}</span>
            <div className={style.desc}>
              {position.map((p, j) => (
                <button
                  style={{
                    color: more.position.includes(p.id) ? "#00ADB5" : "gray",
                  }}
                  onClick={() => selectMore("position", p.id)}
                  type="button"
                  className={style.item}
                  key={`part: ${j}`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
