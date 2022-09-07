import { CircularProgress } from "@mui/material";
import { TableProps } from "@type/table.type";
import Image from "next/image";

import style from "./table.module.scss";

export default function Table(props: TableProps) {
  const { name, isImgLoding, image, part, desc, seasonImg } = props;

  return (
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
          <td>시즌</td>
          <td>
            <Image src={seasonImg} alt="seeson" width="30" height="24" />
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
          <td>A급</td>
        </tr>
        <tr>
          <td>미드필드 등급</td>
          <td>A급</td>
        </tr>
        <tr>
          <td>수비 등급</td>
          <td>C급</td>
        </tr>
      </tbody>
    </table>
  );
}
