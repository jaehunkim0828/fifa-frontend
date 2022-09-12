import Image from "next/image";

import style from "./mobileNotice.module.scss";
import notice from "@public/images/notice.png";

export default function MobileNotice() {
  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText("http://f4coach.com");

      alert("주소가 복사되었습니다");
    } catch (err) {
      alert("복사 실패!");
    }
  };

  return (
    <div className={style.mobileNoticeContainer}>
      <div className={style.noticeImg}>
        <Image src={notice} alt="긴급공지" layout="responsive" />
      </div>
      <strong>PC버전으로 접속해주세요</strong>
      <span>현재 모바일버전을 업데이트중입니다.</span>
      <span>PC로 다시 접속해주세요. 감사합니다!</span>
      <button className={style.btn} onClick={copyUrl}>
        주소 복사하기
      </button>
    </div>
  );
}
