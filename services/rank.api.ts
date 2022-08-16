import AllPlayerService from "./allPlayer.api";
import { getMethod } from "./http";

export default class RankService extends AllPlayerService {
  public async getCurrentPage(cur_page: string, c: string) {
    return await getMethod(`rank/all?current_page=${cur_page}&count=${c}`);
  }

  public async getTotalRankCount() {
    return await getMethod(`rank/player/count`);
  }
}
