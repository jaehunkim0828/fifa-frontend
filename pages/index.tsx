import Layout from "@components/rest/Layout";
import Seo from "@components/rest/Seo";
import StartSearch from "@components/start-search/StartSearch";
import { useEffect, useState } from "react";

const Search = ({ isMobile }: any) => {
  const style = {
    display: "none",
  };

  return (
    <Layout page="search" isMobile={isMobile}>
      <StartSearch />
    </Layout>
  );
};

export default Search;
