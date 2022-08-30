import { useAppDispatch } from "@store/index";
import { resetSpidValue } from "@store/slices/spidSlice";
import { useRouter } from "next/router";

import style from "./nav.module.scss";

export default function Nav() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const routing = (path: string) => {
    router.replace(`${path}`);
    dispatch(resetSpidValue());
  };

  return (
    <div className={style.navContainer}>
      <button onClick={() => routing("/")}>선수 데이터</button>
      <button onClick={() => routing("/rank")}>선수 검색</button>
    </div>
  );
}
