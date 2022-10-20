import { useResize } from "@hooks/useResize";
import { useAppDispatch } from "@store/index";
import { resetSpidValue } from "@store/slices/spidSlice";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import style from "./nav.module.scss";

function Burger({
  click: { isClick, setClick },
}: {
  click: { isClick: boolean; setClick: (v: boolean) => void };
}) {
  return (
    <button onClick={() => setClick(!isClick)} className={style.burger}>
      <span
        style={
          isClick ? { transform: "rotate(135deg)", top: "7.5px" } : { top: "0" }
        }
      ></span>
      <span
        style={isClick ? { display: "none", top: "7.5px" } : { top: "7.5px" }}
      ></span>
      <span
        style={
          isClick
            ? { transform: "rotate(225deg)", top: "7.5px" }
            : { top: "15px" }
        }
      ></span>
    </button>
  );
}

export default function Nav() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { nowWidth } = useResize();

  const [isClick, setClick] = useState(false);

  const onChange = useCallback((value: boolean) => setClick(value), []);

  const routing = (path: string) => {
    router.replace(`${path}`);
    dispatch(resetSpidValue());
  };

  useEffect(() => {
    if (nowWidth > 650) {
      onChange(false);
    }
  }, [nowWidth, onChange]);

  return (
    <div className={style.navContainer}>
      <div className={style.nav}>
        <div className={style.title}>
          <button onClick={() => routing("/")}>
            <strong>FIFA ONLINE4</strong>
            <span>선수 분석 웹사이트</span>
          </button>
        </div>
        {nowWidth > 650 ? (
          <div className={style.navItems}>
            <button onClick={() => routing("/")}>Home</button>
            <button
              onClick={() => {
                router.push("/question");
                dispatch(resetSpidValue());
              }}
            >
              Q&A
            </button>
          </div>
        ) : (
          <Burger click={{ isClick, setClick: onChange }} />
        )}
      </div>
      <div
        style={isClick ? { height: "4rem" } : { height: "0" }}
        className={style.dropdown}
      >
        {isClick ? (
          <>
            <button onClick={() => routing("/")}>Home</button>
            <button
              onClick={() => {
                router.push("/question");
                dispatch(resetSpidValue());
              }}
            >
              Q&A
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
