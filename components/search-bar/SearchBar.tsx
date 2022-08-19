import { SearchBarProps } from "@type/searchBar.type";
import Image from "next/image";
import style from "./searchBar.module.scss";
import Search from "@public/images/search.svg";
import Clean from "@public/images/clean.svg";

export default function SearchBar({
  player,
  onChangePlayer,
  submit,
}: SearchBarProps) {
  return (
    <form
      className={style.searchbar}
      onSubmit={async (e: React.SyntheticEvent) => submit(e)}
    >
      <input
        value={player}
        placeholder="선수이름"
        onChange={onChangePlayer}
        className={style.input}
      />
      {player.length ? (
        <div className={style.clean}>
          <button className={style.cleanBtn}>
            <Image src={Clean} alt="none" layout="responsive" />
          </button>
          <span className={style.span}></span>
        </div>
      ) : (
        <></>
      )}
      <button className={style.button} type="submit">
        <Image src={Search} alt="none" layout="responsive" />
      </button>
    </form>
  );
}
