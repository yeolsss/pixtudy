import { StCreateBackDropCtaButton } from "@/components/scrumboard/styles/backdrop.styles";

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
