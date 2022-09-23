import { getMethod } from "./http";

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

  public async totalPlayerCount(name: string) {
    return getMethod(`player/count/${name}`);
  }

  public async getPlayerImageUrl(spid: string) {
    return getMethod(`player/image/${spid}`);
  }

  public async findCurrentPage(names: string, cur_page: number, c: number) {
    return await getMethod(
      `player/spid/${encodeURI(names)}?current_page=${cur_page}&count=${c}`
    );
  }
}
