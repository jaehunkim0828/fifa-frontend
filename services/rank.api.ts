import { PositionMainPart } from "@type/position.type";
import { stringify } from "querystring";
import { getMethod, postMethod } from "./http";

export default class RankService {
  public async create(spid: string, name: string) {
    return await postMethod("rank", {
      matchtype: 50,
      spid,
      name,
    });
  }

  public async getAveragestats(part: PositionMainPart) {
    return getMethod(`rank/average/${part}`);
  }

  public async getTotalRankCount() {
    return await getMethod(`rank/player/count`);
  }

  public async getMyTotalRankByPo(spid: string, value: number) {
    return getMethod(`rank/potential?spid=${spid}&po=${value}`);
  }
}
