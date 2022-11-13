/* eslint-disable @next/next/no-img-element */
import { useResize } from "@hooks/useResize";
import { PlayerCardProps } from "./playerCard.type";
import { useEffect, useState } from "react";
import style from "./playerCard.module.scss";

export default function PlayerCard({ unit }: PlayerCardProps) {
  const window = useResize();

  const [size, setSize] = useState(0);

  const [images, setImage] = useState(unit);

  const onError = (type: string) => {
    setImage(prev => ({
      ...prev,
      [type]: "/images/noneBig.png",
    }));
  };

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
      <img
        className={style.border}
        src={images.border}
        alt="선수 테두리"
        onError={e => {
          onError("bigSeason");
        }}
      />
      <div
        style={{
          fontSize: `${size * 0.1}px`,
          left: `${size * 0.1}px`,
          top: `${size * 0.3}px`,
        }}
        className={style.ovr}
      >
        {images.ovr}
      </div>
      <div
        style={{
          fontSize: `${size * 0.1}px`,
          left: `${size * 0.1}px`,
          top: `${size * 0.45}px`,
        }}
        className={style.position}
      >
        {images.position}
      </div>
      <img
        style={{
          width: `${size * 0.7}px`,
          bottom: `${size * 0.41}px`,
          left: `${size * 0.3}px`,
        }}
        src={images.image}
        alt="선수 이미지"
        onError={e => {
          onError("bigSeason");
        }}
        className={style.image}
      />
      <img
        style={{
          width: `${size * 0.15}px`,
          left: `${size * 0.1}px`,
          top: `${size * 0.6}px`,
        }}
        className={style.nation}
        src={images.nation}
        alt="선수 국가"
        onError={e => {
          onError("bigSeason");
        }}
      />
      <img
        style={{
          width: `${size * 0.2}px`,
          left: `${size * 0.072}px`,
          top: `${size * 0.93}px`,
        }}
        className={style.bigSeason}
        src={images.bigSeason}
        alt="선수 빅 시즌 이미지"
        onError={e => {
          onError("bigSeason");
        }}
      />
      <div
        style={{
          fontSize: `${size * 0.1}px`,
          bottom: `${size * 0.25}px`,
          width: `${size}px`,
        }}
        className={style.nameWrapper}
      >
        {window.nowWidth > 650 ? (
          <img
            style={{
              width: `${size * 0.1}px`,
              marginRight: `${size * 0.02}px`,
            }}
            className={style.seasonImg}
            src={images.seasonImg}
            onError={e => {
              onError("bigSeason");
            }}
            alt="선수 시즌 이미지"
          />
        ) : (
          <></>
        )}
        <div
          className={style.name}
          style={{
            fontSize: `${size * 0.1}px`,
          }}
        >
          {images.name}
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
              fontSize: `${size * 0.1}px`,
            }}
            className={style.payIn}
          >
            {images.salary}
          </div>
        </div>
      </div>
    </div>
  );
}
