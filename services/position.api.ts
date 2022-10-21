import { getMethod, postMethod } from "./http";

export default class PositionService {
  public async findPartByPlayer(spid: string) {
    return await getMethod(`position/part/${spid}`);
  }

  public async updatePoOfPlayer(spid: string) {
    return await postMethod(`position/update`, { spid });
  }
}
