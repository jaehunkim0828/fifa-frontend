import Layout from "@components/rest/Layout";
import StartSearch from "@components/start-search/StartSearch";
import { AppContext } from "next/app";
import { useEffect } from "react";
import { isMobile } from "react-device-detect";

const Search = ({ isMobile }: any) => {
  return (
    <Layout page="search" isMobile={isMobile}>
      <StartSearch />
    </Layout>
  );
};

export default Search;
