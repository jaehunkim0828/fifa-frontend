/* eslint-disable @next/next/no-img-element */
import { useResize } from "@hooks/useResize";
import { PlayerCardProps } from "@type/playerCard";
import { useEffect, useState } from "react";
import style from "./playerCard.module.scss";

export default function PlayerCard({ unit }: PlayerCardProps) {
  const window = useResize();

  const [size, setSize] = useState(0);

  useEffect(() => {
    if (window.nowWidth <= 650) {
      setSize(75);
      return;
    } else if (window.nowWidth <= 1000) {
      setSize(100);
      return;
    }
    setSize(125);
  }, [window]);

  return (
    <div
      style={{ width: `${size}px`, height: `${size * 1.6}px` }}
      className={style.standard}
    >
      <img className={style.border} src={unit.border} alt="선수 테두리" />
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
        alt="선수 이미지"
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
        alt="선수 국가"
      />
      <img
        style={{
          width: `${size * 0.15}px`,
          left: `${size * 0.1}px`,
          top: `${size * 0.97}px`,
        }}
        className={style.seasonImg}
        src={unit.seasonImg}
        alt="선수 시즌 이미지"
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
