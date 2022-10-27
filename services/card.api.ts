import { getMethod } from "./http";

export default class CardService {
  public async findCard(spid: string) {
    return await getMethod("card/spid", {
      spid,
    });
  }
}
