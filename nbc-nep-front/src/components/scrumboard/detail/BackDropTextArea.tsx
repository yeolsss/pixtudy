import styled from "styled-components";

interface Props {
  fontSize: number;
  forwardRef: React.RefObject<HTMLTextAreaElement>;
  value: string;
  handler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  validState: boolean;
}
export default function BackDropTextArea({
  fontSize,
  forwardRef,
  value,
  handler,
  validState,
}: Props) {
  return (
    <>
      <StBackDropTextArea
        $fontSize={fontSize}
        $validState={validState}
        ref={forwardRef}
        value={value}
        onChange={handler}
      ></StBackDropTextArea>
    </>
  );
}

export const StBackDropTextArea = styled.textarea<{
  $fontSize: number;
  $validState: boolean;
}>`
  outline: none;
  width: 100%;
  min-height: 70px;
  height: auto;
  font-family: var(--main-font);
  font-size: ${({ $fontSize }) => $fontSize}px;
  border-radius: ${(props) => props.theme.border.radius[8]};
  border: 1px solid
    ${({ theme, $validState }) =>
      $validState ? theme.color.border.danger : theme.color.border.secondary};
  background: ${(props) => props.theme.color.text.interactive.inverse};
  color: ${(props) => props.theme.color.text.tertiary};
  overflow: hidden;
  line-height: 150%;
  letter-spacing: -0.14px;
  &:focus {
    border-color: ${({ theme, $validState }) =>
      $validState ? theme.color.border.danger : theme.color.border.focusRing};
  }
`;
