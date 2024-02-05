import { contents } from "./home.constant";
import { StScrollItemWrapper } from "./styles/home.styles";

interface Props {
  index: number;
}

export default function ScrollItem({ index }: Props) {
  const { title, description, videoSrc, initialY, top, left } = contents[index];

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
        <video
          autoPlay
          loop
          muted
          playsInline
          src={videoSrc}
          height={270}
          width={300}
        />
        <h2>{title}</h2>
      </div>
      <p>{description}</p>
    </StScrollItemWrapper>
  );
}
