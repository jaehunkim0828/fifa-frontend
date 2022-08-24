import Seo from "@components/rest/Seo";
import StartSearch from "@components/startSearch/StartSearch";

const Search = () => {
  console.log(process.env.NODE_ENV);
  return (
    <>
      <Seo title={"Search"} />
      <StartSearch />
    </>
  );
};

export default Search;
