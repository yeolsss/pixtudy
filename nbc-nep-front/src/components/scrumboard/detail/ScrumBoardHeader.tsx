import styled from "styled-components";

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

const StScrumBoardHeader = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: ${(props) => props.theme.spacing[24]};
  padding-top: ${(props) => props.theme.spacing[16]};
  h1 {
    font-family: var(--point-font);
    font-weight: ${(props) => props.theme.heading.desktop.lg.fontWeight};
    font-size: ${(props) => props.theme.heading.desktop["2xl"].fontSize};
    color: ${(props) => props.theme.color.text.brand};
  }
  p {
    font-family: var(--main-font);
    font-weight: ${(props) => props.theme.body.lg.regular.fontWeight};
    font-size: ${(props) => props.theme.body.lg.regular.fontSize};
  }
`;
