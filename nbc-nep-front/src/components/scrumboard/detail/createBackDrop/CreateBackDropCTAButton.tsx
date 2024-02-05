import styled from "styled-components";

interface Props {
  buttonType: "button" | "submit" | "reset";
  forwardText: string;
  handle: () => void;
}

export default function CreateBackDropCtaButton({
  buttonType,
  forwardText,
  handle,
}: Props) {
  return (
    <StCreateBackDropCtaButton type={buttonType} onClick={handle}>
      {forwardText}
    </StCreateBackDropCtaButton>
  );
}

const StCreateBackDropCtaButton = styled.button`
  border: none;
  font-size: ${(props) => props.theme.unit[14]};
  font-family: var(--point-font);
  font-weight: 300;
  padding: ${(props) => props.theme.spacing[8]} 0;
  color: ${(props) => props.theme.color.text.primary};
  opacity: 0.3;
  &:hover {
    background-color: unset;
    color: ${(props) => props.theme.color.text.primary};
    opacity: 1;
  }
`;
