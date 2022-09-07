import Image from "next/image";

import Graph from "@components/graph/Graph";
import { SinglePlayerProps } from "@type/singlePlayer.type";
import { useEffect, useState } from "react";
import style from "./singlePlayer.module.scss";
import SinglePlayerService from "@services/singlePlayer.api";
import { CircularProgress } from "@mui/material";
import { frontUrl } from "@services/http";
import Table from "@components/table/Table";

export default function SinglePlayer(props: SinglePlayerProps) {
  const { name, part, playerStats, spid, desc } = props;

  const [isImgLoding, setImgLogin] = useState(false);
  const [image, setImage] = useState(`${frontUrl}/images/nonperson.png`);

  useEffect(() => {
    const singlePlayerService = new SinglePlayerService();

    const getPlayerImage = async (spid: string) => {
      setImgLogin(true);
      const result = await singlePlayerService.getPlayerImageUrl(spid);
      setImgLogin(false);
      setImage(result);
    };

    getPlayerImage(spid);
  }, [spid]);

  return (
    <div className={style.singlePlayerContainer}>
      <div className={style.singlePlayerWapper}>
        <div className={style.intro}>
          <Table
            name={name}
            part={part}
            desc={desc}
            isImgLoding={isImgLoding}
            image={image}
            seasonImg={playerStats[name].seasonImg}
          />
        </div>
        <div className={style.graphContainer}>
          <Graph stats={playerStats} />
        </div>
      </div>
    </div>
  );
}
