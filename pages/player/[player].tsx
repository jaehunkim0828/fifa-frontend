import { getMethod } from "@services/http";
import { useRouter } from "next/router";

export default function Player() {
  const router = useRouter();
  console.log();

  return <div>{router.query.player || "...Loding"}</div>;
}

export async function getServerSideProps(cxt: any) {
  // 여기서 axios를 사용해주면 개꿀

  return {
    props: {},
  };
}
