import { StModalHeaderContainer } from './modal.styles';

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
  )
}

