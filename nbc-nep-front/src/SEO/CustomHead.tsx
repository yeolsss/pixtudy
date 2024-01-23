import Head from "next/head";

interface Props {
  title: string;
  description: string;
}
export default function CustomHead({ title, description }: Props) {
  return (
    <Head>
      <title>{`Pixtudy | ${title}`}</title>
      <meta name="description" content={description} />
      <link
        href="https://cdn.jsdelivr.net/npm/galmuri/dist/galmuri.css"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/gh/neodgm/neodgm-webfont@1.530/neodgm/style.css"
        rel="stylesheet"
      />
    </Head>
  );
}
