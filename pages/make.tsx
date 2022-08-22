/* eslint-disable @next/next/no-img-element */
import useInput from "@hooks/useInput";
import { getMethod } from "@services/http";
import Image from "next/image";
import { useEffect, useState } from "react";

import fs from "fs";

export default function Make() {
  const [json, setJson] = useState<any>({ selectedPlayer: [] });
  const [text, setText] = useInput("");
  const [players, setPlayers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const onClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const p = await getMethod(
      `player/spid/${encodeURI(text)}?current_page=${"0"}&count=${"0"}`
    );
    setPlayers(p);
    console.log(p);
  };

  const choosePlayer = (name: string, spid: number, img: string) => {
    setJson((prev: any) => ({
      selectedPlayer: [...prev.selectedPlayer, { name, spid, img }],
    }));
  };

  const makeFile = () => {
    json.selectedPlayer.map((e: any) => {
      delete e.img;
    });
    setIsOpen(!isOpen);
  };

  const deletePlayer = (i: number) => {
    json.selectedPlayer.splice(i, 1);
    setPlayers(prev => [...players]);
  };

  useEffect(() => {
    console.log(json);
  }, [json]);

  return (
    <div>
      <form>
        <input value={text} onChange={e => setText(e.target.value)} />
        <button onClick={onClick}>추가하기</button>
      </form>
      <div>
        <div>선수 목록</div>
        {players.map(
          (
            p: { name: string; id: number; season: { seasonImg: string } },
            i
          ) => (
            <button
              onClick={() => choosePlayer(p.name, p.id, p.season.seasonImg)}
              key={i}
              style={{ display: "flex" }}
            >
              <img
                src={p.season.seasonImg}
                alt="none"
                style={{ width: "1rem", height: "0.7rem" }}
              />
              <div>{p.name}</div>
              <div>{p.id}</div>
            </button>
          )
        )}
      </div>

      <div>
        <div>추가된 선수 목록</div>
        {json.selectedPlayer.map(
          (player: { name: string; spid: string; img: string }, i: number) => (
            <button onClick={() => deletePlayer(i)} key={i}>
              <img src={player.img} alt="none" />
              {`${player.name}  ${player.spid}`}
            </button>
          )
        )}
      </div>
      <button onClick={makeFile}>json 파일 생성하기</button>
      <div>{isOpen ? JSON.stringify(json) : ""}</div>
    </div>
  );
}
