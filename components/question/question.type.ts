export interface QuestionStatus extends CommnetStatus {
  addChat?: CommnetStatus[];
}

export interface CommnetStatus {
  id?: number;
  username: string;
  content: string;
  role: "user" | "admin";
  createAt: Date;
  groupNum: number;
  hierarchy: 0 | 1;
  postId: number;
  password: string;
}
