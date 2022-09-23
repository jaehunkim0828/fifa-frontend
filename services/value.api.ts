import { getMethod } from "./http";

export default class ValueService {
  public async getPlayerPrice(spid: string, rating: number) {
    return getMethod(`value?spid=${spid}&rating=${rating}`);
  }
}
