import Notice from "@components/notice/Notice";
import Layout from "@components/rest/Layout";
import StartSearch from "@components/start-search/StartSearch";
import { postMethod } from "@services/http";
import { useEffect } from "react";

const Search = ({ isMobile }: any) => {
  useEffect(() => {
    const welcomeSend = async () => {
      const ipData = await fetch("https://geolocation-db.com/json/");
      const locationIp = await ipData.json();
      await postMethod(`mail/connectUser`, {
        ip: locationIp.IPv4,
      });
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
