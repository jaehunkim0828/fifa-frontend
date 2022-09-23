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
  const [text, setText] = useInput("");

  const redirectInquiry = () => {
    setOpen(true);
  };

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const sendMail = async () => {
    setOpen(false);
    await mailService.sendQuestion(text);
  };

  return (
    <div className={style.inquiry}>
      <Image
        className={style.btn}
        width={"30px"}
        height={"30px"}
        src={Btn}
        alt="none"
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
            안녕하세요. PickFA개발자 김재훈입니다. 궁금한점이나 문의사항 있으면
            연락주세요.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="문의사항"
            type="text"
            fullWidth
            variant="standard"
            onChange={onChangeText}
            value={text}
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
