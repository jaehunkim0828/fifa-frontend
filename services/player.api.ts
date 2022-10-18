import { getMethod } from "./http";

export default class PlayerService {
  public async getPlayers(
    {
      player,
      season,
      position,
    }: { player?: string; season?: string; position?: string },
    current_page: number,
    count: number
  ) {
    return getMethod(
      `player/spid/search?name=${encodeURI(player ?? "")}&season=${
        season ?? ""
      }&position=${position ?? ""}&current_page=${current_page}&count=${count}`
    );
  }

  public async totalPlayerCount({
    name,
    season,
    position,
  }: {
    name?: string;
    season?: string;
    position?: string;
  }) {
    return getMethod(
      `player/count/search?name=${name ?? ""}&season=${season ?? ""}&position=${
        position ?? ""
      }`
    );
  }

  public async getPlayerImageUrl(spid: string) {
    return getMethod(`player/image/${spid}`);
  }

  public async findCurrentPage(
    {
      player,
      season,
      position,
    }: { player: string; season: string; position: string },
    cur_page: number,
    c: number
  ) {
    return await getMethod(
      `player/spid/search?name=${encodeURI(player ?? "")}&season=${
        season ?? ""
      }&position=${position ?? ""}&current_page=${cur_page}&count=${c}`
    );
  }

  public async getPlayerByCr(spid: string) {
    return await getMethod(`player/external/${spid}`);
  }
}
