import { memo, useState } from "react";
import Image from "next/image";

import style from "./pagination.module.scss";
import { PaginationProps } from "@type/pagination.type";
import left from "../../public/images/left_arrow.png";
import right from "../../public/images/right_arrow.png";
import PaginationService from "@services/pagination.api";
import pnData from "@data/pagination.json";
import { PlayerInfo } from "@type/player.type";

export default memo(function Pagination({
  totalCount,
  count,
  setRanks,
  player,
}: PaginationProps) {
  const [curPage, setCurpage] = useState(1);
  const [skip, setSkip] = useState(0);

  const paginationService = new PaginationService();

  const getCurrentPage = async (cur_page: number) => {
    let c = count;
    const ranksData: PlayerInfo[] = await paginationService.getCurrentPage(
      cur_page,
      c,
      player
    );

    setRanks(ranksData);
    setCurpage(+cur_page);
  };

  const handlePaginationNumbers = () => {
    let range: number = count;

    if (Math.floor(Math.floor(totalCount / count) / count) === 0) {
      range = Math.ceil(totalCount / count);
    } else if (Math.floor(Math.floor(totalCount / count) / count) <= skip) {
      range = Math.ceil(((skip + 1) * count ** 2 - totalCount) / count);
    }

    console.log(range);
    return Array(+range)
      .fill(skip * count)
      .map((v, i) => {
        return v + i + 1;
      });
  };

  const changePages = (route: "back" | "front") => {
    let next = route === "back" ? -1 : 1;
    let reNumber = (Math.ceil(curPage / count) + next) * count - 8;

    getCurrentPage(reNumber);
    setCurpage(reNumber);
    setSkip(prev => prev + next);
  };

  return (
    <div className={style.pagination}>
      {skip > 0 && (
        <div className={style.number} onClick={() => changePages("back")}>
          <Image src={left} layout="responsive" alt="none" />
        </div>
      )}
      <div className={style.numbers}>
        {handlePaginationNumbers().map((number, i) => {
          return (
            <button
              onClick={() => getCurrentPage(number)}
              style={curPage === number ? pnData.currentStyle : {}}
              className={style.number}
              key={i}
            >
              {number}
            </button>
          );
        })}
      </div>
      {totalCount > (skip + 1) * count ** 2 && (
        <div className={style.number} onClick={() => changePages("front")}>
          <Image
            src={right}
            width="100%"
            height="100%"
            layout="responsive"
            alt="none"
          />
        </div>
      )}
    </div>
  );
});
