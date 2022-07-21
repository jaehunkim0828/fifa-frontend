import style from "./pagination.module.scss";
import { useEffect, useState } from "react";
import { PaginationProps } from "@type/pagination.type";

export default function Pagination({
  totalCount,
  count,
  getCurrentPage,
}: PaginationProps) {
  // const [curPage, setCurpage] = useState(1);
  const [skip, setSkip] = useState(0);

  const handlePaginationNumbers = () => {
    let range: number = count;

    if (Math.floor(totalCount / count) === 0) {
      range = Math.ceil(((skip + 1) * count ** 2 - totalCount) / count);
    } else if (Math.floor(Math.floor(totalCount / count) / count) <= skip) {
      range = Math.ceil(((skip + 1) * count ** 2 - totalCount) / count);
    }

    return Array(range)
      .fill(skip * count)
      .map((v, i) => {
        return v + i + 1;
      });
  };

  const changePages = (route: "back" | "front") => {
    route === "back" ? setSkip(prev => prev - 1) : setSkip(prev => prev + 1);
  };

  return (
    <div className={style.pagination}>
      {skip > 0 && (
        <div className={style.number} onClick={() => changePages("back")}>
          이전
        </div>
      )}
      <div className={style.numbers}>
        {handlePaginationNumbers().map((number, i) => {
          return (
            <button
              onClick={() => getCurrentPage(number)}
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
          이후
        </div>
      )}
    </div>
  );
}
