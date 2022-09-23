import { Ability, RankInput } from "@type/playerThumb.type";
import { getMethod, postMethod } from "./http";

export default class RankService {
  public async createRank(rankInput: RankInput) {
    const {
      spid,
      position,
      name,
      assist,
      block,
      dribble,
      dribbleSuccess,
      dribbleTry,
      effectiveShoot,
      goal,
      matchCount,
      passSuccess,
      passTry,
      shoot,
      tackle,
      createDate,
    } = rankInput;

    return postMethod("rank/potential", {
      spid,
      position,
      name,
      assist,
      block,
      dribble,
      dribbleSuccess,
      dribbleTry,
      effectiveShoot,
      goal,
      matchCount,
      passSuccess,
      passTry,
      shoot,
      tackle,
      createDate,
    });
  }

  public async create(spid: string, name: string) {
    const data: { data: any[] } = await this.findRankBySpid(spid);
    data.data.forEach(async (e: Ability, i: number) => {
      try {
        const {
          spId,
          spPosition,
          createDate,
          status: {
            assist,
            block,
            dribble,
            dribbleSuccess,
            dribbleTry,
            effectiveShoot,
            goal,
            matchCount,
            passSuccess,
            passTry,
            shoot,
            tackle,
          },
        } = e;

        await this.createRank({
          spid: spId,
          position: spPosition,
          createDate,
          assist,
          name,
          block,
          dribble,
          dribbleSuccess,
          dribbleTry,
          effectiveShoot,
          goal,
          matchCount,
          passSuccess,
          passTry,
          shoot,
          tackle,
        });
      } catch (e) {
        if (e instanceof Error) {
          console.error(e);
        }
      }
    });
  }

  public async findRankBySpid(spid: string) {
    return await postMethod("rank", {
      matchtype: 50,
      spid,
    });
  }

  public async findCurrentPage(cur_page: number, c: number) {
    return await getMethod(`rank/all?current_page=${cur_page}&count=${c}`);
  }

  public async getTotalRankCount() {
    return await getMethod(`rank/player/count`);
  }

  public async getMyTotalRankByPo(spid: string, value: number) {
    return getMethod(`rank/potential?spid=${spid}&po=${value}`);
  }
}
