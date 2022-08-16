import Detail from "@components/detail/Detail";
import PlayerList from "@components/player-list/PlayerList";
import { PlayerInformationProps } from "@type/playerInformation";
import style from "./playerInformation.module.scss";

export default function PlayerInformation({
  spid,
  seleteOptions,
  showPlayerGraph,
  name,
  status,
  ranks,
  comparedThumb,
  setComparedThumb,
}: PlayerInformationProps) {
  return (
    <div className={style.playerRanksWapper}>
      <div className={style.detail}>
        {spid !== "" ? (
          <Detail
            seleteOptions={seleteOptions}
            showPlayerGraph={showPlayerGraph}
            name={name}
            status={status}
          />
        ) : (
          <></>
        )}
      </div>
      <div className={style.playerRanks}>
        <PlayerList
          players={ranks}
          comparedThumb={comparedThumb}
          setComparedThumb={setComparedThumb}
        />
      </div>
    </div>
  );
}
