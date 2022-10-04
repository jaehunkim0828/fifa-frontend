/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

import style from "../styles/test.module.scss";
import { calculatePower } from "@util/grade";
import { useEffect } from "react";
import PlayerService from "@services/player.api";
import { useState } from "react";

const players = [
  {
    name: "네이마르",
    spid: "259190871",

    attact: 11,
    assist: 8,
    defense: 3,
  },
  {
    name: "크리스티아누 호날두",
    spid: "237020801",

    attact: 10,
    assist: 10,
    defense: 5,
  },
  {
    name: "리오넬 메시",
    spid: "220158023",

    attact: 5,
    assist: 6,
    defense: 1,
  },
];

export default function Test() {
  const [ps, setPs] = useState<any[]>([]);

  useEffect(() => {
    const playerService = new PlayerService();
    const getPlayers = async (players: any) => {
      for (let i = 0; i < players.length; i += 1) {
        const playerStandard = await playerService.getPlayerByCr(
          players[i].spid
        );

        playerStandard.name = players[i].name;
        setPs(prev => [...prev, playerStandard]);
      }
    };

    getPlayers(players);
  }, []);

  const size = 100;

  return (
    <div className={style.test}>
      <div className={style.container}>
        {ps.map((p, i) => (
          <div
            style={{ width: `${size}px`, height: `${size * 1.6}px` }}
            className={style.standard}
            key={`standard ${i}`}
          >
            <img className={style.border} src={p.border} alt="player-border" />
            <div
              style={{
                fontSize: `${size * 0.1}px`,
                left: `${size * 0.1}px`,
                top: `${size * 0.3}px`,
              }}
              className={style.ovr}
            >
              {p.ovr}
            </div>
            <div
              style={{
                fontSize: `${size * 0.1}px`,
                left: `${size * 0.1}px`,
                top: `${size * 0.45}px`,
              }}
              className={style.position}
            >
              {p.position}
            </div>
            <img
              style={{
                width: `${size * 0.7}px`,
                bottom: `${size * 0.41}px`,
                left: `${size * 0.3}px`,
              }}
              src={p.image}
              alt="player-image"
              className={style.image}
            />
            <img
              style={{
                width: `${size * 0.15}px`,
                left: `${size * 0.1}px`,
                top: `${size * 0.6}px`,
              }}
              className={style.nation}
              src={p.nation}
              alt="player-nation"
            />
            <img
              style={{
                width: `${size * 0.15}px`,
                left: `${size * 0.1}px`,
                top: `${size * 0.97}px`,
              }}
              className={style.seasonImg}
              src={p.seasonImg}
              alt="player-seasonImg"
            />
            <div
              style={{
                fontSize: `${size * 0.1}px`,
                bottom: `${size * 0.35}px`,
                width: `${size}px`,
              }}
              className={style.nameWrapper}
            >
              <div
                className={style.name}
                style={{
                  fontSize: `${size * 0.1}px`,
                }}
              >
                {p.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
