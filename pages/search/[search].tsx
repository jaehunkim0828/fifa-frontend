import { useRouter } from "next/router";

import AllPlayer from "@components/all-player/allPlayer";
import Seo from "@components/rest/Seo";
import { useEffect, useState } from "react";
import PlayerService from "@services/player.api";

export default function Search() {
  const router = useRouter();
  const count = 9;

  const [info, setInfo] = useState([]);
  const { search: name } = router.query as {
    search: string;
  };

  useEffect(() => {
    if (name) {
      const playerService = new PlayerService();

      const getPlayerInfo = async () => {
        const data = await playerService.getPlayersByName(name, 0, 9);
        if (data.length === 0) {
          window.alert("찾는 선수가 없습니다. 다시 검색해주세요");
          router.push("/");
        }
        setInfo(data === "" ? [] : data);
      };

      getPlayerInfo();
    }
  }, [name]);

  return (
    <>
      <Seo title={name} />
      <div>
        <AllPlayer playersInitial={info} count={count} current_page={0} />
      </div>
    </>
  );
}
