import { PositionPart } from "@type/playerThumb.type";
import { getMethod, postMethod } from "./http";

export default class PlayerService {
  public async getPlayersByName(
    player: string,
    current_page: number,
    count: number
  ) {
    return getMethod(
      `player/spid/${encodeURI(
        player
      )}?current_page=${current_page}&count=${count}`
    );
  }

  public async getMyTotalRankByPo(spid: string, value: number) {
    return getMethod(`rank/potential?spid=${spid}&po=${value}`);
  }

  public async getAverageStates(part: PositionPart) {
    return getMethod(`position/average/${part}`);
  }
}
