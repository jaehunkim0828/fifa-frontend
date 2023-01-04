import { SearchBarProps, More } from "@components/search-bar/searchBar.type";
import Image from "next/image";
import style from "./searchBar.module.scss";
import { useEffect, useState } from "react";
import SeasonService from "@services/season.api";
import positionJSON from "@data/position.json";
import { postionColor, selectPostionColor } from "@data/playerThumb.data";
import seasonData from "@data/season.data.json";
import useMore, { initialMore, MoreType } from "@hooks/useMore";
import json from "@data/team.data.json";
import useInput from "@hooks/useInput";
import { useRouter } from "next/router";
import { useAppDispatch } from "@store/index";
import { resetSpidValue } from "@store/slices/spidSlice";
import { PositionStatus } from "@components/player-thumb/playerThumb.type";

export default function SearchBar({ open }: SearchBarProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [more, changeMore] = useMore(initialMore);
  const [focusInput, setFocusInput] = useState(false);
  const [player, setPlayer] = useInput({ player: "" });

  const onChangePlayer = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    setPlayer("player", value);
  };

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const m: {
      season?: string;
      name?: string;
      position?: string;
      nation?: string;
      team?: string;
    } = {};
    if (player.player) m.name = player.player;
    if (more.season.length) m.season = more.season.join(",");
    if (more.nation !== "") m.nation = more.nation;
    if (more.team !== "") m.team = more.team;
    if (more.position.length) m.position = more.position.join(",");

    setPlayer("player", "");
    router.replace({
      pathname: `/search`,
      query: m,
    });
    changeMore({});
    dispatch(resetSpidValue());
  };

  return (
    <div className={style.container}>
      <div
        style={{
          zIndex: open ? "10" : "10000",
        }}
        onMouseEnter={() => setFocusInput(true)}
        onMouseLeave={() => setFocusInput(false)}
        className={style.searchbar}
      >
        <form
          onSubmit={async (e: React.SyntheticEvent) => {
            submit(e);
            setFocusInput(false);
          }}
          className={style.searchForm}
        >
          <input
            value={player.player}
            placeholder="       ex)손흥민, 박주영"
            onChange={onChangePlayer}
            className={style.input}
          />
          <button className={style.button} type="submit">
            검색
          </button>
        </form>
        {focusInput && (
          <More
            seasons={seasonData.seasonImg}
            more={more}
            setMore={changeMore}
          />
        )}
      </div>
    </div>
  );
}

const More = ({
  seasons,
  more,
  setMore,
}: {
  seasons: { id: number; seasonImg: string; name: string }[];
  more: More;
  setMore: (m: { type: MoreType; value: any }) => void;
}) => {
  const [belongs, setBelongs] = useState(json);
  const [belong, setBelong] = useState({
    team: "",
    nation: "",
  });

  return (
    <div className={style.more}>
      <div className={style.selects}>
        {more.team !== "" && (
          <div className={style.selected}>
            <>{more.team}</>
            <button onClick={() => setMore({ type: MoreType.team, value: "" })}>
              X
            </button>
          </div>
        )}
        {more.nation !== "" && (
          <div className={style.selected}>
            <>{more.nation}</>
            <button
              onClick={() => setMore({ type: MoreType.nation, value: "" })}
            >
              X
            </button>
          </div>
        )}
      </div>
      <div className={style.belong}>
        <div className={style.nation}>
          <div className={style.moreTitle}>국적</div>
          <input
            type="input"
            className={style.input}
            placeholder="   국적명을 입력해주세요."
            value={belong.nation}
            onChange={e => {
              setBelong(prev => ({
                ...prev,
                nation: e.target.value,
              }));
              setBelongs(prev => {
                return {
                  ...prev,
                  nation: json.nation.filter(naiton =>
                    naiton.includes(e.target.value)
                  ),
                };
              });
            }}
          />
          {belong.nation !== "" && (
            <div className={style.dropDown}>
              {belongs.nation.map((nation, i) => (
                <button
                  onClick={() => {
                    setMore({ type: MoreType.nation, value: nation });
                    setBelong(prev => ({
                      ...prev,
                      nation: "",
                    }));
                  }}
                  type="button"
                  key={`nation: ${i}`}
                >
                  {nation}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className={style.team}>
          <div className={style.moreTitle}>소속팀</div>
          <div className={style.teamBox}>
            <div>
              <input
                className={`${style.input} ${style.teamInput}`}
                placeholder="   소속팀명을 입력해주세요."
                value={belong.team}
                onChange={e => {
                  setBelong(prev => ({
                    ...prev,
                    team: e.target.value,
                  }));
                  setBelongs(prev => {
                    return {
                      ...prev,
                      team: json.team.filter(team =>
                        team.includes(e.target.value)
                      ),
                    };
                  });
                }}
              />
              {belong.team !== "" && (
                <div className={style.dropDown}>
                  {belongs.team.map((team, i) => (
                    <button
                      onClick={() => {
                        setMore({ type: MoreType.team, value: team });
                        setBelong(prev => ({
                          ...prev,
                          team: "",
                        }));
                      }}
                      type="button"
                      key={`team: ${i}`}
                    >
                      {team}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={style.season}>
        <div className={style.moreTitle}>시즌</div>
        {seasons.map((season, i: any) => {
          return (
            <button
              style={{
                opacity: more.season.includes(season.id.toString())
                  ? "1"
                  : "0.3",
              }}
              onClick={() =>
                setMore({ type: MoreType.season, value: season.id.toString() })
              }
              className={style.seasonBtn}
              key={`시즌: ${i}-1`}
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
      <div className={style.moreP}>
        <div className={style.moreTitle}>포지션</div>
        {positionJSON.kind.map((position, i) => (
          <div key={`포지션: ${i}`} className={style.part}>
            <span
              style={{ ...postionColor(positionJSON.part[i]), width: "2rem" }}
            >
              {positionJSON.part[i]}
            </span>
            <div className={style.desc}>
              {position.map((p, j) => (
                <button
                  style={
                    more.position.includes(p.id.toString())
                      ? {
                          backgroundColor: selectPostionColor(
                            positionJSON.part[i]
                          ),
                          color: "white",
                          border: "none",
                        }
                      : { color: "gray" }
                  }
                  onClick={() =>
                    setMore({ type: MoreType.position, value: p.id.toString() })
                  }
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
