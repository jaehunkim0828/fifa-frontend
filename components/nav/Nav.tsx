import { useRouter } from "next/router";

import style from "./nav.module.scss";

export default function Nav() {
  const router = useRouter();

  const routing = (path: string) => {
    router.push(`${path}`);
  };

  return (
    <div className={style.navContainer}>
      <button onClick={() => routing("/")}>선수 데이터</button>
      <button onClick={() => routing("/rank")}>선수 검색</button>
    </div>
  );
}
