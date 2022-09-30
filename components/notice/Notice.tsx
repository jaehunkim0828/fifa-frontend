import React, { useEffect, useState } from "react";

import { RootState, useAppSelector, useAppDispatch } from "@store/index";
import Question from "@components/question/Question";
import { QuestionStatus } from "@type/question.type";
import style from "./notice.module.scss";
import CommentForm from "@components/comment-form/CommentForm";
import CommentService from "@services/comment.api";
import { findComment } from "@store/slices/commentSlice";

export default function Notice() {
  const dispatch = useAppDispatch();
  const { comment } = useAppSelector((state: RootState) => state.comment);

  const [role, setRole] = useState<"admin" | "user">("user");

  useEffect(() => {
    const commentService = new CommentService();

    const getNoticeComments = async () => {
      // postid 1번은 질문 게시글입니다.
      const comments = await commentService.findComments(1);
      dispatch(findComment(comments));
      console.log(comments);
    };

    getNoticeComments();
    const role = localStorage.getItem("role");

    setRole(prev => (role === "admin" ? "admin" : prev));
  }, [dispatch]);

  return (
    <div className={style.questionContainer}>
      <div className={style.questionWapper}>
        <strong className={style.title}>불편한점이 있을까요?</strong>
        <CommentForm postId={1} />
        <div className={style.questionList}>
          {comment.map((quesion: QuestionStatus, i) => (
            <Question key={`question: ${i}`} question={quesion} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
