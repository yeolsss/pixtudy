import Head from "next/head";

interface Props {
  title: string;
  description: string;
}
export default function CustomHead({ title, description }: Props) {
  return (
    <Head>
      <title>Pixtudy | {title}</title>
      <meta name="description" content={description} />
    </Head>
  );
}
