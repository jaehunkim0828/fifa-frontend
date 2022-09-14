import { PositionPart } from "@type/playerThumb.type";
import { getMethod } from "./http";

export default class SinglePlayerService {
  public async getMyTotalRankByPo(spid: string, value: number) {
    return getMethod(`rank/potential?spid=${spid}&po=${value}`);
  }

  public async getAveragestats(part: PositionPart) {
    return getMethod(`position/average/${part}`);
  }

  public async getPlayerImageUrl(spid: string) {
    return getMethod(`player/image/${spid}`);
  }

  public async getPlayerPrice(spid: string) {
    return getMethod(`player/price/${spid}`);
  }
}
