import { postMethod } from "./http";

export default class InquiryService {
  public async sendQuestion(question: string) {
    return await postMethod("mail/inquiry", {
      question,
    });
  }
}
