import { PositionPart } from "@type/position.type";
import { getMethod, postMethod } from "./http";

export default class RankService {
  public async create(spid: string, name: string) {
    const data: { data: any[] } = await this.findRankBySpid(spid);
    return await postMethod("rank/potential", {
      player: data.data,
      name,
    });
  }

  public async getAveragestats(part: PositionPart) {
    return getMethod(`rank/average/${part}`);
  }

  public async findRankBySpid(spid: string) {
    return await postMethod("rank", {
      matchtype: 50,
      spid,
    });
  }

  public async findCurrentPage(cur_page: number, c: number) {
    return await getMethod(`rank/all?current_page=${cur_page}&count=${c}`);
  }

  public async getTotalRankCount() {
    return await getMethod(`rank/player/count`);
  }

  public async getMyTotalRankByPo(spid: string, value: number) {
    return getMethod(`rank/potential?spid=${spid}&po=${value}`);
  }
}
