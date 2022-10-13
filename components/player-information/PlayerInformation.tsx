import Detail from "@components/detail/Detail";
import PlayerList from "@components/player-list/PlayerList";
import RatingPlayer from "@components/rating-player/RatingPlayer";
import { PlayerInformationProps } from "@type/playerInformation";
import { useState } from "react";
import style from "./playerInformation.module.scss";
import json from "@data/playerThumb.json";
import { Dialog } from "@mui/material";

export default function PlayerInformation({
  stats,
  ranks,
  average,
  showPlayerGraph,
  setdLoading,
}: PlayerInformationProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className={style.playerRanksWapper}>
      <div className={style.detail}>
        {Object.keys(stats).length !== 0 ? (
          <RatingPlayer
            average={average}
            loading={loading}
            setLoading={setLoading}
            setOpen={setOpen}
          />
        ) : (
          <></>
        )}
      </div>
      <PlayerList players={ranks} loading={loading} setdLoading={setdLoading} />
      <Dialog
        open={open}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <Detail
          seleteOptions={json.seleteOptions}
          showPlayerGraph={showPlayerGraph}
          stats={stats}
        />
      </Dialog>
    </div>
  );
}
