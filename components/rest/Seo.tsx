import Head from "next/head";

interface SeoProps {
  title: string;
  path: string;
}

export default function Seo({ title, path }: SeoProps) {
  return (
    <>
      <Head>
        <title>{`${title} | PickFA`}</title>
        <meta
          name="viewport"
          content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
        />
        <meta name="title" content={`${title} | PickFA`}></meta>
        <meta
          name="Keywords"
          content="피파온라인4, 선수, 선수비교, 피파4, 피파4 선수비교, FIFA4, 선수비교, 가성비 선수, 피파4 가성비, 피파4 선수 분석, 피파온라인4 선수 분석, fifaonline4 선수"
        ></meta>
        <meta name="author" content="Jaehun"></meta>
        <meta
          name="description"
          content="피파온라인4 선수 데이터를 분석 성능을 비교, 오로지 PickFA에서만"
        ></meta>
        <meta httpEquiv="Email" content="jhunkim0828@gmail.com"></meta>

        {/* meta */}
        <meta property="og:title" content={`${title} | PickFA`}></meta>
        <meta
          property="og:description"
          content="피파온라인4 선수 데이터를 분석 성능을 비교, 오로지 PickFA에서만"
        ></meta>
        <meta property="og:site_name" content={`${title} | PickFA`}></meta>
        <meta property="og:url" content={`https://f4coach.com${path}`}></meta>
        <meta
          property="og:image"
          itemProp="image"
          content={`${process.env.NEXT_PUBLIC_FRONT_URL}/images/PickFA-thumb.png`}
        ></meta>
        {/* twitter */}
        <meta name="twitter:card" content="summary"></meta>
        <meta name="twitter:title" content={`${title} | PickFA`}></meta>
        <meta
          name="twitter:description"
          content="피파온라인4 선수 데이터를 분석 성능을 비교, 오로지 PickFA에서만"
        ></meta>
        <meta name="twitter:url" content={`https://f4coach.com${path}`}></meta>
      </Head>
    </>
  );
}
