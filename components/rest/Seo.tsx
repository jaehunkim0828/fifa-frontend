import Head from "next/head";

interface SeoProps {
  title: string;
}

export default function Seo({ title }: SeoProps) {
  return (
    <>
      <Head>
        <title>{`${title} | FIFA 데이터 분석실`}</title>
      </Head>
    </>
  );
}
