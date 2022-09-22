import { getMethod } from "./http";

export default class TableService {
  public async getPlayerPrice(spid: string, rating: number) {
    return getMethod(`value?spid=${spid}&rating=${rating}`);
  }
}
