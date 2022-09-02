import Detail from "@components/detail/Detail";
import PlayerList from "@components/player-list/PlayerList";
import { PlayerInformationProps } from "@type/playerInformation";
import style from "./playerInformation.module.scss";

export default function PlayerInformation({
  stats,
  seleteOptions,
  showPlayerGraph,
  ranks,
}: PlayerInformationProps) {
  return (
    <div className={style.playerRanksWapper}>
      <div className={style.detail}>
        {Object.keys(stats).length !== 0 ? (
          <Detail
            seleteOptions={seleteOptions}
            showPlayerGraph={showPlayerGraph}
            stats={stats}
          />
        ) : (
          <></>
        )}
      </div>
      <div className={style.playerRanks}>
        <PlayerList players={ranks} />
      </div>
    </div>
  );
}
