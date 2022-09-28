import Image from "next/image";
import { useRouter } from "next/router";

import style from "./startSearch.module.scss";
import SearchImg from "@public/images/search.svg";
import useInput from "@hooks/useInput";

export default function StartSearch() {
  const router = useRouter();

  const [player, setPlayer] = useInput({ player: "" });

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    router.push({
      pathname: `/search/${player.player}`,
    });
  };

  const onChangePlayer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer("player", event.target.value);
  };

  return (
    <>
      <div className={style.searchContainer}>
        <div className={style.searchWapper}>
          <div className={style.title}>선수 검색하기</div>
          <form className={style.searchForm} onSubmit={submit}>
            <div className={style.searchImg}>
              <Image src={SearchImg} layout="responsive" alt="1" />
            </div>
            <input
              className={style.input}
              onChange={onChangePlayer}
              value={player.player}
              type="sumbit"
            />
          </form>
        </div>
      </div>
    </>
  );
}
