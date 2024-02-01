import Image from "next/image";
import { contents } from "./home.constant";
import { StScrollItemWrapper } from "./styles/home.styles";

interface Props {
  index: number;
}

export default function ScrollItem({ index }: Props) {
  const { title, description, imgSrc, initialY, top, left } = contents[index];

  return (
    <StScrollItemWrapper
      $top={top}
      $left={left}
      initial={{ opacity: 0, y: initialY }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: initialY }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <Image
          src={imgSrc}
          width={80}
          height={81}
          alt={"contents scroll item image"}
        />
        <h2>{title}</h2>
      </div>
      <p>{description}</p>
    </StScrollItemWrapper>
  );
}
