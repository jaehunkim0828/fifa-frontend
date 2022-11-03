import { SearchBarProps, More } from "@components/search-bar/searchBar.type";
import Image from "next/image";
import style from "./searchBar.module.scss";
import { useEffect, useState } from "react";
import SeasonService from "@services/season.api";
import positionJSON from "@data/position.json";
import { postionColor, selectPostionColor } from "@data/playerThumb.data";
import seasonData from "@data/season.data.json";
import { MoreType } from "@hooks/useMore";
import json from "@data/team.data.json";

export default function SearchBar({
  player,
  onChangePlayer,
  submit,
  more,
  setMore,
  open,
}: SearchBarProps) {
  const [focusInput, setFocusInput] = useState(false);

  return (
    <div className={style.container}>
      <form
        style={{
          zIndex: open ? "10" : "10000",
        }}
        onMouseEnter={() => setFocusInput(true)}
        onMouseLeave={() => setFocusInput(false)}
        className={style.searchbar}
        onSubmit={async (e: React.SyntheticEvent) => {
          submit(e);
          setFocusInput(false);
        }}
      >
        <div className={style.searchForm}>
          <input
            value={player}
            placeholder="       ex)손흥민, 박주영"
            onChange={onChangePlayer}
            className={style.input}
          />
          <button className={style.button} type="submit">
            검색
          </button>
        </div>
        {focusInput && (
          <More seasons={seasonData.seasonImg} more={more} setMore={setMore} />
        )}
      </form>
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
  const [teams, setTeams] = useState(json.team);
  const [teamName, setTeamName] = useState("");

  return (
    <div className={style.more}>
      {more.team === "" ? (
        <></>
      ) : (
        <div className={style.selected}>
          <>{more.team}</>
          <button onClick={() => setMore({ type: MoreType.team, value: "" })}>
            X
          </button>
        </div>
      )}
      <div className={style.belong}>
        <div className={style.nation}>
          <div className={style.moreTitle}>국적</div>
          <input
            className={style.input}
            placeholder="   국적명을 입력해주세요."
            value={more.nation}
            onChange={e =>
              setMore({ type: MoreType.nation, value: e.target.value })
            }
          />
        </div>
        <div className={style.team}>
          <div className={style.moreTitle}>소속팀</div>
          <div className={style.teamBox}>
            <div>
              <input
                className={`${style.input} ${style.teamInput}`}
                placeholder="   소속팀명을 입력해주세요."
                value={teamName}
                onChange={e => {
                  setTeamName(e.target.value);
                  setTeams(prev => {
                    return json.team.filter(team =>
                      team.includes(e.target.value)
                    );
                  });
                }}
              />
              {teamName === "" ? (
                <></>
              ) : (
                <div className={style.dropDown}>
                  {teams.map((team, i) => (
                    <button
                      onClick={() => {
                        setMore({ type: MoreType.team, value: team });
                        setTeamName("");
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
                    setMore({ type: MoreType.season, value: p.id.toString() })
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
