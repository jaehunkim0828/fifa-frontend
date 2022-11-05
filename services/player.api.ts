import { getMethod } from "./http";

type Player = {
  [x in string]?: string;
};

export default class PlayerService {
  public async getPlayers(
    { player, season, position, nation, team }: Player,
    current_page: number,
    count: number
  ) {
    return getMethod(
      `player/spid/search?name=${encodeURI(player ?? "")}&season=${
        season ?? ""
      }&position=${position ?? ""}&nation=${encodeURI(
        nation ?? ""
      )}&team=${encodeURI(
        team ?? ""
      )}&current_page=${current_page}&count=${count}`
    );
  }

  public async totalPlayerCount({
    name,
    season,
    position,
    nation,
    team,
  }: {
    name?: string;
    season?: string;
    position?: string;
    nation?: string;
    team?: string;
  }) {
    return getMethod(
      `player/count/search?name=${name ?? ""}&season=${season ?? ""}&position=${
        position ?? ""
      }&nation=${nation ?? ""}&team=${team ?? ""}`
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
      nation,
      team,
    }: {
      player: string;
      season: string;
      position: string;
      nation: string;
      team: string;
    },
    cur_page: number,
    c: number
  ) {
    return await getMethod(
      `player/spid/search?name=${encodeURI(player ?? "")}&season=${
        season ?? ""
      }&position=${position ?? ""}&nation=${nation ?? ""}&team=${
        team ?? ""
      }&current_page=${cur_page}&count=${c}`
    );
  }

  public async getPlayerByCr(spid: string) {
    return await getMethod(`player/external/${spid}`);
  }
}
