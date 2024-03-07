import Head from "next/head";

interface Props {
  title: string;
  description: string;
}
export default function CustomHead({ title, description }: Props) {
  const imageUrl =
    "https://lrklhpcxbdiunpubmvio.supabase.co/storage/v1/object/public/openGraph_image/authHero5.png";

  return (
    <Head>
      <title>{`Pixtudy | ${title}`}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content="픽스터디, pixtudy" />
      <meta name="description" content={description} />
      {/* Open Graph tags */}
      <meta
        property="og:title"
        content="Pixtudy | 메타버스 공간에서 함께해요!"
      />
      <meta
        property="og:description"
        content="Pixtudy는 메타버스 환경에서 화면, 카메라 및 음성을 공유하고 스크럼보드를 이용해 협업할 수 있는 웹 애플리케이션입니다."
      />
      <meta property="og:url" content="https://www.pixtudy.site" />
      <meta property="og:image" content={imageUrl} />
    </Head>
  );
}
