import Notice from "@components/notice/Notice";
import Layout from "@components/rest/Layout";
import StartSearch from "@components/start-search/StartSearch";
import { postMethod } from "@services/http";
import { GetServerSidePropsContext } from "next";
import { useEffect } from "react";

const Search = ({ isMobile, path }: any) => {
  return (
    <Layout page="Home" isMobile={isMobile} path={path}>
      <StartSearch />
    </Layout>
  );
};

export const getServerSideProps = async ({
  resolvedUrl,
}: GetServerSidePropsContext) => {
  return {
    props: {
      path: resolvedUrl,
    },
  };
};

export default Search;
