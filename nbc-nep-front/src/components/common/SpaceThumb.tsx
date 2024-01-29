import Image from "next/image";
import styled from "styled-components";

interface Props {
  width?: number;
  height?: number;
  src: string | undefined;
}

export default function SpaceThumb({
  width = 250,
  height = 150,
  src = "/assets/card.png",
}: Props) {
  return (
    <StImage
      width={width}
      height={height}
      src={src}
      alt="space thumb"
      quality={100}
    />
  );
}

const StImage = styled(Image)`
  border-radius: ${(props) => props.theme.border.radius[8]};
  padding: 0;
  margin: 0;
`;
