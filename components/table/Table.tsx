import { CircularProgress, Grid, Skeleton } from "@mui/material";
import { TableProps } from "@type/table.type";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Select from "react-select";

import json from "@data/table.json";
import style from "./table.module.scss";
import TableService from "@services/table.api";

export default function Table(props: TableProps) {
  const tableService = new TableService();

  const {
    spid,
    name,
    isImgLoding,
    image,
    part,
    desc,
    seasonImg,
    power,
    price,
  } = props;

  const [nowPrice, setNowPrice] = useState(price);

  const changeRating = async (e: { value: number; label: string }) => {
    console.log(e.value);
    const bp = await tableService.getPlayerPrice(spid, e.value);
    setNowPrice(bp);
  };

  useEffect(() => {
    setNowPrice(price);
  }, [price]);

  return (
    <>
      {isImgLoding ? (
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
      ) : (
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
                {!isImgLoding ? (
                  <Image src={image} alt="none" width="150px" height="150px" />
                ) : (
                  <CircularProgress />
                )}
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                {price === "" ? (
                  <Skeleton
                    variant="rounded"
                    sx={{
                      fontSize: "1rem",
                      width: "10rem",
                      height: "1.5rem",
                      margin: "auto",
                    }}
                  />
                ) : (
                  <>
                    <div>{`${nowPrice}BP`}</div>
                  </>
                )}
              </td>
            </tr>
            <tr>
              <td>강화</td>
              <td>
                <div>
                  <Select
                    isDisabled={price !== "" ? false : true}
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
                {seasonImg ? (
                  <Image src={seasonImg} alt="seeson" width="30" height="24" />
                ) : (
                  <CircularProgress />
                )}
              </td>
            </tr>
            <tr>
              <td>포지션</td>
              <td>{part}</td>
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
      )}
    </>
  );
}
