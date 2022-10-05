import Image from "next/image";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
} from "@mui/material";

import Btn from "@public/images/inquiry.png";
import style from "./inquiry.module.scss";
import { TransitionProps } from "@mui/material/transitions/transition";
import React from "react";
import useInput from "@hooks/useInput";
import MailService from "@services/mail.api";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Inquiry() {
  const mailService = new MailService();

  const [open, setOpen] = useState(false);
  const [text, setText] = useInput({ text: "", mail: "" });

  const redirectInquiry = () => {
    setOpen(true);
  };

  const onChangeText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    setText(type, e.target.value);
  };

  const sendMail = async () => {
    setOpen(false);
    await mailService.sendQuestion(text.text, text.mail);
  };

  return (
    <div className={style.inquiry}>
      <Image
        className={style.btn}
        width={"30px"}
        height={"30px"}
        src={Btn}
        alt="질문 클릭 버튼"
        layout="fixed"
        onClick={redirectInquiry}
      />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>문의하기</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            안녕하세요. PickFA개발자 김재훈입니다. 개인적인 문의는 여기에
            남겨주세요. 감사합니다
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="문의사항"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => onChangeText(e, "text")}
            value={text.text}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="회신 받을 이메일"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => onChangeText(e, "mail")}
            value={text.mail}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => setOpen(false)}
          >
            취소
          </Button>
          <Button color="success" variant="contained" onClick={sendMail}>
            보내기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
