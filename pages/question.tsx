import Notice from "@components/notice/Notice";
import Layout from "@components/rest/Layout";
import { GetServerSidePropsContext } from "next";

export default function NoticeQuestion({ isMobile, path }: any) {
  return (
    <Layout page="질문하기" isMobile={isMobile} path={path}>
      <Notice />
    </Layout>
  );
}

export const getServerSideProps = async ({
  resolvedUrl,
}: GetServerSidePropsContext) => {
  return {
    props: {
      path: resolvedUrl,
    },
  };
};
