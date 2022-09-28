import useInput from "@hooks/useInput";
import React, { useEffect } from "react";
import style from "./commentForm.module.scss";
import { useAppDispatch } from "@store/index";
import { createComment } from "@store/slices/commentSlice";
import { QuestionStatus } from "@type/question.type";
import CommentService from "@services/comment.api";

export default function CommentForm({
  groupNum,
  role,
  postId,
}: {
  groupNum?: number;
  role: "user" | "admin";
  postId: number;
}) {
  const commentService = new CommentService();

  const [question, setQuestion] = useInput<QuestionStatus>({
    username: "",
    content: "",
    groupNum: groupNum ?? 0,
    role,
    createAt: new Date(),
    addChat: [],
    hierarchy: groupNum ? 1 : 0,
    password: "",
    postId,
  });

  const dispatch = useAppDispatch();

  const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion("content", e.target.value);
  };

  const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion("username", e.target.value);
  };

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion("password", e.target.value);
  };

  const submit = async () => {
    if (!question.password.length) {
      window.alert("비밀번호 입력해주세요.");
    } else if (!question.content.length || !question.username.length) {
      window.alert("이름 또는 내용을 적어주세요.");
    } else {
      dispatch(createComment({ ...question, createAt: new Date() }));

      await commentService.createComment({ ...question, createAt: new Date() });
      setQuestion();
    }
  };

  useEffect(() => {
    setQuestion("role", role);
  }, [role, setQuestion]);

  return (
    <>
      <div className={style.form}>
        <input
          className={style.username}
          onChange={changeUsername}
          value={question.username}
          placeholder="작성자"
        />

        <input
          className={style.username}
          onChange={changePassword}
          value={question.password}
          placeholder="비밀번호"
        />
        <textarea
          value={question.content}
          onChange={changeContent}
          className={style.content}
          placeholder="내용"
        />
        <button onClick={submit} className={style.btn}>
          작성 완료
        </button>
      </div>
    </>
  );
}
