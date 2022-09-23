import { PositionPart } from "@type/playerThumb.type";
import { getMethod, postMethod } from "./http";

export default class PositionService {
  public async getAveragestats(part: PositionPart) {
    return getMethod(`position/average/${part}`);
  }
  public async findPartByPlayer(spid: string) {
    return await getMethod(`position/part/${spid}`);
  }

  public async updatePoOfPlayer(spid: string) {
    return await postMethod(`position/update`, { spid });
  }
}
