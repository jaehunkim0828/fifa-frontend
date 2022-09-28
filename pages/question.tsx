import Notice from "@components/notice/Notice";
import Layout from "@components/rest/Layout";

export default function NoticeQuestion({ isMobile }: any) {
  return (
    <Layout page="질문하기" isMobile={isMobile}>
      <Notice />
    </Layout>
  );
}
