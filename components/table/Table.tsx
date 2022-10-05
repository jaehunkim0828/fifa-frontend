import { CircularProgress, Grid, Skeleton } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Select from "react-select";

import { TableProps } from "@type/table.type";
import json from "@data/table.json";
import style from "./table.module.scss";
import ValueService from "@services/value.api";
import NonPerson from "@public/images/nonperson.png";

export default function Table(props: TableProps) {
  const valueService = new ValueService();

  const { spid, name, image, desc, seasonImg, power } = props;

  const [nowPrice, setNowPrice] = useState("");
  const [priceDate, setPriceDate] = useState("");

  const changeRating = async (e: { value: number; label: string }) => {
    const { price, date } = await valueService.getPlayerPrice(spid, e.value);
    const nowdate = new Intl.DateTimeFormat("kr").format(
      new Date(date.split("T")[0])
    );
    setPriceDate(nowdate);
    setNowPrice(price);
  };

  useEffect(() => {
    const valueService = new ValueService();

    const getPrice = async (spid: string) => {
      const { date, price } = await valueService.getPlayerPrice(spid, 1);
      const nowdate = new Intl.DateTimeFormat("kr").format(
        new Date(date.split("T")[0])
      );
      setPriceDate(nowdate);
      setNowPrice(price);
    };

    getPrice(spid);
  }, [spid]);

  return (
    <>
      {seasonImg ? (
        <table className={style.tableContainer}>
          <thead>
            <tr>
              <th colSpan={2}>{name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={2}
                className={style.playerImage}
                style={{ width: "150px", height: "150px" }}
              >
                <Image
                  src={image}
                  alt="선수 이미지"
                  width="150px"
                  height="150px"
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                {nowPrice === "" ? (
                  <>
                    <div>가격 업데이트중</div>
                    <CircularProgress />
                  </>
                ) : (
                  <>
                    <div>
                      {`${nowPrice}BP`}
                      <span>{`(${priceDate}기준)`}</span>
                    </div>
                  </>
                )}
              </td>
            </tr>
            <tr>
              <td>강화</td>
              <td>
                <div>
                  <Select
                    isDisabled={nowPrice !== "" ? false : true}
                    instanceId={2}
                    defaultValue={json.selectOption[0]}
                    options={json.selectOption}
                    //여기서 가격 다시 조회하기
                    onChange={(e: any) => changeRating(e)}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>시즌</td>
              <td>
                <Image
                  src={seasonImg ?? NonPerson}
                  alt="선수 시즌 이미지"
                  width="30"
                  height="24"
                />
              </td>
            </tr>
            <tr>
              <td>메인 포지션</td>
              <td>{desc}</td>
            </tr>
            <tr>
              <td>공격 등급</td>
              <td>
                <span>{`${power.attack.grade}급`}</span>
                <span>{`(${power.attack.score})`}</span>
              </td>
            </tr>
            <tr>
              <td>미드필드 등급</td>
              <td>
                <span>{`${power.assist.grade}급`}</span>
                <span>{`(${power.assist.score})`}</span>
              </td>
            </tr>
            <tr>
              <td>수비 등급</td>
              <td>
                <span>{`${power.defense.grade}급`}</span>
                <span>{`(${power.defense.score})`}</span>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <Grid container width={"20rem"} spacing={"0.1rem"}>
          <Grid item xs>
            <Skeleton variant="rectangular" width={"20rem"} height={"3rem"} />
          </Grid>
          <Grid item xs>
            <Skeleton variant="rectangular" width={"20rem"} height={"150px"} />
          </Grid>
          <Grid item xs>
            <Skeleton variant="rectangular" width={"20rem"} height={"3rem"} />
          </Grid>
          {Array(7)
            .fill(0)
            .map((_, i) => (
              <React.Fragment key={`Table: ${i}`}>
                <Grid item>
                  <Skeleton
                    variant="rectangular"
                    width={"9.9rem"}
                    height={"3rem"}
                  />
                </Grid>
                <Grid item>
                  <Skeleton
                    variant="rectangular"
                    width={"9.9rem"}
                    height={"3rem"}
                  />
                </Grid>
              </React.Fragment>
            ))}
        </Grid>
      )}
    </>
  );
}
