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

  useEffect(() => {
    const commentService = new CommentService();

    const getNoticeComments = async () => {
      // postid 1번은 질문 게시글입니다.
      const comments = await commentService.findComments(1);
      dispatch(findComment(comments));
    };

    getNoticeComments();
  }, [dispatch]);

  return (
    <div className={style.questionContainer}>
      <div className={style.questionWapper}>
        <h1 className={style.title}>하고 싶은 말들은 공유해주세요!</h1>
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
