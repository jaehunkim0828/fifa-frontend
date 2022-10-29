/* eslint-disable @next/next/no-img-element */
import useInput from "@hooks/useInput";
import { getMethod } from "@services/http";
import Image from "next/image";
import { useState } from "react";

export default function Make() {
  const addPlayer = async () => {
    try {
      await getMethod(`add/season`);
      await getMethod(`add/newPlayer`);
      alert("생성 완료");
    } catch (err) {
      alert("생성중 문제생김");
    }
  };

  return (
    <div>
      <button onClick={addPlayer}>
        database에 새로운 시즌 선수들 추가하기
      </button>
    </div>
  );
}
