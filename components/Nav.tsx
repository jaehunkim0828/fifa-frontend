import style from "../styles/nav.module.scss";

export default function Nav() {
  return (
    <div className={style.navContainer}>
      <button>선수 조회</button>
      <button>유저 조회</button>
    </div>
  );
}
