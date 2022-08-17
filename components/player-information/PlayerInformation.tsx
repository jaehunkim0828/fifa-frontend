import Detail from "@components/detail/Detail";
import PlayerList from "@components/player-list/PlayerList";
import { PlayerInformationProps } from "@type/playerInformation";
import style from "./playerInformation.module.scss";

export default function PlayerInformation({
  statses,
  seleteOptions,
  showPlayerGraph,
  ranks,
}: PlayerInformationProps) {
  return (
    <div className={style.playerRanksWapper}>
      <div className={style.detail}>
        {Object.keys(statses).length !== 0 ? (
          <Detail
            seleteOptions={seleteOptions}
            showPlayerGraph={showPlayerGraph}
            statses={statses}
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
