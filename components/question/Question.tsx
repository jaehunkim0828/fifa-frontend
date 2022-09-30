import React, { memo, useState } from "react";
import Image from "next/image";

import { CommnetStatus, QuestionStatus } from "@type/question.type";
import style from "./question.module.scss";
import parseDate from "@utils/date";
import Reply from "@public/images/reply.png";
import Delete from "@public/images/delete_comment.png";
import CommentForm from "@components/comment-form/CommentForm";
import { useAppDispatch } from "@store/index";
import { deleteComment } from "@store/slices/commentSlice";
import CommentService from "@services/comment.api";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

interface NextError extends Error {
  response: {
    data: string;
  };
}

function Comment({
  comment: { username, createAt, content, role, groupNum },
  origin,
  parents,
  me,
}: {
  comment: CommnetStatus;
  origin: boolean;
  parents?: number;
  me: number;
}) {
  const commentService = new CommentService();

  const dispatch = useAppDispatch();

  const [isreply, setIsreply] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [password, setPassword] = useState("");

  const clickReply = () => {
    setIsreply(!isreply);
  };

  const deleteCM = async (commentId: number, me: number, parents?: number) => {
    try {
      setIsDelete(false);
      await commentService.deleteComent(commentId, password);
      dispatch(deleteComment({ me, parents }));
    } catch (err) {
      window.alert("비밀번호가 틀렸습니다.");
    }
  };

  const handleClose = () => {
    setIsDelete(false);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className={style.commentContainer}>
      <div className={style.title}>
        <div className={style.firstLine}>
          <div className={style.writer}>
            <strong>{username}</strong>
            <div className={role === "admin" ? style.admin : ""}>
              {role === "admin" ? "개발자" : ""}
            </div>
          </div>
          <button onClick={() => setIsDelete(true)} className={style.deleteBtn}>
            <Image src={Delete} alt="" width={20} height={20} layout="fixed" />
          </button>
          <Dialog
            open={isDelete}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">댓글 삭제하기</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                정말 삭제하시겠습니까?
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="비밀번호"
                fullWidth
                variant="standard"
                onChange={onChangePassword}
                value={password}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>아니요</Button>
              <Button
                onClick={async () => {
                  const commetId = await commentService.findCommentByNumAndTime(
                    username,
                    createAt
                  );

                  deleteCM(commetId, me, parents);
                }}
                autoFocus
                color="success"
                variant="contained"
              >
                네
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className={style.date}>{parseDate(createAt)}</div>
      </div>
      <p className={style.content}>{content}</p>
      {origin && (
        <button className={style.replyBtn} onClick={clickReply}>
          댓글
        </button>
      )}
      {isreply && <CommentForm groupNum={groupNum} postId={1} />}
    </div>
  );
}

export default memo(function Quesiton({
  question,
  index,
}: {
  question: QuestionStatus;
  index: number;
}) {
  return (
    <div className={style.questionContainer}>
      <Comment comment={question} origin={true} me={index} />
      <div className={style.addChat}>
        {!!question.addChat.length && (
          <Image src={Reply} alt="" width={30} height={30} layout="fixed" />
        )}
        <div className={`${style.addChatList}`}>
          {question.addChat.map((cm: CommnetStatus, i) => (
            <Comment
              key={`+comment: ${i}`}
              comment={cm}
              origin={false}
              parents={index}
              me={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
