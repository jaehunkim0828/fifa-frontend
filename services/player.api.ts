import { PositionPart } from "@type/playerThumb.type";
import { getMethod, postMethod } from "./http";

export default class PlayerService {
  public async getPlayersByName(
    player: string,
    current_page: number,
    count: number
  ) {
    return getMethod(
      `player/spid/${encodeURI(
        player
      )}?current_page=${current_page}&count=${count}`
    );
  }
}
