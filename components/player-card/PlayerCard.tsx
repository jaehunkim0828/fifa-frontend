/* eslint-disable @next/next/no-img-element */
import { PlayerCardProps } from "@type/playerCard";
import style from "./playerCard.module.scss";

export default function PlayerCard({ unit }: PlayerCardProps) {
  const size = 125;

  return (
    <div
      style={{ width: `${size}px`, height: `${size * 1.6}px` }}
      className={style.standard}
    >
      <img className={style.border} src={unit.border} alt="player-border" />
      <div
        style={{
          fontSize: `${size * 0.1}px`,
          left: `${size * 0.1}px`,
          top: `${size * 0.3}px`,
        }}
        className={style.ovr}
      >
        {unit.ovr}
      </div>
      <div
        style={{
          fontSize: `${size * 0.1}px`,
          left: `${size * 0.1}px`,
          top: `${size * 0.45}px`,
        }}
        className={style.position}
      >
        {unit.position}
      </div>
      <img
        style={{
          width: `${size * 0.7}px`,
          bottom: `${size * 0.41}px`,
          left: `${size * 0.3}px`,
        }}
        src={unit.image}
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
        src={unit.nation}
        alt="player-nation"
      />
      <img
        style={{
          width: `${size * 0.15}px`,
          left: `${size * 0.1}px`,
          top: `${size * 0.97}px`,
        }}
        className={style.seasonImg}
        src={unit.seasonImg}
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
          {unit.name}
        </div>
      </div>
      <div
        style={{
          bottom: `${size * 0.07}px`,
        }}
        className={style.payWrapper}
      >
        <div
          style={{
            width: `${size * 0.15}px`,
            height: `${size * 0.15}px`,
          }}
          className={style.pay}
        >
          <div
            style={{
              width: `${size * 0.15}px`,
              height: `${size * 0.15}px`,
              fontSize: `${size * 0.04}px`,
            }}
            className={style.payIn}
          >
            {unit.pay}
          </div>
        </div>
      </div>
    </div>
  );
}
