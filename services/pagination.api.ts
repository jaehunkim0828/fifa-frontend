import { getMethod } from "./http";

export default class PaginationService {
  public async getCurrentPage(cur_page: number, c: number, player?: string) {
    if (player) {
      return await getMethod(
        `player/spid/${encodeURI(player)}?current_page=${cur_page}&count=${c}`
      );
    } else {
      return await getMethod(`rank/all?current_page=${cur_page}&count=${c}`);
    }
  }
}
