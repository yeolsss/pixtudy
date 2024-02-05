import { StScrumBoardHeader } from "../styles/scrumBoardHeader.styles";

interface Props {
  title: string;
}
export default function ScrumBoardHeader({ title }: Props) {
  return (
    <StScrumBoardHeader>
      <h1>{`${title}'s Scrum board`}</h1>
    </StScrumBoardHeader>
  );
}
