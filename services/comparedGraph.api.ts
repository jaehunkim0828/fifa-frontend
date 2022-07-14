import { Thumb } from "@type/playerThumb.type";
import { getMethod } from "./http";

export default class ComparedGraph {
  public async getPlayer(player1: Thumb, value: number) {
    return getMethod(`rank/potential?spid=${player1.spid}&po=${value}`);
  }

  public async getTotalRank(playerId: number) {
    return getMethod(`rank/potential?spid=${playerId}&po=${"50"}`);
  }
}
