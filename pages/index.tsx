import Layout from "@components/rest/Layout";
import StartSearch from "@components/start-search/StartSearch";
import { getMethod } from "@services/http";
import { useEffect, useState } from "react";

const Search = ({ isMobile }: any) => {
  useEffect(() => {
    const welcomeSend = async () => {
      await getMethod("add/welcome");
    };

    welcomeSend();
  }, []);

  return (
    <Layout page="search" isMobile={isMobile}>
      <StartSearch />
    </Layout>
  );
};

export default Search;
