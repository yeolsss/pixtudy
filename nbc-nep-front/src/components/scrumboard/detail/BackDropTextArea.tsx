import { StBackDropTextArea } from "../styles/backdrop.styles";

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
    <StBackDropTextArea
      $fontSize={fontSize}
      $validState={validState}
      ref={forwardRef}
      value={value}
      onChange={handler}
    />
  );
}
