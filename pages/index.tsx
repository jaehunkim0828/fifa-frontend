import type { NextPage } from "next";

import style from "../styles/Home.module.scss";
import Player from "../components/Player";
import Seo from "@components/Seo";

const Home = ({ result }: { result: string }) => {
  console.log(result);
  return (
    <>
      <Seo title={"Home"} />
      <div className={style.homeContainer}>
        <Player />
      </div>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  // 여기서 axios를 사용해주면 개꿀

  const result = "hello";
  return {
    props: {
      result,
    },
  };
}
