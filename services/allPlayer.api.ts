import { getMethod } from "./http";

export default class AllPlayerService {
  public async totalPlayerCount(name: string) {
    return getMethod(`player/count/${name}`);
  }

  public async getMyTotalRankByPo(spid: string, value: number) {
    return getMethod(`rank/potential?spid=${spid}&po=${value}`);
  }
}
