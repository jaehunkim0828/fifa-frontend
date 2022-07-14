import { getMethod } from "./http";

export default class PlayerService {
  public async getPlayersByName(player: string) {
    return getMethod(`player/spid/${encodeURI(player)}`);
  }
}
