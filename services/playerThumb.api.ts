import { getMethod, postMethod } from "@services/http";
import { Ability, RankInput } from "@type/playerThumb.type";

// class로 묶기
export default class PlayerThumb {
  public async findRankBySpid(spid: string) {
    return await postMethod("rank", {
      matchtype: 50,
      spid,
    });
  }

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
  public async getMyTotalRankByPo(spid: string, value: number) {
    return getMethod(`rank/potential?spid=${spid}&po=${value}`);
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

        const playerRankResult = await this.createRank({
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

        console.log(playerRankResult.data);
      } catch (e) {
        if (e instanceof Error) {
          console.error(e);
        }
      }
    });
  }
}
