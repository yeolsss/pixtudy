import styled from "styled-components";

interface Props {
  text: string;
  handler: () => void;
}

export default function ModalHeader({ text, handler }: Props) {
  return (
    <StModalHeaderContainer>
      <h2>{text}</h2>
      <button onClick={handler} />
    </StModalHeaderContainer>
  );
}

const StModalHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: ${(props) => props.theme.spacing[24]};
  h2 {
    font-family: var(--sub-font);
    font-size: ${(props) => props.theme.heading.desktop.sm.fontSize};
  }
  button {
    width: ${(props) => props.theme.unit[20]}px;
    height: ${(props) => props.theme.unit[20]}px;
    border: none;
    padding: 0;
    background: url("/assets/close.svg") no-repeat center;
  }
`;
