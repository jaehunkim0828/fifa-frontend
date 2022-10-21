import { QuestionStatus } from "@components/question/question.type";
import { postMethod, getMethod } from "./http";

export default class CommentService {
  public async createComment(commentData: QuestionStatus) {
    return await postMethod("comment/create", {
      ...commentData,
    });
  }

  public async findComments(postId: number) {
    return await getMethod(`comment/read/${postId}`);
  }

  public async findCommentByNumAndTime(
    username: string,
    createAt: Date
  ): Promise<number> {
    return await getMethod("comment/read/newid/id", {
      username,
      createAt: createAt,
    });
  }

  public async deleteComent(commentId: number, password: string) {
    return await getMethod(`comment/delete/${commentId}`, {
      password,
    });
  }
}
