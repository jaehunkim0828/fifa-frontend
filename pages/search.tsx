import style from "../styles/search.module.scss";
import Player from "../components/player/Player";
import Seo from "@components/rest/Seo";
import { getMethod } from "@services/http";

const Search = () => {
  return (
    <>
      <Seo title={"Search"} />
      <div className={style.searchContainer}>
        <Player />
      </div>
    </>
  );
};

export default Search;
