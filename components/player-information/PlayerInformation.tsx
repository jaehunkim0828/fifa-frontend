import Detail from "@components/detail/Detail";
import PlayerList from "@components/player-list/PlayerList";
import RatingPlayer from "@components/rating-player/RatingPlayer";
import { PlayerInformationProps } from "./playerInformation.type";
import { useState } from "react";
import style from "./playerInformation.module.scss";
import json from "@data/playerThumb.json";
import { Dialog } from "@mui/material";
import Pagination from "@components/pagination/Pagination";
import { useResize } from "@hooks/useResize";

export default function PlayerInformation({
  stats,
  ranks,
  average,
  showPlayerGraph,
  setdLoading,
  totalCount,
  count,
  setRanks,
  search,
  detail: { open, setOpen },
}: PlayerInformationProps) {
  const [loading, setLoading] = useState(false);
  const { nowWidth } = useResize();

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
      <div className={style.players}>
        {nowWidth > 1000 ? (
          <div className={style.thumbInfo}>
            <div className={style.name}>
              <div>시즌</div>
              <div>선수명</div>
            </div>
            <div className={style.more}>
              <div>OVR</div>
              <div>포지션</div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <PlayerList
          players={ranks}
          loading={loading}
          setdLoading={setdLoading}
          setLoading={setLoading}
        />
        <Pagination
          totalCount={totalCount}
          count={count}
          setRanks={setRanks}
          search={search}
        />
      </div>
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
