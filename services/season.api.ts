import { getMethod } from "./http";

export default class SeasonService {
  public async getSeason() {
    return await getMethod("season/all");
  }
}
