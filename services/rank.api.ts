import { getMethod } from "./http";

export default class RankService {
  public async getCurrentPage(cur_page: number, c: number) {
    return await getMethod(`rank/all?current_page=${cur_page}&count=${c}`);
  }
}
