import Image from "next/image";
import { useRouter } from "next/router";

import style from "./startSearch.module.scss";
import SearchImg from "@public/images/search.svg";
import useInput from "@hooks/useInput";
import { useState } from "react";
import { useEffect } from "react";
import SeasonService from "@services/season.api";
import Logo from "@public/images/logo.png";
import SearchBar from "@components/search-bar/SearchBar";
import useMore, { initialMore } from "@hooks/useMore";

export default function StartSearch() {
  return (
    <>
      <div className={style.searchContainer}>
        <div className={style.searchWapper}>
          <div className={style.title}>
            <div className={style.logo}>
              <Image
                src={Logo}
                alt="PickFA-Logo"
                layout="responsive"
                priority
              />
            </div>
            <span>선수 데이터 웹사이트 분석</span>
          </div>
          <SearchBar />
        </div>
      </div>
    </>
  );
}
