import { getMethod } from "./http";

export default class PaginationService {
  public async getCurrentPage(cur_page: number, c: number) {
    return await getMethod(`rank/all?current_page=${cur_page}&count=${c}`);
  }
}
