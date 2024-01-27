import Image from "next/image";

interface Props {
  width?: number;
  height?: number;
  src: string | undefined;
}

export default function SpaceThumb({
  width = 300,
  height = 160,
  src = "/assets/card.png",
}: Props) {
  return <Image width={width} height={height} src={src} alt="space thumb" />;
}
