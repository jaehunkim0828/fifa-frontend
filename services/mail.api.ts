import { postMethod } from "./http";

export default class MailService {
  public async sendQuestion(question: string) {
    return await postMethod("mail/inquiry", {
      question,
    });
  }
}
